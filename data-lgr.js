/*!
 * Filòs — © 2026 i titolari del progetto Filòs. Tutti i diritti riservati.
 * Codice e contenuti sono opere protette dalla legge sul diritto d'autore (L. 633/1941).
 * È vietata qualsiasi copia, riproduzione, modifica o ridistribuzione senza autorizzazione scritta.
 */
// ══════════════════════════════════════════
// CHE LINGUA È? — A DISTANZA
// Stesso collegamento degli altri giochi a distanza (sfida con notifica, sala d'attesa, Guida).
// Ogni telefono ricostruisce la partita dagli stessi dati condivisi:
//  rooms/{code}/lg/players/{nome} = {n,t}
//  rooms/{code}/lg/meta = {phase, order, game, qs, opts, q, rv, end}   scritto da chi guida
//  rooms/{code}/lg/left/{nome} = true
//  rooms/{code}/lg/g{game}/a{q}/{nome} = {c:numero della lingua scelta} | {skip:true}
// qs: le 10 frasi (indici di LG_PH, uguali in tutte le lingue).
// opts: per ogni frase le 4 lingue tra cui scegliere (numeri di LG_IDS), già mescolate e uguali
// per tutti: ognuno le legge nella propria lingua.
// ══════════════════════════════════════════
var LGR_Q_MS=RL_ANS_MS; // tempo per rispondere a ogni domanda
var LGR_REV_MS=10000; // pausa dopo la soluzione, prima della frase successiva (gli altri giochi: 20 secondi)
var LGR_MAX_PLAYERS=20,LGR_ROUNDS=10,LGR_FORCE_MS=45000;
var LGR={code:null,me:null,data:null,unsub:null,sig:"",val:null,valKey:"",busy:false,closed:false};

function lgrPath(p){return "rooms/"+LGR.code+"/lg"+(p?"/"+p:"");}

