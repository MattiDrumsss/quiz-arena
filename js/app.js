(()=>{
const RM=window.RM||{mode:'local',ok:false,pub(){},cmd(){}};
const $=s=>document.querySelector(s),A=$('#app'),R0=a=>a[Math.random()*a.length|0];
const sh=a=>{a=a.slice();for(let i=a.length;i>1;){const j=Math.random()*i--|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const LS={g:(k,d)=>{try{const v=localStorage.getItem('qa_'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},s:(k,v)=>{try{localStorage.setItem('qa_'+k,JSON.stringify(v))}catch(e){}}};
const S={n:LS.g('n',['Squadra 1','Squadra 2']),snd:LS.g('snd',true)};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().replace(/\s+/g,' ').toLowerCase();
const fmc=ms=>{const c=Math.max(0,Math.ceil(ms/10));return String(Math.floor(c/100)).padStart(2,'0')+'.'+String(c%100).padStart(2,'0')};
const sec=ms=>Math.max(0,Math.ceil(ms/1000)),fm=ms=>{const s=sec(ms);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const tn=i=>`<span class="tg t${i}">${esc(S.n[i])}</span>`;
let st=null,acts={},tk=null,gen=0,lt=0,hist=[],ac,OP={},R=()=>{};
let au=null,agen=0,gid=null;const astop=()=>{agen++;if(RM.mode=='regia')RM.cmd({s:1});if(au)au.pause()};
const stop=()=>{astop();clearInterval(tk);tk=null;gen++};
const run=(f,iv)=>{let l=Date.now();tk=setInterval(()=>{const n=Date.now(),d=n-l;l=n;if(st&&!st.p&&!st.done)f(d)},iv||100)};
const ask=(m,f)=>{const o=document.createElement('div');o.className='mdl';o.innerHTML=`<div class="mbx"><p>${esc(m)}</p><div class="row"><button class="b" data-m="1">CONFERMA</button><button class="b s" data-m="0">ANNULLA</button></div></div>`;o.addEventListener('click',e=>{const b=e.target.closest('[data-m]');if(!b)return;o.remove();if(b.dataset.m=='1')f()});document.body.appendChild(o)};
const pts=(t,k)=>{const e=document.createElement('div');e.className='pts '+(k||'');e.textContent=t;document.body.appendChild(e);setTimeout(()=>e.remove(),950)};
const bn=t=>{const e=document.createElement('div');e.className='bn';e.textContent=t;document.body.appendChild(e);setTimeout(()=>e.remove(),1300)};
const fx=k=>{const e=document.createElement('div');e.className='flash '+k;document.body.appendChild(e);setTimeout(()=>e.remove(),700)};
const conf=()=>{for(let i=0;i<70;i++){const e=document.createElement('i');e.className='cf';e.style.cssText=`left:${Math.random()*100}vw;background:${R0(['#ffe08a','#b8860b','#f5c542','#27f59a','#ffd23f'])};animation-delay:${Math.random()*.8}s;--x:${Math.random()*200-100}px`;document.body.appendChild(e);setTimeout(()=>e.remove(),3800)}};
function snd(t){if(t=='ok'||t=='ko')fx(t);if(!S.snd)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();const f={ok:[660,880],ko:[220,150],tick:[900],end:[300,200,120],win:[523,659,784,1047],sw:[500,650]}[t];f.forEach((h,i)=>{const o=ac.createOscillator(),g=ac.createGain(),s=ac.currentTime+i*.12;o.frequency.value=h;o.type=t=='ko'||t=='end'?'sawtooth':'sine';o.connect(g);g.connect(ac.destination);g.gain.setValueAtTime(.15,s);g.gain.exponentialRampToValueAtTime(.001,s+.2);o.start(s);o.stop(s+.22)})}catch(e){}}
const tick10=(b,n)=>{if(sec(b)!=sec(n)&&sec(n)<=10&&sec(n)>0)snd('tick')};
const scr=h=>{document.body.classList.remove('is-home');A.innerHTML=h;A.classList.remove('ani');void A.offsetWidth;A.classList.add('ani');window.scrollTo(0,0)};
A.addEventListener('keydown',e=>{if(e.key=='Enter'&&e.target&&e.target.id=='ai'&&acts.cf)acts.cf()});
A.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled)return;const a=b.dataset.a,n=Date.now();if(st&&st.done&&!['ag','ot','hm'].includes(a))return;if(a!='adj'&&n-lt<300)return;lt=n;if(acts[a])acts[a](b.dataset.v)});
const logo=`<svg class="logo" viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#b8860b"/></linearGradient></defs><polygon points="60,6 108,33 108,87 60,114 12,87 12,33" fill="#0d0b06" stroke="url(#lg)" stroke-width="5"/><text x="60" y="80" text-anchor="middle" font-size="58" font-weight="900" fill="url(#lg)" font-family="Arial Black,Impact,sans-serif">Q</text></svg>`;
const tsel=()=>`<label>Squadra che gioca<select id="o_tm"><option value="0">${esc(S.n[0])}</option><option value="1">${esc(S.n[1])}</option></select></label>`;
const nv=id=>+($('#'+id)?.value);
const pnl=(x,nu)=>`<details class="mnu"><summary class="b g">⋯ MENU</summary><div class="pnl">${x||''}<button class="b s" data-a="pz" ${st.p?'disabled':''}>PAUSA</button><button class="b s" data-a="rp" ${st.p?'':'disabled'}>RIPRENDI</button>${nu?'':'<button class="b s" data-a="un">ANNULLA ULTIMA AZIONE</button>'}<button class="b g" data-a="rs">RIAVVIA</button><button class="b g" data-a="mn">ESCI AL MENU</button></div></details>`;
const sb=()=>`<div class="sb">${[0,1].map(i=>`<div class="tm t${i}"><b>${esc(S.n[i])}</b><strong id="sc${i}">${st.sc[i]}</strong><span><button data-a="adj" data-v="${i},-1" aria-label="Meno">−</button><button data-a="adj" data-v="${i},1" aria-label="Più">+</button></span></div>`).join('')}</div>`;
function play(id,init,view,a,tf,iv){
  stop();st=init();hist=[];gid=id;
  const draw=()=>{const e=$('#ai');if(e&&st&&st.ans!==undefined)st.ans=e.value;A.innerHTML=`<div class="gtl">${GM[id].n}</div>`+view()+(st&&st.p&&!st.done?'<div class="pov"><h2>IN PAUSA</h2><button class="b big" data-a="rp">RIPRENDI</button><button class="b g" data-a="rs">RIAVVIA</button><button class="b g" data-a="mn">ESCI AL MENU</button></div>':'');pubG('game')};
  R=draw;
  const sv=()=>{hist.push(JSON.stringify(st));if(hist.length>60)hist.shift()};
  acts=Object.assign({
    adj:v=>{const[i,d]=v.split(',');st.sc[i]=Math.max(0,st.sc[i]+d*st.stp);draw()},
    pz:()=>{st.p=true;draw()},rp:()=>{st.p=false;draw()},
    un:()=>{if(hist.length){st=JSON.parse(hist.pop());draw()}},
    rs:()=>ask('Riavviare la partita? I progressi andranno persi.',()=>GM[id].go()),
    mn:()=>ask('Tornare al menu? I progressi andranno persi.',menu),
    hm:home,ot:menu,ag:()=>GM[id].go()
  },a(sv,draw));
  draw();run(tf,iv);
}
function fin(t){
  stop();st.done=true;snd(st.solo&&!st.won?'ko':'win');const[a,b]=st.sc,w=st.solo?(st.won?(st.wt||'HAI VINTO!'):'HAI PERSO'):a==b?'PAREGGIO':'VINCE '+esc(S.n[a>b?0:1]).toUpperCase();
  scr(`<section class="c fin"><h2>${t}</h2><div class="win">${w}</div><div class="res">${(st.solo?[st.tm]:[0,1]).map(i=>`<div class="tm t${i}"><b>${esc(S.n[i])}</b><strong>${st.sc[i]}</strong>${st.ex?`<small>${st.ex[i]}</small>`:''}</div>`).join('')}</div>${st.note?`<p class="sub note">${st.note}</p>`:''}<button class="b" data-a="ag">${st.nl||'RIGIOCA'}</button><button class="b s" data-a="ot">SCEGLI UN ALTRO GIOCO</button><button class="b s" data-a="hm">TORNA ALLA HOME</button></section>`);if(!st.solo||st.won)conf();pubG('fin');
}
const cust=k=>LS.g('cu_'+k,[]);
const ID=['gh','fi','du','iv','da','gs'];
const GM={};
function home(){stop();st=null;acts={go:teams,rl:rules,j2:()=>RM.init().then(()=>joinScr()).catch(er),sd:()=>{S.snd=!S.snd;LS.s('snd',S.snd);home()}};
  scr(`<section class="c hero"><img class="logo" src="assets/logo.png" alt="QUIZ ARENA" width="900" height="900" decoding="async"><h1 class="sr">QUIZ ARENA</h1><div class="tag">Il game show da giocare con gli amici</div><p class="sub">I giochi dei quiz TV in una sola arena: due squadre, un conduttore, nessuna registrazione.</p><button class="b" data-a="go">INIZIA A GIOCARE</button><button class="b s" data-a="rl">REGOLE DEI GIOCHI</button>${RM.ok?'<button class="b g" data-a="j2">COLLEGA UN SECONDO SCHERMO</button>':''}<button class="b s" data-a="sd">EFFETTI SONORI: ${S.snd?'ATTIVI':'SPENTI'}</button></section>`);document.body.classList.add('is-home')}
function rules(){acts={hm:home};scr(`<section class="c"><h2>REGOLE DEI GIOCHI</h2><div class="grid">${ID.map(i=>`<div class="cd"><div class="ic">${GM[i].i}</div><h2>${GM[i].n}</h2><p>${GM[i].r}</p></div>`).join('')}</div><button class="b" data-a="hm">TORNA ALLA HOME</button></section>`)}
function teams(){acts={hm:home,ok:()=>{S.n=[0,1].map(i=>$('#n'+i).value.trim()||'Squadra '+(i+1));LS.s('n',S.n);roomScreen()}};
  scr(`<section class="c"><h2>CHI GIOCA?</h2><div class="grid">${[0,1].map(i=>`<div class="cd tcard t${i}"><div class="ic">${i?'🔥':'⚡'}</div><h2>SQUADRA ${i+1}</h2><input class="fld" id="n${i}" maxlength="24" placeholder="Squadra ${i+1}" value="${S.n[i]=='Squadra '+(i+1)?'':esc(S.n[i])}" autocomplete="off"></div>`).join('')}</div><button class="b" data-a="ok">CONFERMA</button><button class="b s" data-a="hm">INDIETRO</button></section>`)}
function menu(){stop();st=null;acts={pr:prep,tm:teams,hm:home,lv:()=>RM.leave().then(home)};if(RM.mode=='regia')RM.pub({k:'wait',n:S.n,m:'La regia sta scegliendo il gioco.'});
  scr(`<section class="c"><h2>SCEGLI UN GIOCO</h2><p class="sub">${tn(0)} contro ${tn(1)}</p><div class="grid">${ID.map(i=>`<div class="cd"><div class="ic">${GM[i].i}</div><h2>${GM[i].n}</h2><small>${GM[i].s}</small><p>${GM[i].d}</p><button class="b" data-a="pr" data-v="${i}">GIOCA</button></div>`).join('')}</div><button class="b s" data-a="tm">CAMBIA SQUADRE</button>${RM.mode=='regia'?'<button class="b g" data-a="lv">ESCI DALLA STANZA</button>':'<button class="b s" data-a="hm">HOME</button>'}</section>`)}
const HINT={gh:'5 indizi separati da virgola, poi | e la soluzione. Esempio: ARTIFICIO,FATUO,AMICO,INCROCIATO,SACRO|FUOCO',fi:'domanda|risposta corretta|risposta sbagliata',du:'definizione|PAROLA',iv:'parola|categoria',da:'categoria|domanda|anno|spiegazione'};
const NEED={gh:2,fi:3,du:2,iv:1,da:4};
function prep(id){stop();if(RM.mode=='regia')RM.pub({k:'prev',n:S.n,gn:GM[id].n,i:GM[id].i,gd:GM[id].d,m:'La regia sta preparando il gioco.'});acts={st:()=>{GM[id].rd();GM[id].go()},bk:menu,ac:()=>{const l=prompt(HINT[id]);if(!l)return;if(l.split('|').length<NEED[id]||(id=='gh'&&l.split('|')[0].split(',').length!=5)||(id=='da'&&isNaN(+l.split('|')[2]))){alert('Formato non valido. Usa: '+HINT[id]);return}const c=cust(id);c.push(l.trim());LS.s('cu_'+id,c);alert('Aggiunto!')}};
  scr(`<section class="c"><div class="ic" style="font-size:3rem">${GM[id].i}</div><h2>${GM[id].n}</h2><p class="sub">${GM[id].r}</p><div class="cd opt">${GM[id].o()}</div><button class="b" data-a="st">INIZIA IL GIOCO</button>${id=='gs'?'':`<button class="b s" data-a="ac">AGGIUNGI ${id=='iv'?'PAROLA':id=='gh'?'PARTITA':'DOMANDA'}</button>`}<button class="b s" data-a="bk">INDIETRO</button></section>`)}

/* LA GHIGLIOTTINA */
const ghS=()=>D.gh.concat(cust('gh').map(l=>{const[x,s]=l.split('|');return[x,s.trim().toUpperCase(),sh(D.DEC).slice(0,5).join(',')]}));
GM.gh={n:'LA GHIGLIOTTINA',s:"L'EREDITÀ",i:'🪓',d:'Scegli le parole giuste, poi trova la soluzione che le lega tutte.',r:'Cinque coppie di parole: ogni risposta sbagliata dimezza il montepremi. Poi cinque indizi e 60 secondi per trovare la parola che li collega. Tocca la parola: il gioco verifica da solo. Alla fine scrivi la soluzione e premi CONFERMA.',
 o:()=>tsel()+`<label>Montepremi iniziale<input class="fld" id="o_jp" type="number" min="1000" step="1000" value="100000" inputmode="numeric"></label><label>Partita<select id="o_set">${ghS().map((s,i)=>`<option value="${i}">${i<D.gh.length?'Partita '+(i+1):'Personalizzata '+(i-D.gh.length+1)}</option>`).join('')}</select></label>`,
 rd:()=>{OP.gh={tm:nv('o_tm'),jp:Math.max(1000,nv('o_jp')||100000),set:nv('o_set')}},
 go:()=>{const o=OP.gh,s=ghS()[o.set],c=s[0].split(',').map(x=>x.trim().toUpperCase()),d=s[2].split(',').map(x=>x.trim().toUpperCase());
  play('gh',()=>({sc:[0,0],stp:1000,tm:o.tm,jp:o.jp,c,d,sol:s[1],ph:1,i:0,f:c.map(()=>Math.random()<.5),pk:null,fb:null,rv:false,left:60000,p:false,ans:'',cf:false,lk:false,solo:1,won:false}),
  ()=>{const s=st;let h=`<section class="c game"><div class="jp">MONTEPREMI<strong>${s.jp.toLocaleString('it-IT')}</strong></div><p class="sub">${tn(s.tm)}</p>`;
   if(s.ph==1){const cr=s.f[s.i]?1:0,w=cr?[s.d[s.i],s.c[s.i]]:[s.c[s.i],s.d[s.i]];
    h+=`<p class="sub">Coppia ${s.i+1} di 5: scegli una parola</p><div class="pair">${w.map((x,k)=>`<button class="b w ${s.pk===k?'sel':''} ${s.fb&&s.pk===k?s.fb:''} ${s.fb&&k==cr?'ok':''}" data-a="pk" data-v="${k}">${esc(x)}</button>`).join('')}</div><p class="msg ${s.fb||''}">${s.fb=='ok'?'Risposta corretta!':s.fb=='ko'?'Risposta sbagliata: montepremi dimezzato':''}</p>`}
   else h+=`<div class="clues">${s.c.map(x=>`<span>${esc(x)}</span>`).join('')}</div><div class="clock" id="tm">${fm(s.left)}</div><input class="fld" id="ai" placeholder="Scrivi la soluzione" value="${esc(s.ans)}" autocomplete="off" autocapitalize="characters"><button class="b big" data-a="cf">CONFERMA</button>`;
   return h+pnl()+'</section>'},
  (sv,d)=>{const nx=()=>{st.lk=true;d();const g=gen;setTimeout(()=>{if(g!=gen||!st||!st.lk)return;st.lk=false;st.pk=null;st.fb=null;st.i++;if(st.i>4){st.ph=2;st.left=60000}d()},1100)};
   return{pk:v=>{if(st.lk||st.done||st.ph!=1)return;sv();st.pk=+v;const good=(+v)==(st.f[st.i]?1:0);st.fb=good?'ok':'ko';if(!good)st.jp=Math.floor(st.jp/2);snd(good?'ok':'ko');nx()},
    cf:()=>{if(st.ph!=2||st.done)return;const e=$('#ai'),v=e?e.value:st.ans;if(!String(v).trim()){if(e)e.focus();return}st.ans=v;const w=norm(v)==norm(st.sol);st.won=w;if(w){st.sc[st.tm]+=st.jp;st.wt='HAI VINTO '+st.jp.toLocaleString('it-IT')+'!'}st.note='Soluzione: '+esc(st.sol)+(w?'':' · La tua risposta: '+esc(String(v).trim()));fin('LA GHIGLIOTTINA')}}},
  ms=>{if(st.ph!=2)return;const b=st.left;st.left-=ms;tick10(b,st.left);const e=$('#tm');if(e)e.textContent=fm(st.left);if(st.left<=0){st.left=0;snd('end');st.won=false;st.note='Tempo scaduto! Soluzione: '+esc(st.sol);fin('LA GHIGLIOTTINA')}})}};

/* AVANTI UN ALTRO */
let FS=[];
GM.fi={n:'IL GIOCO FINALE',s:'AVANTI UN ALTRO!',i:'🎯',d:'21 risposte sbagliate di fila: tocca quella sbagliata!',r:'Ogni domanda ha due risposte. Devi toccare quella SBAGLIATA, 21 volte di fila. Se tocchi quella giusta, si riparte dalla prima domanda: le domande del round restano sempre le stesse, nello stesso ordine. A ogni nuovo round cambiano.',
 o:()=>tsel()+`<label>Modalità<select id="o_md"><option value="0">Classica: 150 secondi</option><option value="1">Montepremi: 100.000 punti, −1.000 al secondo</option></select></label>`,
 rd:()=>{OP.fi={tm:nv('o_tm'),md:nv('o_md')}},
 go:()=>{const o=OP.fi,P=D.fi.concat(cust('fi')).map(l=>l.split('|')).filter(x=>x[2]),L=Math.min(21,P.length);
  const mkSeq=()=>{let s,k;for(let n=0;n<40;n++){s=sh(P).slice(0,L);k=s.map(x=>x[0]).join('|');if(!FS.includes(k))break}FS.push(k);if(FS.length>2)FS.shift();return s};
  play('fi',()=>{const seq=mkSeq();return{sc:[0,0],stp:100,tm:o.tm,md:o.md,seq,fl:seq.map(()=>Math.random()<.5),qi:0,left:150000,jp:100000,fb:null,solo:1,won:false,nl:'TURNO DI '+S.n[1-o.tm].toUpperCase()}},
  ()=>{const s=st,[q,c,w]=s.seq[s.qi],op=s.fl[s.qi]?[w,c]:[c,w];
   return`<section class="c game"><p>${tn(s.tm)} · ${s.md?'MONTEPREMI':'CLASSICA'}</p><div class="prog">${s.qi}/${s.seq.length}</div><div class="pips">${s.seq.map((_,k)=>`<i class="${k<s.qi?'f':''}"></i>`).join('')}</div><div class="clock" id="tm">${s.md?sec(s.jp):fm(s.left)}</div>${s.md?`<div class="jp">MONTEPREMI<strong id="jp">${s.jp.toLocaleString('it-IT')}</strong></div>`:''}<h2 class="q">${esc(q)}</h2><div class="pair">${op.map((x,k)=>`<button class="b w big" data-a="an" data-v="${k}">${esc(x)}</button>`).join('')}</div><p class="msg ${s.fb?s.fb[0]:''}">${s.fb?s.fb[1]:'Tocca la risposta SBAGLIATA'}</p>${pnl()}</section>`},
  (sv,d)=>({ag:()=>{OP.fi.tm=1-OP.fi.tm;GM.fi.go()},an:v=>{if(st.done)return;sv();const ok=+v==(st.fl[st.qi]?1:0);
    if(!ok){st.qi++;snd('ok');st.fb=['good','Sbagliata! Ottimo!'];if(st.qi>=st.seq.length){st.sc[st.tm]+=st.md?st.jp:sec(st.left)*10;st.note=st.seq.length+' su '+st.seq.length+'!';st.won=true;return fin('AVANTI UN ALTRO!')}}
    else{st.qi=0;snd('ko');st.fb=['bad','Era quella giusta: si riparte dalla prima domanda'];if(st.md)st.jp=Math.max(0,st.jp-5000)}
    d()}}),
  ms=>{const b=st.md?st.jp:st.left;if(st.md)st.jp-=ms;else st.left-=ms;const n=st.md?st.jp:st.left;tick10(b,n);const e=$('#tm');if(e)e.textContent=st.md?sec(st.jp):fm(st.left);const j=$('#jp');if(j)j.textContent=Math.max(0,Math.ceil(st.jp/1000)*1000).toLocaleString('it-IT');
   if(n<=0){snd('end');st.note='Tempo scaduto: serie raggiunta '+st.qi+'/'+st.seq.length;fin('AVANTI UN ALTRO!')}})}};
/* IL DUELLO */
GM.du={n:'IL DUELLO',s:"L'EREDITÀ",i:'⚔️',d:'Le lettere compaiono da sole: indovina la parola prima che il tempo finisca.',r:'Una definizione e una parola con le lettere nascoste: una nuova lettera appare ogni 2 secondi, l’ultima resta nascosta. La squadra risponde a voce; il conduttore preme «PASSA ALL’ALTRA SQUADRA». Il timer della squadra attiva scorre, l’altro aspetta. Chi finisce il tempo perde.',
 o:()=>`<label>Secondi per squadra<input class="fld" id="o_s" type="number" min="10" value="60" inputmode="numeric"></label>`,
 rd:()=>{OP.du={s:Math.max(10,nv('o_s')||60)}},
 go:()=>{const o=OP.du,Q=sh(D.du.concat(cust('du')).map(l=>l.split('|')).filter(x=>x[0]&&x[1]&&x[1].trim()));
  const W=()=>Q[st.i%Q.length][1].toUpperCase(),N=()=>W().replace(/ /g,'').length,LN=i=>Q[i%Q.length][1].replace(/ /g,'').length,mo=n=>sh([...Array(n).keys()]);
  const cells=()=>{let k=0;return[...W()].map(c=>{if(c==' ')return'<span class="cell sp"></span>';const v=st.sw>0||st.ord.indexOf(k)<st.rev;k++;return`<span class="cell ${v?'on':''}"><span class="in"><span class="fr"></span><span class="bk">${esc(c)}</span></span></span>`}).join('')};
  play('du',()=>({sc:[0,0],stp:1,l:[o.s*1000,o.s*1000],a:0,i:0,rev:0,rt:0,sw:0,ord:mo(LN(0)),msg:'Inizia '+S.n[0]}),
  ()=>{const s=st,tc=i=>`<div class="tc t${i} ${s.a==i?'act':''}" id="tc${i}"><b id="lb${i}">${esc(S.n[i])}${s.a==i?' · IN GIOCO':''}</b><div class="clock" id="d${i}">${fmc(s.l[i])}</div></div>`;
   return`<section class="duel">${tc(0)}<div class="mid"><small>Definizione</small><h2 class="q">${esc(Q[s.i%Q.length][0])}</h2><div class="cells" id="wd" style="--n:${[...W()].length}">${cells()}</div><p class="msg" id="mg">${s.p?'IN PAUSA':esc(s.msg)}</p><button class="b big" id="psb" data-a="ps" ${s.sw>0?'disabled':''}>PASSA ALL'ALTRA SQUADRA</button></div>${tc(1)}${pnl()}</section>`},
  (sv,d)=>({ps:()=>{if(st.sw>0||st.done)return;sv();snd('sw');st.a=1-st.a;st.msg='Cambio turno: tocca a '+S.n[st.a];
   const cs=[...document.querySelectorAll('#wd .cell:not(.sp)')];let m=0;cs.forEach(c=>{if(!c.classList.contains('on')){c.style.setProperty('--d',m++*90+'ms');c.classList.add('on')}});
   st.sw=Math.max(1500,m*90+1100);bn('TOCCA A '+S.n[st.a].toUpperCase());
   [0,1].forEach(i=>{const t=$('#tc'+i),l=$('#lb'+i);if(t)t.classList.toggle('act',st.a==i);if(l)l.textContent=S.n[i]+(st.a==i?' · IN GIOCO':'')});const g=$('#mg');if(g)g.textContent=st.msg;const p=$('#psb');if(p)p.disabled=true;pubG('game')}}),
  ms=>{if(st.sw>0){st.sw-=ms;if(st.sw<=0){st.sw=0;st.i++;st.rev=0;st.rt=0;st.ord=mo(LN(st.i));st.msg='Tocca a '+S.n[st.a];R()}return}
   const a=st.a,b=st.l[a];st.l[a]-=ms;tick10(b,st.l[a]);const e=$('#d'+a);if(e){e.textContent=fmc(st.l[a]);e.classList.toggle('low',st.l[a]<=10000)}
   if(st.l[a]<=0){st.l[a]=0;snd('end');st.ex=[0,1].map(i=>'Tempo rimasto: '+sec(st.l[i])+' s');st.sc[1-a]+=1;st.note='TEMPO SCADUTO per '+esc(S.n[a])+'!';return fin('IL DUELLO')}
   st.rt+=ms;const tg=Math.min(N()-1,Math.floor(st.rt/2000));while(st.rev<tg){st.rev++;const c=document.querySelectorAll('#wd .cell:not(.sp)')[st.ord[st.rev-1]];if(c)c.classList.add('on','fresh');snd('tick');pubG('game')}},10)}};
/* INTESA VINCENTE */
GM.iv={n:'L’INTESA VINCENTE',s:'REAZIONE A CATENA',i:'🔗',d:'I compagni suggeriscono una parola alla volta: chi indovina vince punti.',r:'Scegli la squadra. I suggeritori guardano lo schermo, chi indovina si gira. In 60 secondi dite una parola alla volta per far indovinare la parola segreta. Quando pensate di aver indovinato, il conduttore preme INDOVINA: il tempo si ferma. Risposta corretta +1, sbagliata −1, poi parola nuova e il tempo riparte. Poi gioca l’altra squadra.',
 o:()=>tsel()+`<label>Secondi per turno<input class="fld" id="o_s" type="number" min="10" value="60" inputmode="numeric"></label>`,
 rd:()=>{OP.iv={tm:nv('o_tm'),s:Math.max(10,nv('o_s')||60)}},
 go:()=>{const o=OP.iv;let P=[];D.iv.forEach(l=>{const[c,w]=l.split(':');w.split(',').forEach(x=>P.push(x))});cust('iv').forEach(l=>P.push(l.split('|')[0].trim()));P=sh(P);
  const nw=()=>{st.wi++};
  play('iv',()=>({sc:[0,0],stp:1,tm:o.tm,ph:'prep',left:o.s*1000,wi:0,g:[0,0],er:[0,0],dn:[false,false],jd:false}),
  ()=>{const s=st,t=s.tm;
   if(s.ph=='prep')return`<section class="c game t${t}"><h2>${tn(t)}</h2><p class="sub">I suggeritori guardano lo schermo, chi indovina si gira. Il timer parte subito.</p><button class="b big" data-a="it">INIZIA TURNO</button>${pnl()}</section>`;
   if(s.ph=='run')return`<section class="c game t${t}"><p>${tn(t)} · Punti <b>${s.sc[t]}</b> · Suggerisce: giocatore ${s.wi%3+1}</p><div class="clock" id="tm">${fm(s.left)}</div><div class="word">${esc(P[s.wi%P.length])}</div><p class="msg">${s.p?'IN PAUSA':s.jd?'TEMPO FERMO: la squadra risponde':''}</p>${s.jd?'<div class="row"><button class="b big" data-a="ok">RISPOSTA CORRETTA</button><button class="b r big" data-a="ko">RISPOSTA SBAGLIATA</button></div>':'<button class="b big" data-a="id">INDOVINA</button>'}${pnl()}</section>`;
   return`<section class="c game t${t}"><h2>TEMPO SCADUTO!</h2><p>${tn(t)}</p><p class="prog">${s.sc[t]} punti</p><p>Indovinate: <b>${s.g[t]}</b> · Sbagliate: <b>${s.er[t]}</b></p><button class="b" data-a="nx">${s.dn[1-t]?'VEDI IL RISULTATO':'TURNO DELL’ALTRA SQUADRA'}</button></section>`},
  (sv,d)=>({it:()=>{sv();st.ph='run';st.p=false;snd('sw');bn(S.n[st.tm].toUpperCase());d()},
   id:()=>{if(st.ph!='run'||st.p||st.jd||st.left<=0)return;sv();st.jd=true;d()},
   ok:()=>{if(st.ph!='run'||st.left<=0||!st.jd)return;sv();snd('ok');st.sc[st.tm]++;st.g[st.tm]++;pts('+1');nw();st.jd=false;d()},
   ko:()=>{if(st.ph!='run'||st.left<=0||!st.jd)return;sv();snd('ko');st.sc[st.tm]--;st.er[st.tm]++;pts('−1','m');nw();st.jd=false;d()},
   nx:()=>{if(st.dn[1-st.tm]){st.note='Risultato finale dopo i due turni.';return fin("L'INTESA VINCENTE")}st.tm=1-st.tm;st.ph='prep';st.left=o.s*1000;st.jd=false;nw();d()}}),
  ms=>{if(st.ph!='run'||st.jd)return;const b=st.left;st.left-=ms;tick10(b,st.left);const e=$('#tm');if(e)e.textContent=fm(st.left);if(st.left<=0){st.left=0;st.ph='res';st.dn[st.tm]=true;snd('end');R()}})}};
/* GIOCO DELLE DATE */
GM.da={n:'IL GIOCO DELLE DATE',s:"L'EREDITÀ",i:'📅',d:'Quattro anni, una sola data giusta: le squadre si alternano.',r:'Ogni domanda ha quattro anni possibili. Le squadre rispondono a turno: +10 punti per ogni risposta esatta. Tocca un anno: il gioco verifica da solo, mostra la spiegazione e passa alla domanda dopo.',
 o:()=>`<label>Numero di domande<input class="fld" id="o_n" type="number" min="2" max="100" value="10" inputmode="numeric"></label><label>Secondi per domanda<input class="fld" id="o_s" type="number" min="5" value="30" inputmode="numeric"></label>`,
 rd:()=>{OP.da={n:Math.max(2,nv('o_n')||10),s:Math.max(5,nv('o_s')||30)}},
 go:()=>{const o=OP.da,Q=sh(D.da.concat(cust('da')).map(l=>l.split('|'))).slice(0,o.n);
  const mk=y=>{y=+y;const k=y<1000?10:1,s=new Set([y]);sh([-7,-4,-2,2,3,5,8]).forEach(x=>{if(s.size<4)s.add(y+x*k)});return[...s].sort((a,b)=>a-b)};
  const nq=()=>{st.i++;if(st.i>=Q.length)return fin('IL GIOCO DELLE DATE');st.tm=1-st.tm;st.o=mk(Q[st.i][2]);st.sel=null;st.lk=false;st.res=null;st.left=o.s*1000;snd('sw');R()};
  const adv=()=>{const g=gen,i=st.i;setTimeout(()=>{if(g!=gen||!st||st.done||st.i!=i||!st.lk)return;if(st.p){adv();return}nq()},2300)};
  play('da',()=>({sc:[0,0],stp:10,i:0,tm:0,o:mk(Q[0][2]),sel:null,lk:false,res:null,left:o.s*1000}),
  ()=>{const s=st,[c,q,y,ex]=Q[s.i];
   return`<section class="c game t${s.tm}">${sb()}<p>Domanda ${s.i+1} di ${Q.length} · ${esc(c)} · tocca a ${tn(s.tm)}</p><div class="clock" id="tm">${sec(s.left)}</div><h2 class="q">${esc(q)}</h2><div class="opts">${s.o.map((x,k)=>`<button class="b w big ${s.lk&&x==y?'ok':''} ${s.lk&&s.sel===k&&x!=y?'ko':''} ${!s.lk&&s.sel===k?'sel':''}" data-a="sl" data-v="${k}">${x}</button>`).join('')}</div>${s.lk?`<p class="msg ${s.res=='ok'?'ok':'ko'}">${{ok:'Esatto! +10 punti',ko:'Sbagliato!',to:'Tempo scaduto!',rv:'Soluzione mostrata'}[s.res]} Anno corretto: ${y}</p><p class="sub">${esc(ex)}</p>`:''}${pnl()}</section>`},
  (sv,d)=>({sl:v=>{if(st.lk||st.done)return;sv();st.sel=+v;st.lk=true;const ok=st.o[st.sel]==Q[st.i][2];st.res=ok?'ok':'ko';if(ok)st.sc[st.tm]+=10;snd(ok?'ok':'ko');d();adv()}}),
  ms=>{if(st.lk)return;const b=st.left;st.left-=ms;tick10(b,st.left);const e=$('#tm');if(e)e.textContent=sec(st.left);if(st.left<=0){st.left=0;st.lk=true;st.res='to';snd('end');R();adv()}})}};
/* GUESS THE SONG */
let CAT=null,CERR=null;
const loadCat=()=>fetch('songs/songs.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw 0;return r.json()}).then(j=>{const seen={};CAT=(Array.isArray(j)?j:j.songs||[]).filter(s=>s&&s.id&&s.title&&s.artist&&s.audio&&!seen[s.id]&&(seen[s.id]=1));CERR=null}).catch(()=>{CAT=null;CERR=1});
const catMsg=()=>CERR?'Impossibile leggere songs/songs.json. Apri il sito pubblicato (Vercel) o un server locale: aprendo il file direttamente il browser blocca la lettura.':CAT===null?'Caricamento catalogo…':CAT.length?CAT.length+' canzoni disponibili':'Nessuna canzone: aggiungi i file in songs/ e le voci in songs/songs.json';
const enc=p=>String(p||'').replace(/^\/+/,'').split('/').map(encodeURIComponent).join('/');
const cvpl=on=>{const e=$('#cv');if(e)e.classList.toggle('pl',on)};
const SG=id=>CAT.find(s=>s.id==id);
const clip=(sg,from,to)=>{if(RM.mode=='regia'){RM.cmd({u:sg.audio,f:from,t:to});return}const my=++agen,ok=()=>my==agen,url=enc(sg.audio);
 const fail=()=>{if(RM.mode=='gioco'){if(ok())dispUnlock(()=>clip(sg,from,to));return}if(ok()&&st&&st.ph=='run'){st.err=true;R()}};
 if(!au){au=new Audio();au.preload='auto'}
 au.pause();
 const go=()=>{if(!ok())return;try{au.currentTime=from}catch(e){}
  au.play().then(()=>{if(!ok())return;const dd=isFinite(au.duration)?au.duration:to;if(from>=dd){au.pause();const g=$('#gm');if(g)g.textContent='Fine dell’audio';return}cvpl(true);setTimeout(()=>{if(ok()){au.pause();cvpl(false)}},Math.max(100,(Math.min(to,dd)-from)*1000))}).catch(fail)};
 au.onerror=fail;
 if(au.dataset.u!=url){au.dataset.u=url;au.src=url;au.load()}
 if(au.readyState>=1)go();else au.addEventListener('loadedmetadata',go,{once:true})};
GM.gs={n:'GUESS THE SONG',s:'QUIZ MUSICALE',i:'🎵',d:'Ascolta pochi secondi e indovina titolo e artista.',r:'Ogni squadra ha il suo turno. Premi ASCOLTA 3 SECONDI: da lì parte il tempo, che non si azzera tra una canzone e l’altra. INDIZIO +5 SEC allunga l’ascolto. RISPOSTA CORRETTA dà +1 e mostra la soluzione; PASSO (2 a squadra) mostra la soluzione senza punti. Il tempo resta fermo durante la soluzione e riparte solo quando premi ASCOLTA 3 SECONDI sulla canzone successiva.',
 o:()=>{loadCat().then(()=>{const e=$('#cat');if(e)e.textContent=catMsg()});return`<label>Secondi per turno<input class="fld" id="o_s" type="number" min="10" value="60" inputmode="numeric"></label><p class="sub" id="cat">${catMsg()}</p>`},
 rd:()=>{OP.gs={s:Math.max(10,nv('o_s')||60)}},
 go:()=>{if(!CAT||!CAT.length){alert(catMsg());return}const o=OP.gs;
  const pick=()=>{const u=CAT.filter(s=>!st.used.includes(s.id));if(!u.length){st.ph='cat';st.song=null;return false}const s=R0(u);st.used.push(s.id);st.song=s.id;st.pos=0;st.err=false;return true};
  const sr=()=>{astop();st.left=o.s*1000;st.p=false;st.started=false;if(pick()){st.ph='run';snd('sw')}};
  const rev=()=>{st.ph='sol';st.rv=false;const g=gen;setTimeout(()=>{if(g!=gen||!st||st.ph!='sol')return;st.rv=true;const e=$('#cv');if(e)e.classList.add('on');pubG('game')},60)};
  const fn=()=>{st.ex=[0,1].map(i=>'Corrette: '+st.ok[i]+' · Passi usati: '+st.ps[i]);fin('GUESS THE SONG')};
  play('gs',()=>({sc:[0,0],stp:1,tm:0,ph:'ready',left:o.s*1000,used:[],song:null,pos:0,err:false,rv:false,started:false,ok:[0,0],ps:[0,0]}),
  ()=>{const s=st,t=s.tm;
   if(s.ph=='ready')return`<section class="c game t0"><p>${tn(0)} contro ${tn(1)}</p><h2>PRONTI?</h2><p class="sub">Ogni squadra ha ${o.s} secondi. Il tempo parte al primo ASCOLTA 3 SECONDI.</p><button class="b big" data-a="sr">INIZIA ROUND</button>${pnl('',1)}</section>`;
   if(s.ph=='tr')return`<section class="c game t${t}"><h2>TEMPO SCADUTO!</h2><p>${tn(t)}</p><p class="prog">${s.sc[t]} punti</p><p>Corrette: <b>${s.ok[t]}</b> · Passi usati: <b>${s.ps[t]}</b></p><button class="b big" data-a="tt">TURNO DI ${esc(S.n[1-t]).toUpperCase()}</button></section>`;
   if(s.ph=='cat')return`<section class="c game t${t}"><h2>CANZONI FINITE!</h2><p class="sub">Hai usato tutte le ${CAT.length} canzoni.</p><div class="row"><button class="b" data-a="rc">RICOMINCIA IL CATALOGO</button><button class="b s" data-a="te">TERMINA PARTITA</button></div>${pnl('',1)}</section>`;
   const g=SG(s.song),sol=s.ph=='sol';
   return`<section class="c game t${t}"><p>${tn(t)} · Punti <b id="pt">${s.sc[t]}</b> · <small>${sol?'SOLUZIONE':s.pos?'ASCOLTA E RISPONDI':'PREMI ASCOLTA'}</small></p><div class="clock" id="tm">${sec(s.left)}</div><div class="cvw"><div class="cv ${sol&&s.rv?'on':''}" id="cv"><div class="cin"><div class="cf0"><span>?</span></div><div class="cb0">${sol?`<img src="${enc(g.cover)}" alt="" onerror="this.remove()">`:''}</div></div></div></div><div class="sol">${sol?`<b>${esc(g.title)}</b><span>${esc(g.artist)}</span>`:''}</div><p class="msg" id="gm">${s.err?'Audio non disponibile per questa traccia.':s.p?'IN PAUSA':!s.started&&!sol?'Timer fermo: parte con ASCOLTA 3 SECONDI':''}</p>`+
   (sol?'<button class="b big" data-a="nx">PROSSIMA CANZONE</button>':`<div class="row"><button class="b" data-a="pl">ASCOLTA 3 SECONDI</button><button class="b s" data-a="hn" ${s.pos?'':'disabled'}>INDIZIO +5 SEC</button></div><div class="row"><button class="b big" data-a="cr" ${s.pos?'':'disabled'}>RISPOSTA CORRETTA</button><button class="b s big" data-a="ps" ${s.ps[t]>=2?'disabled':''}>PASSO</button></div><p class="msg">PASSI DISPONIBILI: ${2-s.ps[t]}/2</p>${s.err?'<button class="b s" data-a="sk">SALTA TRACCIA</button>':''}`)+pnl('',1)+'</section>'},
  (sv,d)=>({sr:()=>{if(st.ph!='ready')return;sr();d()},
   pl:()=>{if(st.ph!='run'||st.p)return;st.err=false;st.started=true;st.pos=Math.max(st.pos,3);clip(SG(st.song),0,3);d()},
   hn:()=>{if(st.ph!='run'||st.p||!st.pos)return;const f=st.pos;st.pos+=5;clip(SG(st.song),f,f+5);d()},
   cr:()=>{if(st.ph!='run'||st.p||!st.pos)return;astop();st.sc[st.tm]++;st.ok[st.tm]++;snd('ok');pts('+1');rev();d()},
   ps:()=>{if(st.ph!='run'||st.p||st.ps[st.tm]>=2)return;astop();st.ps[st.tm]++;snd('sw');rev();d()},
   nx:()=>{if(st.ph!='sol')return;astop();st.started=false;if(pick()){st.ph='run';snd('sw')}d()},
   sk:()=>{if(st.ph!='run'||!st.err)return;astop();st.started=false;if(pick())st.ph='run';d()},
   tt:()=>{if(st.ph!='tr')return;st.tm=1;sr();d()},
   rc:()=>{if(st.ph!='cat')return;st.started=false;st.used=[];if(pick())st.ph='run';d()},
   te:()=>{if(st.ph!='cat')return;fn()},
   pz:()=>{astop();st.p=true;d()}}),
  ms=>{if(st.ph!='run'||!st.started)return;const b=st.left;st.left-=ms;tick10(b,st.left);const e=$('#tm');if(e)e.textContent=sec(st.left);if(st.left<=0){st.left=0;astop();snd('end');if(st.tm==0){st.ph='tr';R()}else fn()}})}};

/* STANZE ONLINE: GIOCO (schermo) e REGIA (comandi) */
const CKF={gh:()=>[['tm',st.left,st.ph==2&&!st.p,'m']],fi:()=>[['tm',st.md?st.jp:st.left,!st.p,st.md?'s':'m']],du:()=>[['d0',st.l[0],st.a==0&&st.sw<=0&&!st.p,'c'],['d1',st.l[1],st.a==1&&st.sw<=0&&!st.p,'c']],iv:()=>[['tm',st.left,st.ph=='run'&&!st.jd&&!st.p,'m']],da:()=>[['tm',st.left,!st.lk&&!st.p,'s']],gs:()=>[['tm',st.left,st.ph=='run'&&st.started&&!st.p,'s']]};
function dispHTML(h){return h.replace(/<details class="mnu">[\s\S]*?<\/details>/g,'').replace(/<button\b[^>]*>[\s\S]*?<\/button>/g,b=>/data-a=/.test(b)?(/class="[^"]*\bw\b/.test(b)?b.replace(/ (data-a|data-v)="[^"]*"/g,'').replace(' disabled',''):''):b).replace(/<input[^>]*id="ai"[^>]*>/g,'<div class="fld typed">…</div>').replace(/<div class="row">\s*<\/div>/g,'')}
function pubG(k){if(RM.mode!='regia'||!st||!gid)return;const c=st.done||!CKF[gid]?[]:CKF[gid]();RM.pub({k,h:dispHTML(A.innerHTML),clk:c.map(x=>[x[0],Math.round(x[1]),x[2]?1:0,x[3]]),n:S.n,g:gid})}
const er=e=>{const x=$('#er'),m=(e&&e.message)||String(e);if(x){x.className='msg ko';x.textContent=m}else alert(m)};
const busy=p=>p.catch(er);
const toast=t=>{const e=$('#er');if(e){e.className='msg ok';e.textContent=t}};
const copy=t=>{try{navigator.clipboard.writeText(t).then(()=>toast('Copiato!'),()=>toast(t))}catch(e){toast(t)}};
const share=l=>{if(navigator.share)navigator.share({title:'QUIZ ARENA',text:'Entra nella mia stanza',url:l}).catch(()=>{});else copy(l)};
function roomScreen(){if(!RM.ok||RM.mode=='regia')return menu();
  acts={cr:()=>busy(RM.init().then(()=>RM.create()).then(lobby)),jn:()=>busy(RM.init().then(()=>joinScr())),lc:()=>{RM.mode='local';menu()},bk:teams};
  scr(`<section class="c"><h2>COLLEGA I DISPOSITIVI</h2><p class="sub">Un dispositivo mostra il gioco (GIOCO), l’altro lo comanda (REGIA). Basta un codice.</p><div class="grid"><div class="cd"><div class="ic">🛰️</div><h2>CREA UNA STANZA</h2><p>Genera un codice da inserire sull’altro dispositivo.</p><button class="b" data-a="cr">CREA UNA STANZA</button></div><div class="cd"><div class="ic">🔑</div><h2>ENTRA IN UNA STANZA</h2><p>Hai già un codice? Collegati alla partita.</p><button class="b" data-a="jn">ENTRA IN UNA STANZA</button></div></div><p class="msg ko" id="er"></p><button class="b g" data-a="lc">GIOCA SOLO SU QUESTO DISPOSITIVO</button><button class="b g" data-a="bk">INDIETRO</button></section>`)}
function joinScr(pre){acts={go:()=>busy(RM.join($('#cd').value).then(lobby)),bk:home};
  scr(`<section class="c"><h2>ENTRA IN UNA STANZA</h2><input class="fld code" id="cd" maxlength="6" placeholder="CODICE" autocapitalize="characters" autocomplete="off" value="${esc(pre||'')}"><p class="msg ko" id="er"></p><button class="b big" data-a="go">ENTRA</button><button class="b g" data-a="bk">INDIETRO</button></section>`)}
function lobby(){stop();RM.unsub();let M={},P={};const me=RM.uid(),code=RM.code(),link=location.origin+location.pathname+'?stanza='+code;
  const card=(r,t,d,ic)=>{const o=M[r],mine=o&&o===me,on=P[r]&&P[r].on;return`<div class="cd role ${mine?'mine':''}"><div class="ic">${ic}</div><h2>${t}</h2><p>${d}</p><span class="stt ${o?'busy':''}">${!o?'LIBERO':mine?'QUESTO DISPOSITIVO':on?'OCCUPATO · CONNESSO':'OCCUPATO · OFFLINE'}</span><button class="b" data-a="role" data-v="${r}" ${o&&!mine&&on?'disabled':''}>${mine?'ENTRA':'SCEGLI '+t}</button></div>`};
  const dr=()=>{A.innerHTML=`<section class="c"><div class="tag">CODICE STANZA</div><div class="rcode">${code}</div><div class="row"><button class="b s" data-a="cp">COPIA CODICE</button><button class="b s" data-a="sl">CONDIVIDI LINK</button></div><div class="grid">${card('gioco','GIOCO','Mostra la partita sullo schermo. Domande, parole, lettere, timer e punteggi, senza i comandi della regia.','📺')}${card('regia','REGIA','Controlla la partita. Gestisci le impostazioni, avvia i round, conferma le risposte e fai avanzare il gioco.','🎛️')}</div><p class="msg ko" id="er"></p><p class="sub">${M.gioco&&M.regia?'Entrambi i ruoli sono assegnati: la partita è pronta.':'In attesa dell’altro dispositivo…'}</p><button class="b g" data-a="lv">ESCI DALLA STANZA</button></section>`};
  acts={role:r=>busy(RM.claim(r).then(()=>enterRole(r))),cp:()=>copy(code),sl:()=>share(link),lv:()=>RM.leave().then(home)};
  RM.on('meta',v=>{M=v||{};dr()});RM.on('pres',v=>{P=v||{};dr()});dr()}
function enterRole(r){RM.unsub();RM.on('pres',p=>{const g=p&&p.gioco,x=$('#rst');if(x)x.textContent='STANZA '+RM.code()+' · SCHERMO '+(g&&g.on?'● COLLEGATO':'○ NON COLLEGATO')});
  if(r=='regia'){RM.mode='regia';if(!$('#rst')){const x=document.createElement('div');x.id='rst';x.className='rst';document.body.appendChild(x)}menu()}else showDisplay()}
let dk=null,dRaf=0,dClk=[],dAt=0,dmi=null,dMsg=0,lastK='';
const WM=['La sfida sta per cominciare…','La regia sta preparando il gioco.','Le squadre sono pronte?','Preparati a mettere alla prova le tue conoscenze.'];
function morphKids(a,b){const x=[...a.childNodes],y=[...b.childNodes];y.forEach((n,i)=>{const o=x[i];if(!o){a.appendChild(n.cloneNode(true));return}
  if(o.nodeType!=n.nodeType||o.nodeName!=n.nodeName){o.replaceWith(n.cloneNode(true));return}
  if(n.nodeType==3){if(o.data!=n.data)o.data=n.data;return}
  [...o.attributes].forEach(t=>{if(!n.hasAttribute(t.name))o.removeAttribute(t.name)});[...n.attributes].forEach(t=>{if(o.getAttribute(t.name)!=t.value)o.setAttribute(t.name,t.value)});morphKids(o,n)});
  for(let i=x.length-1;i>=y.length;i--)x[i].remove()}
function morph(el,html){const t=document.createElement('template');t.innerHTML=html;morphKids(el,t.content)}
const waitHTML=s=>`<section class="c wait"><div class="halo"><img class="logo" src="assets/logo.png" alt="QUIZ ARENA"></div>${s.k=='prev'?`<div class="ic">${s.i}</div><h2>${esc(s.gn)}</h2><p class="sub">${esc(s.gd)}</p>`:''}<p class="sub wm" id="wmsg">${esc(s.m||WM[0])}</p><div class="wdots"><i></i><i></i><i></i></div>${s.n?`<p class="sub">${esc(s.n[0])} · ${esc(s.n[1])}</p>`:''}</section>`;
function dframe(){dRaf=0;if(dk!='g')return;let run=0;dClk.forEach(([id,ms,r,f])=>{const e=$('#dv #'+id);if(!e)return;const v=r?ms-(RM.now()-dAt):ms,t=({m:fm,s:sec,c:fmc})[f](v);if(r)run=1;if(e.textContent!=t)e.textContent=t;e.classList.toggle('low',!!r&&v<=10000)});if(run)dRaf=requestAnimationFrame(dframe)}
function dispRender(s){if(s.n)s.n=Object.values(s.n);S.n=s.n||S.n;const dv=$('#dv'),w=s.k=='game'||s.k=='fin',kind=w?'g':s.k,html=w?`<div class="dg">${s.h}</div>`:waitHTML(s);
  if(dk===kind)morph(dv,html);else{dv.innerHTML=html;dv.classList.remove('ani');void dv.offsetWidth;dv.classList.add('ani')}
  dk=kind;dClk=Object.values(s.clk||{}).map(x=>Object.values(x));dAt=s.at;clearInterval(dmi);dmi=null;
  if(!w)dmi=setInterval(()=>{const e=$('#wmsg');if(e)e.textContent=WM[++dMsg%WM.length]},4500);
  else{cancelAnimationFrame(dRaf);dframe();if(s.k=='fin'&&lastK!='fin')conf()}
  lastK=s.k}
function dispUnlock(f){if(document.querySelector('.mdl'))return;const o=document.createElement('div');o.className='mdl';o.innerHTML='<div class="mbx"><p>Tocca per attivare l’audio</p><button class="b big" data-m="1">ATTIVA AUDIO</button></div>';o.addEventListener('click',()=>{o.remove();f()});document.body.appendChild(o)}
function showDisplay(){stop();st=null;acts={};RM.mode='gioco';document.body.classList.add('disp');document.body.classList.remove('is-home');dk=null;lastK='';
  A.innerHTML='<div id="dv"></div><div id="dpill" class="dpill" hidden>Connessione con la regia interrotta. In attesa di riconnessione…</div>';
  dispRender({k:'wait',m:WM[0]});
  RM.on('snap',s=>{if(s)dispRender(s)});RM.on('pres',p=>{const r=p&&p.regia,e=$('#dpill');if(e)e.hidden=!(r&&r.on===false)});
  RM.onCmd(c=>{if(c.s){astop();return}clip({audio:c.u},c.f,c.t)})}
function restore(){if(!RM.ok)return;const s=RM.saved();if(!s)return;RM.init().then(()=>RM.join(s.code)).then(()=>s.role?RM.claim(s.role).then(()=>enterRole(s.role)):lobby()).catch(()=>RM.forget())}
home();
{const q=new URLSearchParams(location.search).get('stanza');if(q&&RM.ok)RM.init().then(()=>joinScr(q.toUpperCase())).catch(er);else restore()}
})();
