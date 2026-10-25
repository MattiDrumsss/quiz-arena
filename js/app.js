(()=>{
const $=s=>document.querySelector(s),A=$('#app'),R0=a=>a[Math.random()*a.length|0];
const sh=a=>{a=a.slice();for(let i=a.length;i>1;){const j=Math.random()*i--|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const LS={g:(k,d)=>{try{const v=localStorage.getItem('qa_'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},s:(k,v)=>{try{localStorage.setItem('qa_'+k,JSON.stringify(v))}catch(e){}}};
const S={n:LS.g('n',['Squadra 1','Squadra 2']),snd:LS.g('snd',true)};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sec=ms=>Math.max(0,Math.ceil(ms/1000)),fm=ms=>{const s=sec(ms);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const tn=i=>`<span class="tg t${i}">${esc(S.n[i])}</span>`;
let st=null,acts={},tk=null,gen=0,lt=0,hist=[],ac,OP={},R=()=>{};
const stop=()=>{clearInterval(tk);tk=null;gen++};
const run=f=>{let l=Date.now();tk=setInterval(()=>{const n=Date.now(),d=n-l;l=n;if(st&&!st.p&&!st.done)f(d)},100)};
function snd(t){if(!S.snd)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();const f={ok:[660,880],ko:[220,150],tick:[900],end:[300,200,120],win:[523,659,784,1047],sw:[500,650]}[t];f.forEach((h,i)=>{const o=ac.createOscillator(),g=ac.createGain(),s=ac.currentTime+i*.12;o.frequency.value=h;o.type=t=='ko'||t=='end'?'sawtooth':'sine';o.connect(g);g.connect(ac.destination);g.gain.setValueAtTime(.15,s);g.gain.exponentialRampToValueAtTime(.001,s+.2);o.start(s);o.stop(s+.22)})}catch(e){}}
const tick10=(b,n)=>{if(sec(b)!=sec(n)&&sec(n)<=10&&sec(n)>0)snd('tick')};
const scr=h=>{A.innerHTML=h;A.classList.remove('ani');void A.offsetWidth;A.classList.add('ani');window.scrollTo(0,0)};
A.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled)return;const a=b.dataset.a,n=Date.now();if(a!='adj'&&n-lt<300)return;lt=n;if(acts[a])acts[a](b.dataset.v)});
const logo=`<svg class="logo" viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22e4ff"/><stop offset="1" stop-color="#ff2bd6"/></linearGradient></defs><polygon points="60,6 108,33 108,87 60,114 12,87 12,33" fill="#0a0f2e" stroke="url(#lg)" stroke-width="5"/><text x="60" y="80" text-anchor="middle" font-size="58" font-weight="900" fill="url(#lg)" font-family="Arial Black,Impact,sans-serif">Q</text></svg>`;
const tsel=()=>`<label>Squadra che gioca<select id="o_tm"><option value="0">${esc(S.n[0])}</option><option value="1">${esc(S.n[1])}</option></select></label>`;
const nv=id=>+($('#'+id)?.value);
const pnl=x=>`<div class="pnl">${x||''}<button class="b s" data-a="pz" ${st.p?'disabled':''}>PAUSA</button><button class="b s" data-a="rp" ${st.p?'':'disabled'}>RIPRENDI</button><button class="b s" data-a="un">ANNULLA ULTIMA AZIONE</button><button class="b s" data-a="rs">RIAVVIA</button><button class="b s" data-a="mn">MENU</button></div>`;
const sb=()=>`<div class="sb">${[0,1].map(i=>`<div class="tm t${i}"><b>${esc(S.n[i])}</b><strong id="sc${i}">${st.sc[i]}</strong><span><button data-a="adj" data-v="${i},-1" aria-label="Meno">−</button><button data-a="adj" data-v="${i},1" aria-label="Più">+</button></span></div>`).join('')}</div>`;
function play(id,init,view,a,tf){
  stop();st=init();hist=[];
  const draw=()=>{const e=$('#ai');if(e&&st&&st.ans!==undefined)st.ans=e.value;A.innerHTML=view()};
  R=draw;
  const sv=()=>{hist.push(JSON.stringify(st));if(hist.length>60)hist.shift()};
  acts=Object.assign({
    adj:v=>{const[i,d]=v.split(',');st.sc[i]=Math.max(0,st.sc[i]+d*st.stp);draw()},
    pz:()=>{st.p=true;draw()},rp:()=>{st.p=false;draw()},
    un:()=>{if(hist.length){st=JSON.parse(hist.pop());draw()}},
    rs:()=>{if(confirm('Riavviare la partita? I progressi andranno persi.'))GM[id].go()},
    mn:()=>{if(confirm('Tornare al menu? I progressi andranno persi.'))menu()},
    hm:home,ot:menu,ag:()=>GM[id].go()
  },a(sv,draw));
  draw();run(tf);
}
function fin(t){
  stop();st.done=true;snd('win');const[a,b]=st.sc,w=a==b?'PAREGGIO':'VINCE '+esc(S.n[a>b?0:1]).toUpperCase();
  scr(`<section class="c fin"><h2>${t}</h2><div class="win">${w}</div><div class="res">${[0,1].map(i=>`<div class="tm t${i}"><b>${esc(S.n[i])}</b><strong>${st.sc[i]}</strong>${st.ex?`<small>${st.ex[i]}</small>`:''}</div>`).join('')}</div>${st.note?`<p class="sub">${st.note}</p>`:''}<button class="b" data-a="ag">RIGIOCA</button><button class="b s" data-a="ot">SCEGLI UN ALTRO GIOCO</button><button class="b s" data-a="hm">TORNA ALLA HOME</button></section>`);
}
const cust=k=>LS.g('cu_'+k,[]);
const ID=['gh','fi','du','iv','da'];
const GM={};
function home(){stop();st=null;acts={go:teams,rl:rules,sd:()=>{S.snd=!S.snd;LS.s('snd',S.snd);home()}};
  scr(`<section class="c">${logo}<h1>QUIZ ARENA</h1><p class="sub">I giochi dei quiz TV da giocare con gli amici: due squadre, un organizzatore, nessuna registrazione.</p><button class="b" data-a="go">INIZIA A GIOCARE</button><button class="b s" data-a="rl">REGOLE DEI GIOCHI</button><button class="b s" data-a="sd">EFFETTI SONORI: ${S.snd?'ATTIVI':'SPENTI'}</button></section>`)}
function rules(){acts={hm:home};scr(`<section class="c"><h2>REGOLE DEI GIOCHI</h2><div class="grid">${ID.map(i=>`<div class="cd"><div class="ic">${GM[i].i}</div><h2>${GM[i].n}</h2><p>${GM[i].r}</p></div>`).join('')}</div><button class="b" data-a="hm">TORNA ALLA HOME</button></section>`)}
function teams(){acts={hm:home,ok:()=>{S.n=[0,1].map(i=>$('#n'+i).value.trim()||'Squadra '+(i+1));LS.s('n',S.n);menu()}};
  scr(`<section class="c"><h2>CHI GIOCA?</h2><div class="grid">${[0,1].map(i=>`<div class="cd tcard t${i}"><div class="ic">${i?'🔥':'⚡'}</div><h2>SQUADRA ${i+1}</h2><input class="fld" id="n${i}" maxlength="24" placeholder="Squadra ${i+1}" value="${S.n[i]=='Squadra '+(i+1)?'':esc(S.n[i])}" autocomplete="off"></div>`).join('')}</div><button class="b" data-a="ok">CONFERMA</button><button class="b s" data-a="hm">INDIETRO</button></section>`)}
function menu(){stop();st=null;acts={pr:prep,tm:teams,hm:home};
  scr(`<section class="c"><h2>SCEGLI UN GIOCO</h2><p class="sub">${tn(0)} contro ${tn(1)}</p><div class="grid">${ID.map(i=>`<div class="cd"><div class="ic">${GM[i].i}</div><h2>${GM[i].n}</h2><small>${GM[i].s}</small><p>${GM[i].d}</p><button class="b" data-a="pr" data-v="${i}">GIOCA</button></div>`).join('')}</div><button class="b s" data-a="tm">CAMBIA SQUADRE</button><button class="b s" data-a="hm">HOME</button></section>`)}
const HINT={gh:'5 indizi separati da virgola, poi | e la soluzione. Esempio: ARTIFICIO,FATUO,AMICO,INCROCIATO,SACRO|FUOCO',fi:'domanda|risposta corretta|risposta sbagliata',du:'domanda|risposta',iv:'parola|categoria',da:'categoria|domanda|anno|spiegazione'};
const NEED={gh:2,fi:3,du:2,iv:1,da:4};
function prep(id){stop();acts={st:()=>{GM[id].rd();GM[id].go()},bk:menu,ac:()=>{const l=prompt(HINT[id]);if(!l)return;if(l.split('|').length<NEED[id]||(id=='gh'&&l.split('|')[0].split(',').length!=5)||(id=='da'&&isNaN(+l.split('|')[2]))){alert('Formato non valido. Usa: '+HINT[id]);return}const c=cust(id);c.push(l.trim());LS.s('cu_'+id,c);alert('Aggiunto!')}};
  scr(`<section class="c"><div class="ic" style="font-size:3rem">${GM[id].i}</div><h2>${GM[id].n}</h2><p class="sub">${GM[id].r}</p><div class="cd opt">${GM[id].o()}</div><button class="b" data-a="st">INIZIA IL GIOCO</button><button class="b s" data-a="ac">AGGIUNGI ${id=='iv'?'PAROLA':id=='gh'?'PARTITA':'DOMANDA'}</button><button class="b s" data-a="bk">INDIETRO</button></section>`)}

/* LA GHIGLIOTTINA */
const ghS=()=>D.gh.concat(cust('gh').map(l=>{const[x,s]=l.split('|');return[x,s.trim().toUpperCase(),sh(D.DEC).slice(0,5).join(',')]}));
GM.gh={n:'LA GHIGLIOTTINA',s:"L'EREDITÀ",i:'🪓',d:'Scegli le parole giuste, poi trova la soluzione che le lega tutte.',r:'Cinque coppie di parole: ogni risposta sbagliata dimezza il montepremi. Poi cinque indizi e 60 secondi per trovare la parola che li collega. Giudica l’organizzatore.',
 o:()=>tsel()+`<label>Montepremi iniziale<input class="fld" id="o_jp" type="number" min="1000" step="1000" value="100000" inputmode="numeric"></label><label>Partita<select id="o_set">${ghS().map((s,i)=>`<option value="${i}">${i<D.gh.length?'Partita '+(i+1):'Personalizzata '+(i-D.gh.length+1)}</option>`).join('')}</select></label>`,
 rd:()=>{OP.gh={tm:nv('o_tm'),jp:Math.max(1000,nv('o_jp')||100000),set:nv('o_set')}},
 go:()=>{const o=OP.gh,s=ghS()[o.set],c=s[0].split(',').map(x=>x.trim().toUpperCase()),d=s[2].split(',').map(x=>x.trim().toUpperCase());
  play('gh',()=>({sc:[0,0],stp:1000,tm:o.tm,jp:o.jp,c,d,sol:s[1],ph:1,i:0,f:c.map(()=>Math.random()<.5),pk:null,fb:null,rv:false,left:60000,p:false,ans:'',cf:false,lk:false}),
  ()=>{const s=st;let h=`<section class="c game">${sb()}<div class="jp">MONTEPREMI<strong>${s.jp.toLocaleString('it-IT')}</strong></div>`;
   if(s.ph==1){const cr=s.f[s.i]?1:0,w=cr?[s.d[s.i],s.c[s.i]]:[s.c[s.i],s.d[s.i]];
    h+=`<p class="sub">Coppia ${s.i+1} di 5 · ${tn(s.tm)} sceglie una parola</p><div class="pair">${w.map((x,k)=>`<button class="b w ${s.pk===k?'sel':''} ${s.fb&&s.pk===k?s.fb:''} ${s.rv&&k==cr?'ok':''}" data-a="pk" data-v="${k}">${esc(x)}</button>`).join('')}</div><div class="row"><button class="b" data-a="gok">RISPOSTA CORRETTA</button><button class="b r" data-a="gko">RISPOSTA SBAGLIATA</button><button class="b s" data-a="rv">MOSTRA SOLUZIONE</button></div>`}
   else h+=`<div class="clues">${s.c.map(x=>`<span>${esc(x)}</span>`).join('')}</div><div class="clock" id="tm">${fm(s.left)}</div><input class="fld" id="ai" placeholder="Scrivi la soluzione" value="${esc(s.ans)}" autocomplete="off" autocapitalize="characters"><div class="row"><button class="b" data-a="cf">CONFERMA</button><button class="b" data-a="gok">RISPOSTA CORRETTA</button><button class="b r" data-a="gko">RISPOSTA SBAGLIATA</button><button class="b s" data-a="rv">MOSTRA SOLUZIONE</button></div>${s.cf?`<p class="msg">Risposta data: <b>${esc(s.ans)}</b> ${s.ans.trim().toUpperCase()==s.sol?'(coincide con la soluzione)':''}</p>`:''}${s.rv?`<p class="msg">Soluzione: <b>${esc(s.sol)}</b></p>`:''}`;
   return h+pnl()+'</section>'},
  (sv,d)=>{const nx=()=>{st.lk=true;d();const g=gen;setTimeout(()=>{if(g!=gen||!st||!st.lk)return;st.lk=false;st.pk=null;st.fb=null;st.rv=false;st.i++;if(st.i>4){st.ph=2;st.left=60000}d()},900)};
   return{pk:v=>{if(!st.lk){st.pk=+v;d()}},rv:()=>{st.rv=!st.rv;d()},
    gok:()=>{if(st.lk||st.done)return;sv();snd('ok');if(st.ph==1){st.fb='ok';nx()}else{st.sc[st.tm]+=st.jp;st.note='Soluzione: '+esc(st.sol);fin('LA GHIGLIOTTINA')}},
    gko:()=>{if(st.lk||st.done)return;sv();snd('ko');if(st.ph==1){st.jp=Math.floor(st.jp/2);st.fb='ko';nx()}else{st.note='Soluzione: '+esc(st.sol);fin('LA GHIGLIOTTINA')}},
    cf:()=>{sv();st.cf=true;st.p=true;d()}}},
  ms=>{if(st.ph!=2||st.cf)return;const b=st.left;st.left-=ms;tick10(b,st.left);const e=$('#tm');if(e)e.textContent=fm(st.left);if(st.left<=0){st.left=0;snd('end');st.note='Tempo scaduto! Soluzione: '+esc(st.sol);fin('LA GHIGLIOTTINA')}})}};

/* AVANTI UN ALTRO */
GM.fi={n:'IL GIOCO FINALE',s:'AVANTI UN ALTRO!',i:'🎯',d:'21 risposte sbagliate di fila: tocca quella sbagliata!',r:'Ogni domanda ha due risposte. Devi toccare quella SBAGLIATA, 21 volte di fila. Se tocchi quella giusta, la serie riparte da zero.',
 o:()=>tsel()+`<label>Modalità<select id="o_md"><option value="0">Classica: 150 secondi</option><option value="1">Montepremi: 100.000 punti, −1.000 al secondo</option></select></label>`,
 rd:()=>{OP.fi={tm:nv('o_tm'),md:nv('o_md')}},
 go:()=>{const o=OP.fi,Q=sh(D.fi.concat(cust('fi')).map(l=>l.split('|')));
  play('fi',()=>({sc:[0,0],stp:100,tm:o.tm,md:o.md,i:0,cnt:0,left:150000,jp:100000,f:Math.random()<.5,fb:null}),
  ()=>{const s=st,[q,c,w]=Q[s.i%Q.length],op=s.f?[w,c]:[c,w];
   return`<section class="c game">${sb()}<p>${tn(s.tm)} · ${s.md?'MONTEPREMI':'CLASSICA'}</p><div class="prog">${s.cnt}/21</div><div class="clock" id="tm">${s.md?sec(s.jp):fm(s.left)}</div>${s.md?`<div class="jp">MONTEPREMI<strong id="jp">${s.jp.toLocaleString('it-IT')}</strong></div>`:''}<h2 class="q">${esc(q)}</h2><div class="pair">${op.map((x,k)=>`<button class="b w big" data-a="an" data-v="${k}">${esc(x)}</button>`).join('')}</div><p class="msg ${s.fb?s.fb[0]:''}">${s.fb?s.fb[1]:'Tocca la risposta SBAGLIATA'}</p>${pnl()}</section>`},
  (sv,d)=>({an:v=>{if(st.done)return;sv();const ok=+v==(st.f?1:0);st.f=Math.random()<.5;st.i++;
    if(!ok){st.cnt++;snd('ok');st.fb=['good','Sbagliata! Ottimo!'];if(st.cnt>=21){st.sc[st.tm]+=st.md?st.jp:sec(st.left)*10;st.note='21 su 21!';return fin('AVANTI UN ALTRO!')}}
    else{st.cnt=0;snd('ko');st.fb=['bad','Era quella giusta: si riparte da 0'];if(st.md)st.jp=Math.max(0,st.jp-5000)}
    d()}}),
  ms=>{const b=st.md?st.jp:st.left;if(st.md)st.jp-=ms;else st.left-=ms;const n=st.md?st.jp:st.left;tick10(b,n);const e=$('#tm');if(e)e.textContent=st.md?sec(st.jp):fm(st.left);const j=$('#jp');if(j)j.textContent=Math.max(0,Math.ceil(st.jp/1000)*1000).toLocaleString('it-IT');
   if(n<=0){snd('end');st.note='Tempo scaduto: serie raggiunta '+st.cnt+'/21';fin('AVANTI UN ALTRO!')}})}};
/* IL DUELLO */
GM.du={n:'IL DUELLO',s:"L'EREDITÀ",i:'⚔️',d:'Due squadre, due timer indipendenti: chi resta senza tempo perde.',r:'Gira un solo timer alla volta: quello della squadra attiva. A ogni risposta corretta si ferma e parte quello dell’avversaria. Chi arriva a zero perde.',
 o:()=>`<label>Secondi per squadra<input class="fld" id="o_s" type="number" min="10" value="60" inputmode="numeric"></label><label>Penalità per risposta sbagliata (secondi)<input class="fld" id="o_p" type="number" min="0" value="3" inputmode="numeric"></label>`,
 rd:()=>{OP.du={s:Math.max(10,nv('o_s')||60),p:Math.max(0,isNaN(nv('o_p'))?3:nv('o_p'))}},
 go:()=>{const o=OP.du,Q=sh(D.du.concat(cust('du')).map(l=>l.split('|')));
  const end=w=>{st.ex=[0,1].map(i=>'Tempo rimasto: '+sec(st.l[i])+' s');if(w>=0)st.sc[w]+=1;st.note=w<0?'Tempo pari: nessun punto.':'Il tempo di '+esc(S.n[1-w])+' è finito.';fin('IL DUELLO')};
  play('du',()=>({sc:[0,0],stp:1,l:[o.s*1000,o.s*1000],a:0,rn:false,i:0,sh:false,fb:null}),
  ()=>{const s=st,[q,an]=Q[s.i%Q.length];
   const tc=i=>`<div class="tc t${i} ${s.a==i&&s.rn&&!s.p?'act':''}"><b>${esc(S.n[i])}</b><div class="clock" id="d${i}">${sec(s.l[i])}</div></div>`;
   return`<section class="duel">${tc(0)}<div class="mid"><small>Domanda ${s.i+1} · tocca a ${tn(s.a)}</small><h2 class="q">${esc(q)}</h2>${s.sh?`<p class="jp"><strong>${esc(an)}</strong></p>`:''}<p class="msg ${s.fb?s.fb[0]:''}">${s.fb?s.fb[1]:''}</p><div class="row"><button class="b" data-a="av" ${s.rn?'disabled':''}>AVVIA PARTITA</button><button class="b" data-a="dok" ${s.rn?'':'disabled'}>RISPOSTA CORRETTA</button><button class="b r" data-a="dko" ${s.rn?'':'disabled'}>RISPOSTA SBAGLIATA</button><button class="b s" data-a="ps" ${s.rn?'':'disabled'}>PASSA</button><button class="b s" data-a="rv">MOSTRA RISPOSTA</button><button class="b s" data-a="nq">PROSSIMA DOMANDA</button><button class="b s" data-a="tp">TERMINA PARTITA</button></div></div>${tc(1)}${sb()}${pnl()}</section>`},
  (sv,d)=>({av:()=>{sv();st.rn=true;st.a=0;snd('sw');d()},
   dok:()=>{sv();snd('ok');st.a=1-st.a;st.i++;st.sh=false;st.fb=['ok','Corretta! Ora tocca a '+esc(S.n[st.a])];d()},
   dko:()=>{sv();snd('ko');st.l[st.a]=Math.max(0,st.l[st.a]-o.p*1000);st.fb=['ko','Sbagliata! −'+o.p+' s'];if(st.l[st.a]<=0)return end(1-st.a);d()},
   ps:()=>{sv();st.i++;st.sh=false;st.fb=['','Passata: i timer non cambiano'];d()},
   nq:()=>{sv();st.i++;st.sh=false;st.fb=null;d()},rv:()=>{st.sh=!st.sh;d()},
   tp:()=>{if(!confirm('Terminare la partita?'))return;end(st.l[0]==st.l[1]?-1:st.l[0]>st.l[1]?0:1)}}),
  ms=>{if(!st.rn)return;const a=st.a,b=st.l[a];st.l[a]-=ms;tick10(b,st.l[a]);const e=$('#d'+a);if(e)e.textContent=sec(st.l[a]);if(st.l[a]<=0){st.l[a]=0;snd('end');end(1-a)}})}};
/* INTESA VINCENTE */
GM.iv={n:'L’INTESA VINCENTE',s:'REAZIONE A CATENA',i:'🔗',d:'Un concorrente indovina la parola segreta, gli altri due costruiscono la domanda.',r:'Tre concorrenti per squadra, un turno ciascuno. Due compagni costruiscono una domanda alternando una parola, il terzo indovina. L’organizzatore vede la parola e giudica. Telefono rivolto verso l’organizzatore!',
 o:()=>`<label>Secondi per turno<input class="fld" id="o_s" type="number" min="10" value="60" inputmode="numeric"></label><label>Difficoltà<select id="o_df"><option value="0">Tutte</option><option value="1">Facili</option><option value="2">Difficili</option></select></label>`,
 rd:()=>{OP.iv={s:Math.max(10,nv('o_s')||60),df:nv('o_df')}},
 go:()=>{const o=OP.iv;let P=[];D.iv.forEach(l=>{const[c,w]=l.split(':');w.split(',').forEach((x,i)=>P.push({w:x,c,e:i<6}))});cust('iv').forEach(l=>{const[w,c]=l.split('|');P.push({w:w.trim(),c:(c||'Altro').trim(),e:true})});
  if(o.df)P=P.filter(x=>o.df==1?x.e:!x.e);if(!P.length)P=[{w:'parola',c:'Altro'}];P=sh(P);
  const nt=()=>{st.turn++;if(st.turn>=6)return fin("L'INTESA VINCENTE");snd('sw');st.run=false;st.left=o.s*1000;st.g=0;st.vis=false;R()};
  const nw=()=>{st.wi++;st.vis=false};
  play('iv',()=>({sc:[0,0],stp:1,turn:0,run:false,left:o.s*1000,wi:0,g:0,er:0,vis:false}),
  ()=>{const s=st,t=s.turn%2,x=P[s.wi%P.length];
   return`<section class="c game ${'t'+t}">${sb()}<p>Turno ${s.turn+1} di 6 · ${tn(t)} · Concorrente ${Math.floor(s.turn/2)+1}</p><div class="clock" id="tm">${fm(s.left)}</div><p>Indovinate: <b>${s.g}</b> · Errori: <b>${s.er}</b></p>${s.run?`<small>${esc(x.c)}</small><div class="word">${s.vis?esc(x.w):'••••••'}</div><div class="row"><button class="b" data-a="pi">PAROLA INDOVINATA</button><button class="b r" data-a="er">ERRORE</button><button class="b s" data-a="ps">PASSA</button><button class="b s" data-a="mp">${s.vis?'NASCONDI PAROLA':'MOSTRA PAROLA'}</button><button class="b s" data-a="ft">FINE TURNO</button></div>`:`<p class="sub">Tocca a ${tn(t)}: concorrente ${Math.floor(s.turn/2)+1}.</p><button class="b" data-a="it">INIZIA TURNO</button>`}${pnl()}</section>`},
  (sv,d)=>({it:()=>{sv();st.run=true;snd('sw');d()},pi:()=>{sv();snd('ok');st.sc[st.turn%2]++;st.g++;nw();d()},er:()=>{sv();snd('ko');st.er++;nw();d()},ps:()=>{sv();nw();d()},mp:()=>{st.vis=!st.vis;d()},ft:()=>{sv();nt()}}),
  ms=>{if(!st.run)return;const b=st.left;st.left-=ms;tick10(b,st.left);const e=$('#tm');if(e)e.textContent=fm(st.left);if(st.left<=0){snd('end');nt()}})}};
/* GIOCO DELLE DATE */
GM.da={n:'IL GIOCO DELLE DATE',s:"L'EREDITÀ",i:'📅',d:'Quattro anni, una sola data giusta: le squadre si alternano.',r:'Ogni domanda ha quattro anni possibili. Le squadre rispondono a turno: +10 punti per ogni risposta esatta. Dopo la risposta compare la spiegazione.',
 o:()=>`<label>Numero di domande<input class="fld" id="o_n" type="number" min="2" max="100" value="10" inputmode="numeric"></label><label>Secondi per domanda<input class="fld" id="o_s" type="number" min="5" value="30" inputmode="numeric"></label>`,
 rd:()=>{OP.da={n:Math.max(2,nv('o_n')||10),s:Math.max(5,nv('o_s')||30)}},
 go:()=>{const o=OP.da,Q=sh(D.da.concat(cust('da')).map(l=>l.split('|'))).slice(0,o.n);
  const mk=y=>{y=+y;const k=y<1000?10:1,s=new Set([y]);sh([-7,-4,-2,2,3,5,8]).forEach(x=>{if(s.size<4)s.add(y+x*k)});return[...s].sort((a,b)=>a-b)};
  const nq=()=>{st.i++;if(st.i>=Q.length)return fin('IL GIOCO DELLE DATE');st.tm=1-st.tm;st.o=mk(Q[st.i][2]);st.sel=null;st.lk=false;st.res=null;st.left=o.s*1000;snd('sw');R()};
  play('da',()=>({sc:[0,0],stp:10,i:0,tm:0,o:mk(Q[0][2]),sel:null,lk:false,res:null,left:o.s*1000}),
  ()=>{const s=st,[c,q,y,ex]=Q[s.i];
   return`<section class="c game t${s.tm}">${sb()}<p>Domanda ${s.i+1} di ${Q.length} · ${esc(c)} · tocca a ${tn(s.tm)}</p><div class="clock" id="tm">${sec(s.left)}</div><h2 class="q">${esc(q)}</h2><div class="opts">${s.o.map((x,k)=>`<button class="b w big ${s.lk&&x==y?'ok':''} ${s.lk&&s.sel===k&&x!=y?'ko':''} ${!s.lk&&s.sel===k?'sel':''}" data-a="sl" data-v="${k}">${x}</button>`).join('')}</div>${s.lk?`<p class="msg ${s.res=='ok'?'ok':'ko'}">${{ok:'Esatto! +10 punti',ko:'Sbagliato!',to:'Tempo scaduto!',rv:'Soluzione mostrata'}[s.res]} Anno corretto: ${y}</p><p class="sub">${esc(ex)}</p>`:''}<div class="row">${s.lk?'<button class="b" data-a="nq">PROSSIMA DOMANDA</button>':'<button class="b" data-a="cf">CONFERMA RISPOSTA</button><button class="b s" data-a="rv">MOSTRA SOLUZIONE</button><button class="b s" data-a="nq">PASSA</button>'}</div>${pnl()}</section>`},
  (sv,d)=>({sl:v=>{if(!st.lk){st.sel=+v;d()}},
   cf:()=>{if(st.sel==null||st.lk)return alert('Seleziona prima un anno.');sv();st.lk=true;const ok=st.o[st.sel]==Q[st.i][2];st.res=ok?'ok':'ko';if(ok)st.sc[st.tm]+=10;snd(ok?'ok':'ko');d()},
   rv:()=>{if(st.lk)return;sv();st.lk=true;st.res='rv';d()},nq:()=>{sv();nq()}}),
  ms=>{if(st.lk)return;const b=st.left;st.left-=ms;tick10(b,st.left);const e=$('#tm');if(e)e.textContent=sec(st.left);if(st.left<=0){st.left=0;st.lk=true;st.res='to';snd('end');R()}})}};
home();
})();
