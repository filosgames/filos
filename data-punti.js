/*!
 * Filòs — © 2026 i titolari del progetto Filòs. Tutti i diritti riservati.
 * Codice e contenuti sono opere protette dalla legge sul diritto d'autore (L. 633/1941).
 * È vietata qualsiasi copia, riproduzione, modifica o ridistribuzione senza autorizzazione scritta.
 */
// ══════════════════════════════════════════
// SEGNAPUNTI per i giochi a voce
// - TROVA LA BUGIA: nomi dei giocatori, a turno; +1 per ogni persona ingannata. Vince chi ha più punti.
// - SINCRONIA: squadre; si contano i tentativi per dire la stessa parola. Vince chi ne usa meno.
// Schermate: sc_setup (nomi) → sc_play (partita) → sc_rank (classifica) → fine gioco.
// ══════════════════════════════════════════
var SC=null;
function scStrings(){
 if(typeof STRINGS==="undefined"||STRINGS.it.scWho)return;
 Object.assign(STRINGS.it,{scWho:"Quanti giocatori siete?",scWhoTeams:"Quante squadre siete?",scTeam:"Squadra {n}",scTurnBugia:"Tocca a {n}",scTurnBugiaSub:"Racconta due verità e una bugia. Poi gli altri votano: +1 a {n} per ogni persona che ha ingannato.",scTurnSinc:"Turno di {n}",scTurnSincSub:"Al tre dite una parola a testa. Ogni volta che le parole sono diverse è un tentativo in più. Quando dite la stessa parola, toccate «Stessa parola!».",scTries:"Tentativi",scAddTry:"+1 tentativo",scSame:"Stessa parola!",scNext:"Prossimo turno",scRank:"Classifica",scEnd:"Fine gioco",scPoints:"punti",scPoint:"punto",scTriesTot:"tentativi",scRounds:"turni giocati: {n}",scWinner:"Vince {n}!",scTie:"Parità tra {n}!",scNoTurn:"Nessun turno giocato",scBack:"Torna alla partita",scLastTries:"Ultimo turno: {n}",scTry1:"tentativo",scTurn1:"turno",scTurnN:"turni"});
 Object.assign(STRINGS.en,{scWho:"How many players?",scWhoTeams:"How many teams?",scTeam:"Team {n}",scTurnBugia:"{n}'s turn",scTurnBugiaSub:"Tell two truths and one lie. Then the others vote: +1 to {n} for each person fooled.",scTurnSinc:"{n}'s turn",scTurnSincSub:"On three, each of you says a word. Every time the words are different it's one more try. When you say the same word, tap \"Same word!\".",scTries:"Tries",scAddTry:"+1 try",scSame:"Same word!",scNext:"Next turn",scRank:"Leaderboard",scEnd:"End game",scPoints:"points",scPoint:"point",scTriesTot:"tries",scRounds:"turns played: {n}",scWinner:"{n} wins!",scTie:"Tie between {n}!",scNoTurn:"No turns played",scBack:"Back to the game",scLastTries:"Last turn: {n}",scTry1:"try",scTurn1:"turn",scTurnN:"turns"});
 Object.assign(STRINGS.es,{scWho:"¿Cuántos jugadores sois?",scWhoTeams:"¿Cuántos equipos sois?",scTeam:"Equipo {n}",scTurnBugia:"Le toca a {n}",scTurnBugiaSub:"Cuenta dos verdades y una mentira. Luego los demás votan: +1 a {n} por cada persona engañada.",scTurnSinc:"Turno de {n}",scTurnSincSub:"A la de tres, cada uno dice una palabra. Cada vez que las palabras son distintas es un intento más. Cuando digáis la misma palabra, tocad «¡Misma palabra!».",scTries:"Intentos",scAddTry:"+1 intento",scSame:"¡Misma palabra!",scNext:"Siguiente turno",scRank:"Clasificación",scEnd:"Fin del juego",scPoints:"puntos",scPoint:"punto",scTriesTot:"intentos",scRounds:"turnos jugados: {n}",scWinner:"¡Gana {n}!",scTie:"¡Empate entre {n}!",scNoTurn:"Ningún turno jugado",scBack:"Volver a la partida",scLastTries:"Último turno: {n}",scTry1:"intento",scTurn1:"turno",scTurnN:"turnos"});
}
function scT(k,o){scStrings();var s=T(k);o=o||{};for(var x in o)s=s.split("{"+x+"}").join(o[x]);return s;}
function scKind(){var g=(typeof curGame==="function")?curGame():null;return g&&g.sincronia?"sinc":"bugia";}
function scStart(){
 var kind=scKind();
 if(!SC||SC.kind!==kind)SC={kind:kind,n:kind==="sinc"?2:2,names:[],scores:[],tries:[],turns:[],turn:0,cur:0};
 S.screen="sc_setup";render();
}
function scTriesTxt(n){return n+" "+(n===1?scT("scTry1"):scT("scTriesTot"));}
function scTurnsTxt(n){return n+" "+(n===1?scT("scTurn1"):scT("scTurnN"));}
function scName(i){return SC.names[i]||(SC.kind==="sinc"?scT("scTeam",{n:i+1}):(T("qvPlayer")+(i+1)));}
function renderScSetup(){
 clr();scStrings();
 addBackArrow(function(){S.screen="game";render();});
 var wrap=div("mw-wrap");
 wrap.appendChild(div("mw-sub",SC.kind==="sinc"?scT("scWhoTeams"):scT("scWho")));
 var grid=div("player-names-grid");var inputs=[];
 function build(n){
  grid.innerHTML="";inputs=[];
  for(var k=0;k<n;k++){(function(idx){
   var row=div("player-name-row");
   var lab=SC.kind==="sinc"?scT("scTeam",{n:idx+1}):(T("qvPlayer")+(idx+1));
   row.appendChild(div("player-name-label",lab));
   var inp=document.createElement("input");inp.type="text";inp.className="player-name-input";inp.maxLength=16;
   inp.placeholder=SC.kind==="sinc"?scT("scTeam",{n:idx+1}):(T("playerNamePH")+(idx+1));inp.value=SC.names[idx]||"";
   inp.addEventListener("input",function(){SC.names[idx]=inp.value;});
   row.appendChild(inp);inputs.push(inp);grid.appendChild(row);
  })(k);}
 }
 var sw=makeStepperWidget(SC.n,SC.kind==="sinc"?1:2,20,function(n){SC.n=n;build(n);});sw.style.margin="20px 0 8px";
 wrap.appendChild(sw);wrap.appendChild(grid);build(SC.n);
 wrap.appendChild(btn("ebtn",T("ui_inizia"),function(){
  var seen={};
  SC.names=inputs.map(function(inp,i){var d=SC.kind==="sinc"?scT("scTeam",{n:i+1}):(T("qvPlayer")+(i+1));var v=inp.value.trim()||d;var b=v,c=2;while(seen[v.toLowerCase()]){v=b+" "+c;c++;}seen[v.toLowerCase()]=1;return v;});
  SC.scores=SC.names.map(function(){return 0;});SC.tries=SC.names.map(function(){return 0;});SC.turns=SC.names.map(function(){return 0;});
  SC.turn=0;SC.cur=0;SC.last=null;S.screen="sc_play";render();
 }));
 document.getElementById("root").appendChild(wrap);
}
function renderScPlay(){
 clr();scStrings();
 addBackArrow(function(){S.screen="sc_setup";render();});
 var wrap=div("sc-wrap");var who=scName(SC.turn);
 if(SC.kind==="bugia"){
  wrap.appendChild(div("sc-turn",scT("scTurnBugia",{n:who})));
  wrap.appendChild(div("sc-turn-sub",scT("scTurnBugiaSub",{n:who})));
  var list=div("sc-list");
  SC.names.forEach(function(n,i){
   var row=div("sc-row"+(i===SC.turn?" on":""));
   row.appendChild(div("sc-name",n));
   var ctl=div("sc-ctl");
   var m=document.createElement("button");m.type="button";m.className="sc-btn";m.textContent="−";m.disabled=SC.scores[i]<=0;
   m.onclick=function(){if(SC.scores[i]>0){SC.scores[i]--;renderScPlay();}};
   var v=div("sc-val",String(SC.scores[i]));
   var p=document.createElement("button");p.type="button";p.className="sc-btn plus";p.textContent="+";
   p.onclick=function(){SC.scores[i]++;renderScPlay();};
   ctl.appendChild(m);ctl.appendChild(v);ctl.appendChild(p);row.appendChild(ctl);list.appendChild(row);
  });
  wrap.appendChild(list);
  var bt=div("sc-btns");
  bt.appendChild(btn("ebtn",scT("scNext"),function(){SC.turns[SC.turn]++;SC.turn=(SC.turn+1)%SC.names.length;renderScPlay();}));
  bt.appendChild(btn("ebtn out",scT("scRank"),function(){S.screen="sc_rank";render();}));
  wrap.appendChild(bt);
 } else {
  wrap.appendChild(div("sc-turn",scT("scTurnSinc",{n:who})));
  wrap.appendChild(div("sc-turn-sub",scT("scTurnSincSub")));
  var big=div("sc-big");big.appendChild(div("sc-big-lab",scT("scTries")));big.appendChild(div("sc-big-val",String(SC.cur)));wrap.appendChild(big);
  var bt2=div("sc-btns");
  var add=document.createElement("button");add.type="button";add.className="ebtn out sc-add";add.textContent=scT("scAddTry");
  add.onclick=function(){SC.cur++;renderScPlay();};bt2.appendChild(add);
  bt2.appendChild(btn("ebtn",scT("scSame"),function(){
   // Il tentativo riuscito conta anche lui: almeno 1
   var used=SC.cur+1;SC.tries[SC.turn]+=used;SC.turns[SC.turn]++;SC.last={i:SC.turn,n:used};
   SC.cur=0;SC.turn=(SC.turn+1)%SC.names.length;renderScPlay();
  }));
  wrap.appendChild(bt2);
  if(SC.last)wrap.appendChild(div("sc-last",scName(SC.last.i)+" · "+scT("scLastTries",{n:scTriesTxt(SC.last.n)})));
  var tab=div("sc-list");
  SC.names.forEach(function(n,i){
   var row=div("sc-row"+(i===SC.turn?" on":""));row.appendChild(div("sc-name",n));
   row.appendChild(div("sc-val",scTriesTxt(SC.tries[i])+" · "+scTurnsTxt(SC.turns[i])));
   tab.appendChild(row);
  });
  wrap.appendChild(tab);
  var bt3=div("sc-btns");bt3.appendChild(btn("ebtn out",scT("scRank"),function(){S.screen="sc_rank";render();}));wrap.appendChild(bt3);
 }
 document.getElementById("root").appendChild(wrap);
}
function renderScRank(){
 clr();scStrings();
 addBackArrow(function(){S.screen="sc_play";render();});
 var wrap=div("sc-wrap");
 var idx=SC.names.map(function(_,i){return i;});
 var played=SC.kind==="sinc"?idx.filter(function(i){return SC.turns[i]>0;}):idx;
 // Bugia: più punti è meglio. Sincronia: meno tentativi in media è meglio (conta solo chi ha giocato)
 function val(i){return SC.kind==="sinc"?SC.tries[i]/Math.max(1,SC.turns[i]):SC.scores[i];}
 played.sort(function(a,b){return SC.kind==="sinc"?val(a)-val(b):val(b)-val(a);});
 wrap.appendChild(div("sc-turn",scT("scRank")));
 if(!played.length){wrap.appendChild(div("sc-turn-sub",scT("scNoTurn")));}
 else{
  var best=val(played[0]);var top=played.filter(function(i){return val(i)===best;});
  wrap.appendChild(div("sc-win",top.length>1?scT("scTie",{n:top.map(scName).join(", ")}):scT("scWinner",{n:scName(top[0])})));
  var list=div("sc-list");
  played.forEach(function(i,pos){
   var row=div("sc-row"+(top.indexOf(i)>=0?" on":""));
   row.appendChild(div("sc-name",(pos+1)+". "+scName(i)));
   row.appendChild(div("sc-val",SC.kind==="sinc"?(scTriesTxt(SC.tries[i])+" · "+scTurnsTxt(SC.turns[i])):(SC.scores[i]+" "+(SC.scores[i]===1?scT("scPoint"):scT("scPoints")))));
   list.appendChild(row);
  });
  wrap.appendChild(list);
 }
 var bt=div("sc-btns");
 bt.appendChild(btn("ebtn",scT("scEnd"),function(){var g=curGame()||{};endGame(g.name||"");}));
 bt.appendChild(btn("ebtn out",scT("scBack"),function(){S.screen="sc_play";render();}));
 wrap.appendChild(bt);
 document.getElementById("root").appendChild(wrap);
}
