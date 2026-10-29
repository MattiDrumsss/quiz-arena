/* QUIZ ARENA: collegamento online tra GIOCO e REGIA (Firebase Realtime Database) */
(()=>{
const cfg=window.QA_FIREBASE||{},fb=window.firebase;
const RM=window.RM={mode:'local',ok:!!(fb&&cfg.apiKey&&cfg.databaseURL&&!/INSERISCI/.test(cfg.apiKey+cfg.databaseURL))};
let db,uid,code=null,role=null,off=0,rev=0,last=null,tm=null,subs=[],lastPlay=false;
const TS=()=>fb.database.ServerValue.TIMESTAMP,R=p=>db.ref('rooms/'+code+(p?'/'+p:''));
const ALPHA='ABCDEFGHJKMNPQRSTUVWXYZ23456789',MAXAGE=12*3600e3;
const save=()=>{try{localStorage.setItem('qa_room',JSON.stringify({code,role}))}catch(e){}};
RM.now=()=>Date.now()+off;RM.code=()=>code;RM.role=()=>role;RM.uid=()=>uid;
RM.saved=()=>{try{return JSON.parse(localStorage.getItem('qa_room'))}catch(e){return null}};
RM.forget=()=>{try{localStorage.removeItem('qa_room')}catch(e){}};
RM.init=()=>{if(!RM.ok)return Promise.reject(new Error('Servizio online non configurato.'));if(db)return Promise.resolve();
  try{fb.initializeApp(cfg);db=fb.database()}catch(e){return Promise.reject(new Error('Configurazione del servizio online non valida.'))}
  db.ref('.info/serverTimeOffset').on('value',s=>{off=s.val()||0});
  return fb.auth().signInAnonymously().then(c=>{uid=c.user.uid}).catch(()=>{db=null;throw new Error('Accesso al servizio online non riuscito: controlla che l’accesso anonimo sia attivo.')})};
RM.create=async()=>{for(let i=0;i<6;i++){const c=Array.from({length:6},()=>ALPHA[crypto.getRandomValues(new Uint32Array(1))[0]%ALPHA.length]).join('');
  try{await db.ref('rooms/'+c+'/meta').set({created:TS()});code=c;save();return c}catch(e){}}throw new Error('Impossibile creare la stanza. Riprova.')};
RM.join=async c=>{c=String(c||'').toUpperCase().replace(/[^A-Z0-9]/g,'');if(c.length!=6)throw new Error('Il codice ha 6 caratteri.');
  const s=await db.ref('rooms/'+c+'/meta').once('value');if(!s.exists())throw new Error('Codice inesistente.');
  if(RM.now()-s.val().created>MAXAGE)throw new Error('Stanza scaduta: creane una nuova.');code=c;save();return s.val()};
RM.claim=async r=>{const m=(await R('meta').once('value')).val()||{},other=r=='regia'?'gioco':'regia';
  if(m[other]===uid)throw new Error('Questo dispositivo ha già l’altro ruolo.');
  let take=false;if(m[r]&&m[r]!==uid){const p=(await R('pres/'+r).once('value')).val();take=!!p&&p.on===false&&RM.now()-p.t>120000}
  let res;try{if(m[r]===uid)res={committed:true,snapshot:{val:()=>uid}};else res=await R('meta/'+r).transaction(c=>(c==null||c===uid||take)?uid:undefined)}catch(e){throw new Error('Non è possibile occupare il ruolo '+r.toUpperCase()+'.')}
  if(!res.committed||res.snapshot.val()!==uid)throw new Error('Il ruolo '+r.toUpperCase()+' è già occupato da un altro dispositivo.');
  role=r;save();const p=R('pres/'+r),c=db.ref('.info/connected');
  c.on('value',s=>{if(s.val()===true){p.onDisconnect().set({on:false,t:TS()});p.set({on:true,t:TS()});if(last&&role=='regia')RM.pub(last,true)}});subs.push(()=>c.off());return r};
RM.release=async()=>{if(role&&code)try{await R('meta/'+role).transaction(c=>c===uid?null:undefined);await R('pres/'+role).set({on:false,t:TS()})}catch(e){}};
const flush=()=>{tm=null;if(!last||role!=='regia'||!code)return;R('snap').set(Object.assign({},last,{rev:++rev,at:TS()})).catch(()=>{})};
RM.pub=(o,now)=>{last=o;clearTimeout(tm);if(now)flush();else tm=setTimeout(flush,60)};
RM.cmd=o=>{if(role!=='regia'||!code)return;if(o.s&&!lastPlay)return;lastPlay=!o.s;R('cmd').set(Object.assign({s:0},o,{n:Date.now()+Math.random(),at:TS()})).catch(()=>{})};
RM.on=(p,cb)=>{const r=R(p);r.on('value',s=>cb(s.val()));subs.push(()=>r.off())};
RM.onCmd=cb=>{let first=true;const r=R('cmd');r.on('value',s=>{const v=s.val();if(first){first=false;return}if(v)cb(v)});subs.push(()=>r.off())};
RM.unsub=()=>{subs.forEach(f=>f());subs=[]};
RM.leave=async()=>{RM.unsub();await RM.release();code=null;role=null;last=null;RM.mode='local';RM.forget()};
RM.close=async()=>{if(role=='regia'&&code)try{await R().remove()}catch(e){}await RM.leave()};
})();