// ── Stato derivato ──
function lgrState(){
 var d=LGR.data||{};var meta=d.meta||{phase:"lobby",order:[],game:1};
 var players=Object.keys(d.players||{}).sort(function(a,b){return (d.players[a].t||0)-(d.players[b].t||0);}).map(function(k){return d.players[k].n||k;});
 var left=d.left||{};
 var isLeft=function(n){return !!left[cdrKey(n)];};
 var lobby=players.filter(function(n){return !isLeft(n);});
 var order=meta.order||[];
 var active=order.filter(function(n){return !isLeft(n);});
 var phase=meta.phase||"lobby";
 var game=meta.game||1;
 var qs=meta.qs||[];
 var q=Math.max(0,Math.min(meta.q||0,Math.max(0,qs.length-1)));
 var opts=meta.opts||[];
 var gd=d["g"+game]||{};
 function answersOf(r){
  var raw=gd["a"+r]||{};var out={};
  order.forEach(function(n){var a=raw[cdrKey(n)];if(a&&(a.skip||(typeof a.c==="number"&&(opts[r]||[]).indexOf(a.c)>=0)))out[n]=a;});
  return out;
 }
 var cur=answersOf(q);
 var elig=rlElig(meta,active,q);
 var allIn=elig.length>0&&elig.every(function(n){return !!cur[n];});
 var rvMap=d.rv||{};
 var reveal=phase==="play"&&(allIn||meta.rv===q||!!rvMap[game+"_"+q]);
 // Punteggi: un punto a chi risponde giusto
 var scores={};order.forEach(function(n){scores[n]=0;});
 var rounds=[];
 var lastScored=phase==="play"?(reveal?q:q-1):-1;
 for(var r=0;r<=lastScored;r++){
  if(typeof qs[r]!=="number")continue;var key=lgAnswer(qs[r]);
  var ans=answersOf(r);var winners=[];
  order.forEach(function(n){var a=ans[n];if(a&&!a.skip&&a.c===key){scores[n]++;winners.push(n);}});
  rounds.push({answers:ans,key:key,winners:winners});
 }
 var ended=false,interrupted=false;
 if(phase==="play"){
  if(meta.end)ended=true;
  else if(active.length<2){ended=true;interrupted=true;}
  else if(rlBlock(meta,q)&&elig.length<2)ended=true;
 }
 var leader=(phase==="lobby"?lobby:active.length?active:lobby)[0]||null;
 return {meta:meta,phase:phase,players:players,lobby:lobby,order:order,active:active,isLeft:isLeft,game:game,qs:qs,opts:opts,q:q,cur:cur,allIn:allIn,reveal:reveal,scores:scores,rounds:rounds,ended:ended,interrupted:interrupted,leader:leader,last:q>=qs.length-1,elig:elig,rt:(reveal?rlRevealAt(meta,cur,elig,allIn):0),main:rlMain(meta)};
}
function lgrCount(){return LG_PH.length;}
// 10 frasi del livello (prima quelle mai uscite), ognuna con 4 lingue tra cui scegliere,
// e una riserva di frasi difficili per gli spareggi
function lgrRoundData(lvl){
 var n=lgrCount();
 var qs=freshPick("r_lg_"+lvl,rlThirds(n,lvl),LGR_ROUNDS);
 var tbp=fShuffle(rlThirds(n,"difficile").filter(function(x){return qs.indexOf(x)<0;})).slice(0,12);
 return {qs:qs,opts:qs.map(function(q){return lgOpts(q);}),main:qs.length,tbp:tbp,tbo:tbp.map(function(q){return lgOpts(q);}),rev:LGR_REV_MS};
}
// ── Stanza: crea, entra, esci ──
function lgrCreate(done){
 cdrStrings();lgrStrings();
 if(!fbDB){done(false,T("firebaseErr"));return;}
 var tries=0;
 (function attempt(){
  tries++;var code=String(Math.floor(1000+Math.random()*9000));
  cdrNet(fbGet(fbRef(fbDB,"rooms/"+code))).then(function(snap){
   if(snap.exists()&&tries<8){attempt();return;}
   var me=cdrMyName();var now=Date.now();
   var room={created:now,kind:"lingua",lg:{meta:{phase:"lobby",order:[],game:1},players:{}}};
   room.lg.players[cdrKey(me)]={n:me,t:now};
   cdrNet(fbSet(fbRef(fbDB,"rooms/"+code),room)).then(function(){lgrAttach(code,me);done(true);}).catch(function(){done(false,T("connErr"));});
  }).catch(function(){done(false,T("connErr"));});
 })();
}
function lgrJoin(code,done){
 cdrStrings();lgrStrings();
 if(!fbDB){done(false,T("firebaseErr"));return;}
 code=String(code||"").replace(/\D/g,"");
 if(code.length!==4){done(false,T("ui_stanza_non_trovata_o_scaduta"));return;}
 cdrNet(fbGet(fbRef(fbDB,"rooms/"+code+"/lg"))).then(function(snap){
  if(!snap.exists()){done(false,T("ui_stanza_non_trovata_o_scaduta"));return;}
  var d=snap.val()||{};var meta=d.meta||{};
  if(meta.phase&&meta.phase!=="lobby"){done(false,T("cdrAlreadyStarted"));return;}
  var left=d.left||{};
  var taken=Object.keys(d.players||{}).filter(function(k){return !left[k];}).map(function(k){return d.players[k].n||k;});
  if(!taken.length){done(false,T("ui_stanza_non_trovata_o_scaduta"));return;}
  if(taken.length>=LGR_MAX_PLAYERS){done(false,T("lgrRoomFull"));return;}
  rlClaim("rooms/"+code+"/lg",left,LGR_MAX_PLAYERS,T("lgrRoomFull"),function(ok,me,msg){if(!ok){done(false,msg);return;}lgrAttach(code,me);done(true);}).go(taken,left);
 }).catch(function(){done(false,T("connErr"));});
}
function lgrAttach(code,me){
 if(typeof rlRejoinSave==="function")rlRejoinSave("lgr",code,me);
 lgrDetach();
 LGR.code=code;LGR.me=me;LGR.data=null;LGR.sig="";LGR.val=null;LGR.valKey="";LGR.closed=false;LGR.busy=false;LGR.abusy=false;
 LGR.unsub=fbOnValue(fbRef(fbDB,"rooms/"+code+"/lg"),function(snap){
  var v=snap.val();
  if(!v){LGR.closed=true;LGR.data=null;}else{LGR.data=v;}
  if(S.screen==="lgr")lgrRender(false);
 });
}
function lgrDetach(){if(LGR.unsub){try{LGR.unsub();}catch(e){}}LGR.unsub=null;clearTimeout(LGR.forceTimer);}
function lgrLeave(soft){
 // soft: la pagina si sta chiudendo o ricaricando: si segna l'uscita ma la stanza non si chiude,
 // così si può rientrare (vedi rlTryRejoin)
 if(!soft&&typeof rlRejoinClear==="function")rlRejoinClear();
 if(LGR.code&&LGR.me&&fbDB&&!LGR.closed){
  // Lo stato si legge prima di segnare l'uscita: scrivere su Firebase aggiorna subito i dati locali
  // Se chi guida annulla la sfida mentre si aspetta, o se non resta nessuno, la stanza viene chiusa per tutti
  var close=false;
  try{var st=lgrState();close=(!soft&&st.phase==="lobby"&&st.leader===LGR.me)||st.lobby.filter(function(n){return n!==LGR.me;}).length===0;}catch(e){}
  var code=LGR.code;
  if(close){try{fbRemove(fbRef(fbDB,"rooms/"+code));}catch(e){}}
  else{try{fbSet(fbRef(fbDB,lgrPath("left/"+cdrKey(LGR.me))),true);}catch(e){}}
 }
 lgrDetach();
 LGR.code=null;LGR.me=null;LGR.data=null;LGR.sig="";LGR.val=null;LGR.closed=false;
}
window.addEventListener("pagehide",function(e){if(LGR.code&&!(e&&e.persisted))lgrLeave(true);});
function lgrExit(){lgrLeave();goBackToGames();}

