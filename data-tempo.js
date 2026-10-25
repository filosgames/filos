/*!
 * Filòs — © 2026 i titolari del progetto Filòs. Tutti i diritti riservati.
 * Codice e contenuti sono opere protette dalla legge sul diritto d'autore (L. 633/1941).
 * È vietata qualsiasi copia, riproduzione, modifica o ridistribuzione senza autorizzazione scritta.
 */
// ══════════════════════════════════════════
// IL TEMPO PERFETTO — A DISTANZA
// Chi lancia la sfida fa l'host (non gioca): sceglie il tempo da raggiungere e fa partire il cronometro.
// Gli avversari hanno solo un grande pulsante: rosso = aspetta, verde = il tempo è partito.
// Devono premerlo quando pensano di essere arrivati esattamente al tempo scelto (senza vedere il cronometro).
// 3 turni: vince chi in totale si è avvicinato di più. Niente pareggi: chi è pari rigioca un turno.
//  rooms/{code}/tp/players/{nome} = {n,t}
//  rooms/{code}/tp/meta = {phase, host, order, game, rounds:[{target, st, en, p}], end}
//  rooms/{code}/tp/g{game}/r{k}/{nome} = {ms}
// I tempi sono misurati con l'orologio del server (fbNow), uguale su tutti i telefoni.
// ══════════════════════════════════════════
var TP_ROUNDS=3,TP_MAX_PLAYERS=9,TP_LEAD_MS=1500,TP_MISS=600000;
var TP={code:null,me:null,data:null,unsub:null,sig:"",busy:false,closed:false,tm:null,raf:0};
function tpPath(p){return "rooms/"+TP.code+"/tp"+(p?"/"+p:"");}
function tpFmt(ms){
 ms=Math.max(0,Math.round(ms));var m=Math.floor(ms/60000),s=Math.floor(ms%60000/1000),x=ms%1000;
 return m+":"+("0"+s).slice(-2)+"."+("00"+x).slice(-3);
}
function tpDiffTxt(d){var sg=d>0?"+":d<0?"−":"±";return sg+(Math.abs(d)/1000).toFixed(3).replace(".",LANG==="en"?".":",")+" s";}
function tpState(){
 var d=TP.data||{};var meta=d.meta||{phase:"lobby",order:[],game:1};
 var players=Object.keys(d.players||{}).sort(function(a,b){return (d.players[a].t||0)-(d.players[b].t||0);}).map(function(k){return d.players[k].n||k;});
 var left=d.left||{};var isLeft=function(n){return !!left[cdrKey(n)];};
 var lobby=players.filter(function(n){return !isLeft(n);});
 var phase=meta.phase||"lobby";var game=meta.game||1;
 var host=phase==="lobby"?(lobby[0]||null):(meta.host||null);
 var order=meta.order||[];var active=order.filter(function(n){return !isLeft(n);});
 var rounds=meta.rounds||[];var k=Math.max(0,rounds.length-1);var rd=rounds[k]||null;
 var gd=d["g"+game]||{};
 function pressOf(i){var raw=gd["r"+i]||{};var out={};var r=rounds[i];if(!r)return out;(r.p||[]).forEach(function(n){var a=raw[cdrKey(n)];if(a&&typeof a.ms==="number"&&a.ms>=0)out[n]=a.ms;});return out;}
 var cur=pressOf(k);
 var elig=rd?active.filter(function(n){return (rd.p||[]).indexOf(n)>=0;}):[];
 var stage=!rd?"none":rd.en?"done":rd.st?"run":"set";
 // Totali dei 3 turni principali (distanza dal tempo, in millesimi)
 var tot={};order.forEach(function(n){tot[n]=0;});
 for(var i=0;i<Math.min(rounds.length,TP_ROUNDS);i++){
  if(!rounds[i].en)continue;var pr=pressOf(i);
  order.forEach(function(n){tot[n]+=pr[n]!==undefined?Math.abs(pr[n]-rounds[i].target):TP_MISS;});
 }
 var ended=false,interrupted=false;
 if(phase==="play"){if(meta.end)ended=true;else if(isLeft(host)||active.length<1){ended=true;interrupted=true;}}
 return {meta:meta,phase:phase,players:players,lobby:lobby,isLeft:isLeft,host:host,order:order,active:active,game:game,rounds:rounds,k:k,rd:rd,cur:cur,pressOf:pressOf,elig:elig,stage:stage,tot:tot,ended:ended,interrupted:interrupted};
}
function tpErrOf(st,i,n){var r=st.rounds[i];var pr=st.pressOf(i);return pr[n]!==undefined?Math.abs(pr[n]-r.target):TP_MISS;}
// Classifica finale: totale dei 3 turni, e per chi era pari contano gli spareggi
function tpRanking(st){
 var ord=st.order.slice().sort(function(a,b){return st.tot[a]-st.tot[b];});
 for(var i=TP_ROUNDS;i<st.rounds.length;i++){
  if(!st.rounds[i].en)continue;var g=st.rounds[i].p||[];var pos=ord.indexOf(g[0]);
  var grp=ord.filter(function(n){return g.indexOf(n)>=0;}).sort(function(a,b){return tpErrOf(st,i,a)-tpErrOf(st,i,b);});
  var rest=ord.filter(function(n){return g.indexOf(n)<0;});pos=Math.min(pos,rest.length);
  ord=rest.slice(0,pos).concat(grp,rest.slice(pos));
 }
 return ord;
}
// Chi è ancora pari in testa dopo il turno k (null se c'è un vincitore)
function tpTop(st){
 var k=st.k;
 if(k<TP_ROUNDS-1)return null;
 var group,score;
 if(k===TP_ROUNDS-1){group=st.active.slice();score=function(n){return st.tot[n];};}
 else{group=st.active.filter(function(n){return (st.rd.p||[]).indexOf(n)>=0;});score=function(n){return tpErrOf(st,k,n);};}
 if(group.length<2)return [];
 var best=Math.min.apply(null,group.map(score));
 return group.filter(function(n){return score(n)===best;});
}
// ── Stanza ──
function tpCreate(done){
 cdrStrings();tpStrings();
 if(!fbDB){done(false,T("firebaseErr"));return;}
 var tries=0;
 (function attempt(){
  tries++;var code=String(Math.floor(1000+Math.random()*9000));
  cdrNet(fbGet(fbRef(fbDB,"rooms/"+code))).then(function(snap){
   if(snap.exists()&&tries<8){attempt();return;}
   var me=cdrMyName();var now=Date.now();
   var room={created:now,kind:"tempo",tp:{meta:{phase:"lobby",order:[],game:1},players:{}}};
   room.tp.players[cdrKey(me)]={n:me,t:now};
   cdrNet(fbSet(fbRef(fbDB,"rooms/"+code),room)).then(function(){tpAttach(code,me);done(true);}).catch(function(){done(false,T("connErr"));});
  }).catch(function(){done(false,T("connErr"));});
 })();
}
function tpJoin(code,done){
 cdrStrings();tpStrings();
 if(!fbDB){done(false,T("firebaseErr"));return;}
 code=String(code||"").replace(/\D/g,"");
 if(code.length!==4){done(false,T("ui_stanza_non_trovata_o_scaduta"));return;}
 cdrNet(fbGet(fbRef(fbDB,"rooms/"+code+"/tp"))).then(function(snap){
  if(!snap.exists()){done(false,T("ui_stanza_non_trovata_o_scaduta"));return;}
  var d=snap.val()||{};var meta=d.meta||{};
  if(meta.phase&&meta.phase!=="lobby"){done(false,T("cdrAlreadyStarted"));return;}
  var left=d.left||{};
  var taken=Object.keys(d.players||{}).filter(function(k){return !left[k];}).map(function(k){return d.players[k].n||k;});
  if(!taken.length){done(false,T("ui_stanza_non_trovata_o_scaduta"));return;}
  if(taken.length>=TP_MAX_PLAYERS){done(false,T("tpRoomFull"));return;}
  var me=cdrUniqueName(cdrMyName(),taken);var k=cdrKey(me);
  var clearLeft=left[k]?cdrNet(fbSet(fbRef(fbDB,"rooms/"+code+"/tp/left/"+k),null)):Promise.resolve();
  clearLeft.then(function(){return cdrNet(fbSet(fbRef(fbDB,"rooms/"+code+"/tp/players/"+k),{n:me,t:Date.now()}));}).then(function(){tpAttach(code,me);done(true);}).catch(function(){done(false,T("connErr"));});
 }).catch(function(){done(false,T("connErr"));});
}
function tpAttach(code,me){
 tpDetach();
 TP.code=code;TP.me=me;TP.data=null;TP.sig="";TP.closed=false;TP.busy=false;TP.tm=null;
 TP.unsub=fbOnValue(fbRef(fbDB,"rooms/"+code+"/tp"),function(snap){
  var v=snap.val();if(!v){TP.closed=true;TP.data=null;}else TP.data=v;
  if(S.screen==="tpr")tpRender(false);
 });
}
function tpDetach(){if(TP.unsub){try{TP.unsub();}catch(e){}}TP.unsub=null;cancelAnimationFrame(TP.raf);clearTimeout(TP.goT);}
function tpLeave(){
 if(TP.code&&TP.me&&fbDB&&!TP.closed){
  var close=false;
  try{var st=tpState();close=(st.phase==="lobby"&&st.host===TP.me)||st.lobby.filter(function(n){return n!==TP.me;}).length===0;}catch(e){}
  if(close){try{fbRemove(fbRef(fbDB,"rooms/"+TP.code));}catch(e){}}
  else{try{fbSet(fbRef(fbDB,tpPath("left/"+cdrKey(TP.me))),true);}catch(e){}}
 }
 tpDetach();TP.code=null;TP.me=null;TP.data=null;TP.sig="";TP.closed=false;
}
window.addEventListener("pagehide",function(e){if(TP.code&&!(e&&e.persisted))tpLeave();});
function tpExit(){tpLeave();goBackToGames();}
function tpWrite(m){
 if(TP.busy)return;TP.busy=true;
 cdrNet(fbSet(fbRef(fbDB,tpPath("meta")),m)).then(function(){TP.busy=false;}).catch(function(){TP.busy=false;cdrToast(T("connErr"));});
}
// ── Azioni dell'host ──
function tpStart(){
 var st=tpState();if(st.host!==TP.me||st.lobby.length<2)return;
 var opp=st.lobby.filter(function(n){return n!==TP.me;}).slice(0,TP_MAX_PLAYERS-1);
 tpWrite({phase:"play",host:TP.me,order:opp,game:st.game,end:false,rounds:[{target:0,p:opp}]});
}
function tpGo(target){
 var st=tpState();if(st.host!==TP.me||st.stage!=="set")return;
 var m=JSON.parse(JSON.stringify(st.meta));var r=m.rounds[st.k];r.target=target;r.st=fbNow()+TP_LEAD_MS;
 tpWrite(m);
}
function tpStop(){
 var st=tpState();if(st.host!==TP.me||st.stage!=="run")return;
 var m=JSON.parse(JSON.stringify(st.meta));m.rounds[st.k].en=Math.max(fbNow(),(m.rounds[st.k].st||0));
 tpWrite(m);
}
function tpNext(){
 var st=tpState();if(st.host!==TP.me||st.stage!=="done")return;
 var m=JSON.parse(JSON.stringify(st.meta));
 if(st.k<TP_ROUNDS-1){m.rounds.push({target:0,p:st.active.slice()});tpWrite(m);return;}
 var top=tpTop(st);
 if(top&&top.length>1){m.rounds.push({target:0,p:top,tb:true});tpWrite(m);return;}
 m.end=true;tpWrite(m);
}
function tpRematch(){
 var st=tpState();if(st.host!==TP.me)return;
 var opp=st.order.filter(function(n){return !st.isLeft(n);});
 if(!opp.length){tpWrite({phase:"lobby",order:[],game:st.game+1});return;}
 tpWrite({phase:"play",host:TP.me,order:opp,game:st.game+1,end:false,rounds:[{target:0,p:opp}]});
}
// ── Azione degli avversari: premere il pulsante ──
function tpPress(){
 var st=tpState();if(st.stage!=="run"||st.elig.indexOf(TP.me)<0||st.cur[TP.me]!==undefined)return;
 var now=fbNow();var ms=now-st.rd.st;if(ms<0)return;
 var ref=fbRef(fbDB,tpPath("g"+st.game+"/r"+st.k+"/"+cdrKey(TP.me)));
 TP.pressed=st.game+"|"+st.k;tpRender(true);
 cdrNet(fbGet(ref)).then(function(snap){if(snap.exists())return;return cdrNet(fbSet(ref,{ms:Math.round(ms)}));}).catch(function(){TP.pressed=null;cdrToast(T("connErr"));tpRender(true);});
}
function tpInvite(silent){
 if(!fbDB||!TP.code)return;
 var inv={from:TP.me,game:"IL TEMPO PERFETTO",kind:"tempo",cat:"relax",roomCode:TP.code,dev:(typeof filosDevId==="function"?filosDevId():null),pubCode:(typeof FILOS_PUB_CODE!=="undefined"?FILOS_PUB_CODE:null)||null,ts:Date.now()};
 var key="inv_"+Date.now();
 try{fbSet(fbRef(fbDB,"filos_invites/"+key),inv);setTimeout(function(){try{fbRemove(fbRef(fbDB,"filos_invites/"+key));}catch(e){}},30000);if(!silent)cdrToast(T("cdrInviteSent"));}catch(e){}
}
// ── Schermate ──
function renderTpRemote(){tpRender(true);}
function tpSignature(st){
 return JSON.stringify([TP.closed,st.phase,st.lobby,st.active,st.game,st.k,st.stage,st.rd&&st.rd.target,st.rd&&st.rd.st,st.ended,st.host,LANG,Object.keys(st.cur).sort(),TP.pressed]);
}
function tpRender(force){
 if(S.screen!=="tpr")return;
 cdrStrings();tpStrings();
 var st=TP.code?tpState():null;var sig=TP.code?tpSignature(st):"none";
 if(!force&&sig===TP.sig){if(st&&st.host===TP.me&&st.stage==="run")tpHostLive(st);return;}
 TP.sig=sig;cancelAnimationFrame(TP.raf);clearTimeout(TP.goT);
 clr();addBackArrow(tpExit);
 var wrap=div("codice-wrap cdr agr tp");wrap.style.textAlign="center";document.getElementById("root").appendChild(wrap);
 if(!TP.code){tpScreenStart(wrap);return;}
 if(TP.closed){wrap.appendChild(div("codice-big",T("cdrClosed")));wrap.appendChild(div("codice-sub",T("cdrClosedSub")));wrap.appendChild(btn("codice-cta",T("backToGames"),tpExit));return;}
 if(!TP.data){wrap.appendChild(div("codice-sub",T("cdrConnecting")));return;}
 if(st.isLeft(TP.me)){wrap.appendChild(div("codice-big",T("cdrYouLeft")));wrap.appendChild(btn("codice-cta",T("backToGames"),tpExit));return;}
 if(st.phase==="lobby"){tpScreenLobby(wrap,st);return;}
 if(st.host!==TP.me&&st.order.indexOf(TP.me)<0){wrap.appendChild(div("codice-big",T("cdrAlreadyStarted")));wrap.appendChild(btn("codice-cta",T("backToGames"),tpExit));return;}
 if(st.ended){tpScreenEnd(wrap,st);return;}
 if(st.host===TP.me)tpScreenHost(wrap,st);else tpScreenPlayer(wrap,st);
}
function tpScreenStart(wrap){
 cdrHeader(wrap,T("cdrRemote"),T("tpTitle"),T("tpIntro"));
 if(!fbDB){wrap.appendChild(div("codice-sub",T("firebaseErr")));return;}
 var err=div("cdr-err");
 var sfida=btn("codice-cta",T("ui_sfida_un_altro_tavolo"),function(){
  if(sfida.disabled)return;sfida.disabled=true;sfida.textContent=T("ui_invio_sfida");err.textContent="";
  tpCreate(function(ok,msg){
   if(!ok){sfida.disabled=false;sfida.textContent=T("ui_sfida_un_altro_tavolo");err.textContent=msg||T("connErr");return;}
   tpInvite(true);if(S.screen!=="tpr"){tpLeave();return;}tpRender(true);
  });
 });
 wrap.appendChild(sfida);
 wrap.appendChild(div("codice-legend",T("ui_gli_altri_dispositivi_riceveranno_una")));
 wrap.appendChild(err);
}
function tpScreenLobby(wrap,st){
 var lead=st.host===TP.me;
 cdrHeader(wrap,lead?T("ui_in_attesa_degli_altri"):T("ui_connesso"),T("tpTitle"),lead?T("tpYouHost"):T("cdrWaitHost").replace("{n}",st.host||""));
 wrap.appendChild(div("codice-section",T("tpPlayers")+" "+Math.max(0,st.lobby.length-1)+"/"+(TP_MAX_PLAYERS-1)));
 var list=div("cdr-list");
 st.lobby.forEach(function(n){var r=div("cdr-row");r.appendChild(div("cdr-dot on"));r.appendChild(div("cdr-name",n+(n===TP.me?" "+T("cdrYou"):"")));if(n===st.host)r.appendChild(div("cdr-tag",T("tpHost")));list.appendChild(r);});
 wrap.appendChild(list);
 if(lead){
  var go=btn("codice-cta",T("qvStart"),tpStart);go.disabled=st.lobby.length<2;wrap.appendChild(go);
  if(st.lobby.length<2)wrap.appendChild(div("codice-legend",T("tpNeedOne")));
  if(st.lobby.length<TP_MAX_PLAYERS)wrap.appendChild(btn("cdr-link",T("cdrResend"),function(){tpInvite();}));
  wrap.appendChild(btn("cdr-link muted",T("ui_annulla_sfida"),tpExit));
 } else wrap.appendChild(btn("cdr-link muted",T("ui_esci_dalla_stanza"),tpExit));
}
function tpRoundLabel(st){
 if(st.k>=TP_ROUNDS)return T("tpTbRound");
 return T("tpRound").replace("{n}",st.k+1).replace("{t}",TP_ROUNDS);
}
function tpHead(wrap,st){
 wrap.appendChild(div("agr-round",T("tpTitle")+" · "+tpRoundLabel(st)));
 if(st.k>=TP_ROUNDS)wrap.appendChild(div("rl-tb",T("rlTbBetween").replace("{n}",rlNames(st.rd.p||[],TP.me))));
}
// Scelta del tempo (host): minuti e secondi
function tpPicker(wrap){
 if(!TP.tm)TP.tm={m:1,s:0};
 var box=div("tp-pick");
 function col(key,max,step){
  var c=div("tp-pick-col");
  var v=div("tp-pick-v");
  function show(){v.textContent=key==="m"?String(TP.tm.m):("0"+TP.tm.s).slice(-2);}
  c.appendChild(btn("tp-pick-b","+",function(){TP.tm[key]=(TP.tm[key]+step)%(max+1);show();}));
  c.appendChild(v);
  c.appendChild(btn("tp-pick-b","−",function(){TP.tm[key]=(TP.tm[key]-step+max+1)%(max+1);show();}));
  show();return c;
 }
 box.appendChild(col("m",9,1));box.appendChild(div("tp-pick-sep",":"));box.appendChild(col("s",59,1));
 wrap.appendChild(box);
 var lbl=div("tp-pick-l");lbl.appendChild(el("span","",T("tpMin")));lbl.appendChild(el("span","",T("tpSec")));wrap.appendChild(lbl);
 wrap.appendChild(btn("cdr-link",T("tpRandom"),function(){var t=10+Math.floor(Math.random()*170);TP.tm={m:Math.floor(t/60),s:t%60};TP.sig="";tpRender(true);}));
}
function tpScreenHost(wrap,st){
 tpHead(wrap,st);
 if(st.stage==="set"){
  wrap.appendChild(div("codice-big",T("tpChoose")));
  wrap.appendChild(div("codice-sub",T("tpChooseSub")));
  tpPicker(wrap);
  var go=btn("codice-cta tp-go",T("tpGo"),function(){var t=(TP.tm.m*60+TP.tm.s)*1000;if(t<1000){cdrToast(T("tpTooShort"));return;}go.disabled=true;tpGo(t);});
  wrap.appendChild(go);
  tpHostList(wrap,st,false);
  return;
 }
 wrap.appendChild(div("tp-target",T("tpTarget")+" "+tpFmt(st.rd.target)));
 var clock=div("tp-clock");clock.id="tpClock";wrap.appendChild(clock);
 if(st.stage==="run"){
  wrap.appendChild(btn("ebtn out tp-stop",T("tpStopRound"),tpStop));
  tpHostList(wrap,st,true);
  tpHostLive(st);
  // quando hanno premuto tutti il turno si chiude da solo
  if(st.elig.length&&st.elig.every(function(n){return st.cur[n]!==undefined;}))setTimeout(tpStop,400);
  return;
 }
 clock.textContent=tpFmt((st.rd.en||st.rd.st)-st.rd.st);
 tpRoundResults(wrap,st);
 var top=st.k>=TP_ROUNDS-1?tpTop(st):null;
 var lbl=st.k<TP_ROUNDS-1?T("tpNextRound"):(top&&top.length>1?T("rlTbGo"):T("tpFinal"));
 wrap.appendChild(btn("codice-cta",lbl,tpNext));
}
// Cronometro dell'host (minuti, secondi, millesimi) e chi ha già premuto
function tpHostLive(st){
 cancelAnimationFrame(TP.raf);
 var c=document.getElementById("tpClock");if(!c)return;var start=st.rd.st;
 (function tick(){
  var cc=document.getElementById("tpClock");if(!cc)return;
  var t=fbNow()-start;cc.textContent=t<0?"0:00.000":tpFmt(t);cc.classList.toggle("wait",t<0);
  TP.raf=requestAnimationFrame(tick);
 })();
}
function tpHostList(wrap,st,live){
 wrap.appendChild(div("codice-section",T("tpInRace")));
 var list=div("agr-list");
 st.elig.forEach(function(n){
  var pressed=st.cur[n]!==undefined;
  var r=div("agr-row"+(pressed?" win":""));r.appendChild(div("agr-row-n",n));
  r.appendChild(div("agr-row-v",live?(pressed?T("tpStopped")+" "+tpFmt(st.cur[n]):T("tpRunning")):T("tpReady")));
  list.appendChild(r);
 });
 wrap.appendChild(list);
}
function tpRoundResults(wrap,st){
 var rd=st.rd;var pr=st.cur;
 var rows=(rd.p||[]).slice().sort(function(a,b){return tpErrOf(st,st.k,a)-tpErrOf(st,st.k,b);});
 var best=rows.length?tpErrOf(st,st.k,rows[0]):0;
 wrap.appendChild(div("codice-section",T("tpRoundRes")));
 var list=div("agr-list");
 rows.forEach(function(n){
  var r=div("agr-row"+(tpErrOf(st,st.k,n)===best&&pr[n]!==undefined?" win":""));
  r.appendChild(div("agr-row-n",(n===TP.me?T("cdrYou2"):n)+(st.isLeft(n)?" · "+T("cdrLeftTag"):"")));
  r.appendChild(div("agr-row-v",pr[n]!==undefined?tpFmt(pr[n])+" · "+tpDiffTxt(pr[n]-rd.target):T("tpNoPress")));
  list.appendChild(r);
 });
 wrap.appendChild(list);
 if(st.k<TP_ROUNDS){
  var done=Math.min(st.k+1,TP_ROUNDS);
  wrap.appendChild(div("codice-section",T("tpTotal").replace("{n}",done)));
  var sc=div("agr-scores");
  st.order.slice().sort(function(a,b){return st.tot[a]-st.tot[b];}).forEach(function(n){var r=div("agr-score");r.appendChild(div("agr-score-n",n===TP.me?T("cdrYou2"):n));r.appendChild(div("agr-score-v",tpTotTxt(st.tot[n])));sc.appendChild(r);});
  wrap.appendChild(sc);
 }
}
function tpTotTxt(v){return v>=TP_MISS?"—":T("tpOff")+" "+(v/1000).toFixed(3).replace(".",LANG==="en"?".":",")+" s";}
function tpScreenPlayer(wrap,st){
 tpHead(wrap,st);
 var inRound=st.elig.indexOf(TP.me)>=0;
 if(st.stage==="set"){
  wrap.appendChild(div("codice-big",T("tpWaitTarget").replace("{n}",st.host||"")));
  wrap.appendChild(div("tp-big red off",T("tpWait")));
  if(st.k>0)tpPlayerLast(wrap,st);
  return;
 }
 wrap.appendChild(div("tp-target",T("tpTarget")+" "+tpFmt(st.rd.target)));
 if(st.stage==="run"){
  if(!inRound){wrap.appendChild(div("codice-sub",T("rlTbWatch").replace("{n}",rlNames(st.elig,TP.me))));return;}
  var mine=st.cur[TP.me]!==undefined||TP.pressed===st.game+"|"+st.k;
  if(mine){var b0=div("tp-big done",T("tpDone"));wrap.appendChild(b0);wrap.appendChild(div("codice-sub",T("tpDoneSub")));return;}
  var b=div("tp-big red");b.textContent=T("tpWait");wrap.appendChild(b);
  var hint=div("codice-sub tp-hint",T("tpWaitGo"));wrap.appendChild(hint);
  var go=function(){b.className="tp-big green";b.textContent=T("tpPress");hint.textContent=T("tpPressSub");};
  var wait=st.rd.st-fbNow();
  if(wait<=0)go();else TP.goT=setTimeout(go,wait);
  var press=function(e){if(e)e.preventDefault();if(!b.classList.contains("green"))return;tpPress();};
  b.addEventListener("pointerdown",press);
  return;
 }
 tpRoundResults(wrap,st);
 wrap.appendChild(div("cdr-wait",T("tpWaitHost").replace("{n}",st.host||"")));
}
function tpPlayerLast(wrap,st){
 var k=st.k-1;var r=st.rounds[k];if(!r)return;var pr=st.pressOf(k);
 if(pr[TP.me]!==undefined)wrap.appendChild(div("codice-sub",T("tpLastMine").replace("{t}",tpFmt(pr[TP.me])).replace("{d}",tpDiffTxt(pr[TP.me]-r.target))));
}
function tpScreenEnd(wrap,st){
 if(st.interrupted){wrap.appendChild(div("end-title",T("cdrInterrupted")));wrap.appendChild(div("end-sub",T("tpHostLeft")));}
 else{
  var ord=tpRanking(st);var w=ord[0];
  wrap.appendChild(div("end-title",w===TP.me?T("cdrYouWon"):winTxt(w)));
  wrap.appendChild(div("end-sub",st.rounds.length>TP_ROUNDS?T("rlWonTb"):tpTotTxt(st.tot[w])));
  wrap.appendChild(div("codice-section",T("tpFinalRank")));
  var sc=div("agr-scores");
  ord.forEach(function(n){var r=div("agr-score");r.appendChild(div("agr-score-n",(n===TP.me?T("cdrYou2"):n)+(st.isLeft(n)?" · "+T("cdrLeftTag"):"")));r.appendChild(div("agr-score-v",tpTotTxt(st.tot[n])));sc.appendChild(r);});
  wrap.appendChild(sc);
 }
 var bt=div("endbtns");
 if(st.host===TP.me&&!st.interrupted)bt.appendChild(btn("ebtn",T("qvPlayAgain"),tpRematch));
 else if(!st.interrupted)wrap.appendChild(div("cdr-wait",T("cdrWaitRematch").replace("{n}",st.host||"")));
 bt.appendChild(btn("ebtn out",T("exitBtn"),function(){tpLeave();goHome();}));
 wrap.appendChild(bt);
}
// ── Testi ──
function tpStrings(){
 if(typeof STRINGS==="undefined"||STRINGS.it.tpTitle)return;
 Object.assign(STRINGS.it,{tpTitle:"IL TEMPO PERFETTO",tpIntro:"Chi lancia la sfida fa l'host: sceglie un tempo (per esempio 2 minuti e 46 secondi) e fa partire il cronometro. Gli altri, ognuno dal proprio telefono, devono premere il pulsante esattamente a quel tempo, senza vedere il cronometro. 3 turni: vince chi in totale si avvicina di più.",tpYouHost:"Sei l'host: scegli i tempi e fai partire il cronometro. Non giochi.",tpPlayers:"Giocatori:",tpHost:"Host",tpNeedOne:"Aspetta che si colleghi almeno un giocatore.",tpRound:"Turno {n} di {t}",tpTbRound:"Spareggio",tpChoose:"Scegli il tempo",tpChooseSub:"I giocatori lo vedranno sul loro telefono.",tpMin:"minuti",tpSec:"secondi",tpRandom:"Tempo a caso",tpGo:"Via!",tpTooShort:"Scegli almeno 1 secondo.",tpTarget:"Tempo da indovinare:",tpStopRound:"Chiudi il turno",tpInRace:"IN GARA",tpStopped:"fermato a",tpRunning:"in corsa…",tpReady:"pronto",tpRoundRes:"RISULTATI DEL TURNO",tpNoPress:"non ha premuto",tpTotal:"TOTALE FINORA",tpOff:"lontano",tpNextRound:"Prossimo turno",tpFinal:"Risultati finali",tpWaitTarget:"{n} sta scegliendo il tempo",tpWait:"ASPETTA",tpWaitGo:"Quando diventa verde il tempo è partito.",tpPress:"STOP",tpPressSub:"Premi quando pensi di essere arrivato al tempo esatto!",tpDone:"FERMATO",tpDoneSub:"Aspetta i risultati del turno.",tpWaitHost:"Aspetta che {n} vada avanti",tpLastMine:"Turno prima: {t} ({d})",tpHostLeft:"L'host è uscito dalla partita.",tpFinalRank:"CLASSIFICA",tpRoomFull:"La partita è al completo (massimo 8 giocatori più l'host)"});
 Object.assign(STRINGS.en,{tpTitle:"THE PERFECT TIME",tpIntro:"Whoever sends the challenge is the host: they choose a time (for example 2 minutes and 46 seconds) and start the stopwatch. The others, each on their own phone, must press the button at exactly that time, without seeing the stopwatch. 3 rounds: whoever gets closest overall wins.",tpYouHost:"You are the host: you choose the times and start the stopwatch. You don't play.",tpPlayers:"Players:",tpHost:"Host",tpNeedOne:"Wait for at least one player to join.",tpRound:"Round {n} of {t}",tpTbRound:"Tie-break",tpChoose:"Choose the time",tpChooseSub:"The players will see it on their phones.",tpMin:"minutes",tpSec:"seconds",tpRandom:"Random time",tpGo:"Go!",tpTooShort:"Choose at least 1 second.",tpTarget:"Time to hit:",tpStopRound:"Close the round",tpInRace:"RACING",tpStopped:"stopped at",tpRunning:"running…",tpReady:"ready",tpRoundRes:"ROUND RESULTS",tpNoPress:"didn't press",tpTotal:"TOTAL SO FAR",tpOff:"off by",tpNextRound:"Next round",tpFinal:"Final results",tpWaitTarget:"{n} is choosing the time",tpWait:"WAIT",tpWaitGo:"When it turns green, the time has started.",tpPress:"STOP",tpPressSub:"Press when you think you've hit the exact time!",tpDone:"STOPPED",tpDoneSub:"Wait for the round results.",tpWaitHost:"Waiting for {n} to move on",tpLastMine:"Last round: {t} ({d})",tpHostLeft:"The host left the game.",tpFinalRank:"RANKING",tpRoomFull:"The game is full (maximum 8 players plus the host)"});
 Object.assign(STRINGS.es,{tpTitle:"EL TIEMPO PERFECTO",tpIntro:"Quien lanza el desafío es el anfitrión: elige un tiempo (por ejemplo 2 minutos y 46 segundos) y pone en marcha el cronómetro. Los demás, cada uno desde su móvil, deben pulsar el botón exactamente en ese tiempo, sin ver el cronómetro. 3 rondas: gana quien en total se acerca más.",tpYouHost:"Eres el anfitrión: eliges los tiempos y pones en marcha el cronómetro. No juegas.",tpPlayers:"Jugadores:",tpHost:"Anfitrión",tpNeedOne:"Espera a que se conecte al menos un jugador.",tpRound:"Ronda {n} de {t}",tpTbRound:"Desempate",tpChoose:"Elige el tiempo",tpChooseSub:"Los jugadores lo verán en su móvil.",tpMin:"minutos",tpSec:"segundos",tpRandom:"Tiempo al azar",tpGo:"¡Ya!",tpTooShort:"Elige al menos 1 segundo.",tpTarget:"Tiempo a acertar:",tpStopRound:"Cerrar la ronda",tpInRace:"EN CARRERA",tpStopped:"parado en",tpRunning:"en marcha…",tpReady:"listo",tpRoundRes:"RESULTADOS DE LA RONDA",tpNoPress:"no ha pulsado",tpTotal:"TOTAL HASTA AHORA",tpOff:"a",tpNextRound:"Siguiente ronda",tpFinal:"Resultados finales",tpWaitTarget:"{n} está eligiendo el tiempo",tpWait:"ESPERA",tpWaitGo:"Cuando se ponga verde, el tiempo habrá empezado.",tpPress:"STOP",tpPressSub:"¡Pulsa cuando creas que has llegado al tiempo exacto!",tpDone:"PARADO",tpDoneSub:"Espera los resultados de la ronda.",tpWaitHost:"Esperando a que {n} siga",tpLastMine:"Ronda anterior: {t} ({d})",tpHostLeft:"El anfitrión ha salido de la partida.",tpFinalRank:"CLASIFICACIÓN",tpRoomFull:"La partida está completa (máximo 8 jugadores más el anfitrión)"});
}