// ── Azioni ──
function lgrStart(){
 var st=lgrState();if(st.leader!==LGR.me||st.lobby.length<2||LGR.busy)return;
 LGR.busy=true;
 cdrNet(fbSet(fbRef(fbDB,lgrPath("meta")),Object.assign({phase:"play",order:st.lobby.slice(0,LGR_MAX_PLAYERS),game:st.game,q:0,rv:-1,end:false,lvl:rlLevel(st.meta),qt:fbNow()},lgrRoundData(rlLevel(st.meta))))).then(function(){LGR.busy=false;}).catch(function(){LGR.busy=false;cdrToast(T("connErr"));});
}
function lgrAnswer(v){
 // Invio della risposta: ha un suo blocco (abusy), così un tocco non si perde mentre il telefono
 // sta scrivendo il passaggio alla domanda successiva
 if(typeof v!=="number")return;
 var st=lgrState();
 if(st.phase!=="play"||st.ended||st.reveal||st.elig.indexOf(LGR.me)<0||st.cur[LGR.me]||LGR.abusy)return;
 if((st.opts[st.q]||[]).indexOf(v)<0)return;
 LGR.abusy=true;
 var ref=fbRef(fbDB,lgrPath("g"+st.game+"/a"+st.q+"/"+cdrKey(LGR.me)));
 // La risposta si scrive una volta sola (doppio tocco o rete lenta non la cambiano)
 cdrNet(fbGet(ref)).then(function(snap){
  if(snap.exists()){LGR.abusy=false;LGR.sig="";lgrRender(true);return;}
  return cdrNet(fbSet(ref,{c:v,t:fbNow()})).then(function(){LGR.abusy=false;LGR.sig="";lgrRender(true);});
 }).catch(function(){LGR.abusy=false;cdrToast(T("connErr"));LGR.sig="";lgrRender(true);});
}
// Se qualcuno non risponde (telefono spento, app chiusa) dopo un po' chi ha già risposto può mostrare le risposte.
// Scrivere due volte lo stesso valore non cambia nulla, quindi più telefoni possono farlo insieme senza problemi.
function lgrForceReveal(){
 var st=lgrState();if(st.reveal||st.ended||st.phase!=="play")return;
 // Segnale separato: non riscrive mai la partita, quindi non può riportare indietro la domanda
 try{fbSet(fbRef(fbDB,lgrPath("rv/"+st.game+"_"+st.q)),true);}catch(e){}
}
// Allo scadere del tempo ogni telefono ancora in partita mostra le risposte (scrivere due volte non cambia nulla)
function lgrTimeUp(game,q){
 var st=lgrState();if(st.game!==game||st.q!==q||st.reveal||st.ended||st.phase!=="play")return;
 if(st.active.indexOf(LGR.me)<0)return;
 // Se avevo già scelto senza confermare, la mia scelta parte da sola
 if(!st.cur[LGR.me]&&LGR.val!==null&&LGR.val!==undefined&&LGR.valKey===st.game+"|"+st.q){lgrAnswer(LGR.val);setTimeout(lgrForceReveal,800);return;}
 // Un attimo di attesa: le scelte non confermate degli altri fanno in tempo ad arrivare
 setTimeout(lgrForceReveal,1500);
}
function lgrTimer(wrap,st){
 if(!st.meta||!st.meta.qt)return;
 var g=st.game,q=st.q;
 rlTimer(wrap,st.meta.qt,LGR_Q_MS,function(){lgrTimeUp(g,q);});
}
// Passaggio automatico alla domanda dopo (o allo spareggio, o alla fine), uguale su tutti i telefoni
function lgrNext(game,q){
 var st=lgrState();if(st.phase!=="play"||!st.reveal||st.ended||LGR.busy)return;
 if(game!==undefined&&(st.game!==game||st.q!==q))return;
 if(st.active.indexOf(LGR.me)<0)return;
 LGR.busy=true;
 var m=rlNextMeta(st.meta,st.q,st.rt||fbNow(),st.active,st.scores);
 cdrNet(fbSet(fbRef(fbDB,lgrPath("meta")),m)).then(function(){LGR.busy=false;}).catch(function(){LGR.busy=false;});
}
function lgrRematch(){
 var st=lgrState();if(st.leader!==LGR.me||LGR.busy)return;
 var still=st.order.filter(function(n){return !st.isLeft(n);});
 LGR.busy=true;
 var lv=rlLevel(st.meta);
 var m=still.length<2?{phase:"lobby",order:[],game:st.game+1,lvl:lv}:Object.assign({phase:"play",order:still,game:st.game+1,q:0,rv:-1,end:false,lvl:lv,qt:fbNow()},lgrRoundData(lv));
 cdrNet(fbSet(fbRef(fbDB,lgrPath("meta")),m)).then(function(){LGR.busy=false;}).catch(function(){LGR.busy=false;cdrToast(T("connErr"));});
}
// Chi guida sceglie il livello (sala d'attesa, oppure fine partita per la rivincita)
function lgrSetLevel(l){
 var st=lgrState();if(st.leader!==LGR.me||LGR.busy||RL_LEVELS.indexOf(l)<0)return;
 LGR.busy=true;
 cdrNet(fbSet(fbRef(fbDB,lgrPath("meta")),Object.assign({},st.meta,{lvl:l}))).then(function(){LGR.busy=false;}).catch(function(){LGR.busy=false;cdrToast(T("connErr"));});
}
function lgrInvite(silent){
 if(!fbDB||!LGR.code)return;
 var inv={from:LGR.me,game:"CHE LINGUA È?",kind:"lingua",cat:"relax",roomCode:LGR.code,dev:(typeof filosDevId==="function"?filosDevId():null),pubCode:(typeof filosVenue==="function"?filosVenue():"")||null,ts:invNow()};
 var key="inv_"+Date.now()+"_"+Math.random().toString(36).slice(2,7);
 try{fbSet(fbRef(fbDB,invPath(key)),inv);setTimeout(function(){try{fbRemove(fbRef(fbDB,invPath(key)));}catch(e){}},30000);if(!silent)cdrToast(T("cdrInviteSent"));}catch(e){}
}

// ── Schermate ──
function renderLgRemote(){lgrRender(true);}
function lgrSignature(st){
 var s=[LGR.closed,st.phase,rlLevel(st.meta),st.lobby,st.active,st.game,st.q,st.reveal,st.ended,st.leader,LANG,!!st.cur[LGR.me]];
 // Mentre si sceglie la risposta la schermata non si ridisegna quando rispondono gli altri
 if(st.cur[LGR.me]||st.reveal||st.active.indexOf(LGR.me)<0)s.push(Object.keys(st.cur));
 return JSON.stringify(s);
}
function lgrRender(force){
 if(S.screen!=="lgr")return;
 cdrStrings();lgrStrings();
 var st=LGR.code?lgrState():null;if(st&&rlGuard(st,LGR.me,LGR_MAX_PLAYERS,function(){lgrLeave();}))return;
 var sig=LGR.code?lgrSignature(st):"none";
 if(!force&&sig===LGR.sig)return;
 LGR.sig=sig;
 clr();
 addBackArrow(lgrExit);
 var wrap=div("codice-wrap cdr agr lgr");wrap.style.textAlign="center";
 document.getElementById("root").appendChild(wrap);
 if(!LGR.code){lgrScreenStart(wrap);return;}
 if(LGR.closed){
  wrap.appendChild(div("codice-big",T("cdrClosed")));
  wrap.appendChild(div("codice-sub",T("cdrClosedSub")));
  wrap.appendChild(btn("codice-cta",T("backToGames"),lgrExit));
  return;
 }
 if(!LGR.data){wrap.appendChild(div("codice-sub",T("cdrConnecting")));return;}
 if(st.isLeft(LGR.me)){
  wrap.appendChild(div("codice-big",T("cdrYouLeft")));
  wrap.appendChild(btn("codice-cta",T("backToGames"),lgrExit));
  return;
 }
 if(st.phase==="lobby"){lgrScreenLobby(wrap,st);return;}
 if(st.order.indexOf(LGR.me)<0){
  wrap.appendChild(div("codice-big",T("cdrAlreadyStarted")));
  wrap.appendChild(btn("codice-cta",T("backToGames"),lgrExit));
  return;
 }
 if(st.ended){lgrScreenEnd(wrap,st);return;}
 if(st.reveal){lgrScreenReveal(wrap,st);return;}
 if(st.elig.indexOf(LGR.me)<0)lgrScreenWatch(wrap,st);
 else if(!st.cur[LGR.me])lgrScreenAnswer(wrap,st);
 else lgrScreenWait(wrap,st);
}
function lgrScreenStart(wrap){
 cdrHeader(wrap,T("cdrRemote"),T("lgrTitle"),T("lgrIntro"));
 if(!fbDB){wrap.appendChild(div("codice-sub",T("firebaseErr")));return;}
 var err=div("cdr-err");
 var sfida=btn("codice-cta",T("ui_sfida_un_altro_tavolo"),function(){
  if(sfida.disabled)return;
  sfida.disabled=true;sfida.textContent=T("ui_invio_sfida");err.textContent="";
  lgrCreate(function(ok,msg){
   if(!ok){sfida.disabled=false;sfida.textContent=T("ui_sfida_un_altro_tavolo");err.textContent=msg||T("connErr");return;}
   lgrInvite(true);
   if(S.screen!=="lgr"){lgrLeave();return;}
   lgrRender(true);
  });
 });
 wrap.appendChild(sfida);
 wrap.appendChild(div("codice-legend",T("ui_gli_altri_dispositivi_riceveranno_una")));
 wrap.appendChild(err);
}
function lgrScreenLobby(wrap,st){
 var lead=st.leader===LGR.me;
 cdrHeader(wrap,lead?T("ui_in_attesa_degli_altri"):T("ui_connesso"),T("lgrTitle"),lead?null:T("cdrWaitHost").replace("{n}",st.leader||""));
 wrap.appendChild(div("codice-section",T("playersInRoom")+" "+st.lobby.length+"/"+LGR_MAX_PLAYERS));
 var list=div("cdr-list"+(st.lobby.length>8?" many":""));
 st.lobby.forEach(function(n){var r=div("cdr-row");r.appendChild(div("cdr-dot on"));r.appendChild(div("cdr-name",n+(n===LGR.me?" "+T("cdrYou"):"")));if(n===st.leader)r.appendChild(div("cdr-tag",T("cdrHost")));list.appendChild(r);});
 wrap.appendChild(list);
 rlLevelPicker(wrap,rlLevel(st.meta),lead,lgrSetLevel);
 if(lead){
  var go=btn("codice-cta",T("qvStart"),lgrStart);
  go.disabled=st.lobby.length<2;
  wrap.appendChild(go);
  if(st.lobby.length<2)wrap.appendChild(div("codice-legend",T("ui_aspetta_che_si_colleghi_almeno")));
  if(st.lobby.length<LGR_MAX_PLAYERS)wrap.appendChild(btn("cdr-link",T("cdrResend"),function(){lgrInvite();}));
  wrap.appendChild(btn("cdr-link muted",T("ui_annulla_sfida"),lgrExit));
 } else {
  wrap.appendChild(btn("cdr-link muted",T("ui_esci_dalla_stanza"),lgrExit));
 }
}
function lgrQuestionBox(wrap,st){
 wrap.appendChild(div("agr-round",rlRoundLabel(st.meta,st.q,T("lgrRound"))+(rlBlock(st.meta,st.q)?"":" · "+rlLevelName(rlLevel(st.meta)))));
 rlTbNote(wrap,st.meta,st.q,LGR.me);
 wrap.appendChild(lgPhraseEl(st.qs[st.q],"lg-phrase lg-remote"));
 return {qi:st.qs[st.q]};
}
function lgrChoiceLabel(c){return lgLangName(c);}
function lgrScreenAnswer(wrap,st){
 lgrQuestionBox(wrap,st);
 lgrTimer(wrap,st);
 var key=st.game+"|"+st.q;
 if(LGR.valKey!==key){LGR.valKey=key;LGR.val=null;}
 wrap.appendChild(div("pdr-hint",T("lgrHint")));
 var opts=div("pdr-opts");var ok;
 (st.opts[st.q]||[]).forEach(function(c){
  var b=btn("pdr-opt fgr-opt"+(LGR.val===c?" on":""),lgrChoiceLabel(c),function(){
   LGR.val=c;
   [].forEach.call(opts.children,function(x){x.classList.toggle("on",x===b);});
   if(ok)ok.disabled=false;
  });
  opts.appendChild(b);
 });
 wrap.appendChild(opts);
 ok=btn("codice-cta",T("lgrConfirm"),function(){if(ok.disabled||LGR.val===null)return;ok.disabled=true;lgrAnswer(LGR.val);});
 ok.disabled=LGR.val===null;
 wrap.appendChild(ok);
}
function lgrScreenWatch(wrap,st){
 lgrQuestionBox(wrap,st);
 lgrTimer(wrap,st);
 wrap.appendChild(div("codice-sub",T("rlTbWatch").replace("{n}",rlNames(st.elig,LGR.me))));
 lgrChips(wrap,st);
}
function lgrChips(wrap,st){
 var chips=div("agr-chips");
 st.elig.forEach(function(n){chips.appendChild(div("agr-chip"+(st.cur[n]?" on":""),n===LGR.me?T("cdrYou2"):n));});
 wrap.appendChild(chips);
}
function lgrScreenWait(wrap,st){
 lgrQuestionBox(wrap,st);
 lgrTimer(wrap,st);
 var mine=st.cur[LGR.me];
 var box=div("agr-sent");
 box.appendChild(div("agr-sent-t",T("qvAnswerSent")));
 if(mine&&!mine.skip)box.appendChild(div("agr-sent-v",T("lgrYourAnswer").replace("{y}",lgrChoiceLabel(mine.c))));
 wrap.appendChild(box);
 var missing=st.elig.filter(function(n){return !st.cur[n];});
 wrap.appendChild(div("codice-sub",T("lgrWaiting").replace("{a}",st.elig.length-missing.length).replace("{t}",st.elig.length)));
 lgrChips(wrap,st);
 if(!(st.meta&&st.meta.qt)){
  var key=st.game+"|"+st.q;
  if(LGR.waitKey!==key){LGR.waitKey=key;LGR.waitSince=Date.now();}
  var waited=Date.now()-LGR.waitSince;
  if(waited>=(st.leader===LGR.me?LGR_FORCE_MS:LGR_FORCE_MS+15000)){
   wrap.appendChild(btn("ebtn out agr-force",T("lgrForce"),lgrForceReveal));
   wrap.appendChild(div("codice-legend",T("lgrForceHint")));
  } else {
   clearTimeout(LGR.forceTimer);LGR.forceTimer=setTimeout(function(){LGR.sig="";lgrRender(true);},(st.leader===LGR.me?LGR_FORCE_MS:LGR_FORCE_MS+15000)-waited+200);
  }
 }
}
function lgrScreenReveal(wrap,st){
 var q=lgrQuestionBox(wrap,st)||{};
 var g0=st.game,q0=st.q;rlRevealCountdown(wrap,st,st.rt,function(){lgrNext(g0,q0);});
 var rd=st.rounds[st.q]||{answers:{},winners:[],key:lgAnswer(st.qs[st.q])};
 var box=div("agr-answer");
 box.appendChild(div("agr-answer-l",T("ui_risposta_corretta")));
 box.appendChild(div("agr-answer-v pdr-key fgr-key",lgrChoiceLabel(rd.key)));
 box.appendChild(lgSolutionEl(st.qs[st.q]));
 wrap.appendChild(box);
 var rows=(rlBlock(st.meta,st.q)?st.elig:st.order).map(function(n){var a=rd.answers[n];return {n:n,a:a,ok:!!(a&&!a.skip&&a.c===rd.key)};}).sort(function(x,y){return (y.ok?1:0)-(x.ok?1:0);});
 var list=div("agr-list");
 rows.forEach(function(r){
  var row=div("agr-row"+(r.ok?" win":""));
  row.appendChild(div("agr-row-n",(r.n===LGR.me?T("cdrYou2"):r.n)+(st.isLeft(r.n)?" · "+T("cdrLeftTag"):"")));
  row.appendChild(div("agr-row-v",(r.a&&!r.a.skip)?lgrChoiceLabel(r.a.c)+(r.ok?"  ✓":"  ✗"):T("lgrNoAnswer")));
  list.appendChild(row);
 });
 wrap.appendChild(list);
 if(rd.winners.length){
  var me=rd.winners.indexOf(LGR.me)>=0;
  wrap.appendChild(div("agr-point",me?T("lgrPointMe"):T("lgrPoint").replace("{n}",rd.winners.join(", "))));
 } else wrap.appendChild(div("agr-point",T("lgrNobody")));
 lgrScores(wrap,st);
}
function lgrScores(wrap,st){
 wrap.appendChild(div("codice-section",T("ui_punteggi_totali")));
 var sc=div("agr-scores");
 st.order.slice().sort(function(a,b){return st.scores[b]-st.scores[a];}).forEach(function(n){
  var r=div("agr-score");r.appendChild(div("agr-score-n",(n===LGR.me?T("cdrYou2"):n)+(st.isLeft(n)?" · "+T("cdrLeftTag"):"")));r.appendChild(div("agr-score-v",st.scores[n]+" pt"));sc.appendChild(r);
 });
 wrap.appendChild(sc);
}
function lgrScreenEnd(wrap,st){
 if(st.interrupted){
  wrap.appendChild(div("end-title",T("cdrInterrupted")));
  wrap.appendChild(div("end-sub",T("cdrInterruptedSub")));
 } else {
  var max=-1;st.order.forEach(function(n){if(st.scores[n]>max)max=st.scores[n];});
  var top=st.order.filter(function(n){return st.scores[n]===max;});
  var title=top.length>1?T("lgrTie").replace("{n}",top.join(", ")):(top[0]===LGR.me?T("cdrYouWon"):winTxt(top[0]));
  wrap.appendChild(div("end-title",title));
  wrap.appendChild(div("end-sub",(st.meta.tbs&&st.meta.tbs.length)?T("rlWonTb"):T("lgrEndSub").replace("{p}",max).replace("{t}",st.main)));
 }
 lgrScores(wrap,st);
 if(st.leader===LGR.me)rlLevelPicker(wrap,rlLevel(st.meta),true,lgrSetLevel);
 var btns=div("endbtns");
 if(st.leader===LGR.me)btns.appendChild(btn("ebtn",T("qvPlayAgain"),lgrRematch));
 else wrap.appendChild(div("cdr-wait",T("cdrWaitRematch").replace("{n}",st.leader||"")));
 btns.appendChild(btn("ebtn out",T("exitBtn"),function(){lgrLeave();goHome();}));
 wrap.appendChild(btns);
}

// Stringhe (aggiunte quando l'interfaccia è pronta: STRINGS è definito dopo questo file)
function lgrStrings(){
 if(typeof STRINGS==="undefined"||STRINGS.it.lgrIntro)return;
 Object.assign(STRINGS.it,{lgrTitle:"CHE LINGUA È?",lgrIntro:"Ognuno risponde dal proprio telefono, anche da tavoli diversi. Lancia la sfida: agli altri arriva una notifica e toccando Gioca entrano nella partita.",lgrRound:"Frase {n} di {t}",lgrHint:"In che lingua è scritta questa frase?",lgrConfirm:"Conferma",lgrYourAnswer:"La tua risposta: {y}",lgrWaiting:"Hanno risposto {a} su {t}",lgrForce:"Mostra le risposte",lgrForceHint:"Chi non ha ancora risposto non prende punti in questa frase.",lgrNoAnswer:"nessuna risposta",lgrPoint:"Punto a {n}",lgrPointMe:"Hai indovinato, punto per te!",lgrNobody:"Nessuno ha indovinato",lgrTie:"Pareggio tra {n}",lgrEndSub:"{p} punti su {t} frasi",lgrRoomFull:"La partita è al completo (massimo 20 giocatori)",lgMeans:"Significa: «{m}»"});
 Object.assign(STRINGS.en,{lgrTitle:"WHICH LANGUAGE IS IT?",lgrIntro:"Everyone answers on their own phone, even from different tables. Send the challenge: the others get a notification and tap Play to join.",lgrRound:"Sentence {n} of {t}",lgrHint:"Which language is this sentence written in?",lgrConfirm:"Confirm",lgrYourAnswer:"Your answer: {y}",lgrWaiting:"{a} of {t} have answered",lgrForce:"Show the answers",lgrForceHint:"Anyone who hasn't answered yet gets no point for this sentence.",lgrNoAnswer:"no answer",lgrPoint:"Point to {n}",lgrPointMe:"You got it, point for you!",lgrNobody:"Nobody got it right",lgrTie:"Tie between {n}",lgrEndSub:"{p} points out of {t} sentences",lgrRoomFull:"The game is full (maximum 20 players)",lgMeans:"It means: “{m}”"});
 Object.assign(STRINGS.es,{lgrTitle:"¿QUÉ IDIOMA ES?",lgrIntro:"Cada uno responde desde su móvil, incluso desde mesas distintas. Lanza el desafío: a los demás les llega una notificación y al tocar Jugar entran en la partida.",lgrRound:"Frase {n} de {t}",lgrHint:"¿En qué idioma está escrita esta frase?",lgrConfirm:"Confirmar",lgrYourAnswer:"Tu respuesta: {y}",lgrWaiting:"Han respondido {a} de {t}",lgrForce:"Mostrar las respuestas",lgrForceHint:"Quien aún no ha respondido no suma puntos en esta frase.",lgrNoAnswer:"sin respuesta",lgrPoint:"Punto para {n}",lgrPointMe:"¡Acertaste, punto para ti!",lgrNobody:"Nadie ha acertado",lgrTie:"Empate entre {n}",lgrEndSub:"{p} puntos de {t} frases",lgrRoomFull:"La partida está completa (máximo 20 jugadores)",lgMeans:"Significa: «{m}»"});
}
