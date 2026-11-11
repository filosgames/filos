/*!
 * Filòs — © 2026 i titolari del progetto Filòs. Tutti i diritti riservati.
 * Codice e contenuti sono opere protette dalla legge sul diritto d'autore (L. 633/1941).
 * È vietata qualsiasi copia, riproduzione, modifica o ridistribuzione senza autorizzazione scritta.
 */
// ══════════════════════════════════════════
// L'OCCHIO DEI COLORI
// Quattro file di strisce colorate da mettere in ordine di sfumatura.
// La prima e l'ultima striscia di ogni fila restano ferme: le altre si spostano
// trascinandole oppure toccandone una e poi il posto dove metterla.
// Conta solo la precisione. Si gioca da soli (SOLO), a turni sullo stesso telefono
// (TRA AMICI) o ognuno dal proprio telefono (A DISTANZA, 3 minuti).
// Niente pareggi: chi è pari in testa rifà una prova più difficile, finché uno vince.
// ══════════════════════════════════════════

// ── Colori ──
// Quattro file vivaci: rossi, gialli, verdi, blu-viola. In ogni fila cambia solo la tinta;
// luminosità e saturazione restano uguali (spazio Lab), così l'ordine giusto è uno solo.
// La difficoltà: più colori per fila e salto di tinta più piccolo. Il salto si calcola
// sulla differenza percepita (ΔE94): ogni fila è difficile uguale, qualunque sia il colore.
// Tutti i colori restano dentro la gamma dello schermo (sRGB).
var OC_LEVELS={
 facile:{n:7,dE:3.2},
 media:{n:8,dE:2.0},
 difficile:{n:9,dE:1.4},
 esperto:{n:10,dE:1.1}
};
var OC_HUES=[{h:30,L:60},{h:100,L:85},{h:140,L:72},{h:290,L:52}],OC_CMAX=62;
var OC_ROWS=4,OC_MS=180000,OC_REV_MS=20000,OC_MAX_PLAYERS=20;
function ocNextLevel(l){return l==="facile"?"media":l==="media"?"difficile":"esperto";}
function ocLabRgb(L,C,h){
 var a=C*Math.cos(h*Math.PI/180),b=C*Math.sin(h*Math.PI/180);
 var fy=(L+16)/116,fx=fy+a/500,fz=fy-b/200;
 function f(t){return t>0.206893?t*t*t:(t-16/116)/7.787;}
 var X=0.95047*f(fx),Y=1.0*f(fy),Z=1.08883*f(fz);
 return [3.2406*X-1.5372*Y-0.4986*Z,-0.9689*X+1.8758*Y+0.0415*Z,0.0557*X-0.2040*Y+1.0570*Z].map(function(v){return v<=0.0031308?12.92*v:1.055*Math.pow(v,1/2.4)-0.055;});
}
function ocInGamut(L,C,h){return ocLabRgb(L,C,h).every(function(v){return v>=-0.001&&v<=1.001;});}
function ocLch(L,C,h){
 return "#"+ocLabRgb(L,C,h).map(function(v){v=Math.round(Math.max(0,Math.min(1,v))*255);return ("0"+v.toString(16)).slice(-2);}).join("");
}
// Passo di tinta (gradi) che dà la differenza voluta tra due colori vicini
function ocStep(C,dE){return dE*(1+0.015*C)/C*180/Math.PI;}
function ocColors(lvl){
 ocColors.c=ocColors.c||{};if(ocColors.c[lvl])return ocColors.c[lvl];
 var cfg=OC_LEVELS[lvl]||OC_LEVELS.facile;var n=cfg.n;
 var rows=OC_HUES.map(function(R){
  // la saturazione più alta possibile per cui tutta la fila sta nella gamma dello schermo
  var C=OC_CMAX;
  for(;C>20;C--){var st=ocStep(C,cfg.dE),h0=R.h-st*(n-1)/2,ok=true;for(var i=0;i<n;i++)if(!ocInGamut(R.L,C,h0+i*st)){ok=false;break;}if(ok)break;}
  var st2=ocStep(C,cfg.dE),h1=R.h-st2*(n-1)/2,row=[];
  for(var k=0;k<n;k++)row.push(ocLch(R.L,C,h1+k*st2));
  return row;
 });
 return (ocColors.c[lvl]=rows);
}
// Numeri casuali ripetibili: lo stesso "seme" dà lo stesso miscuglio su tutti i telefoni
function ocRand(seed){var s=(seed>>>0)||1;return function(){s=(s+0x6D2B79F5)>>>0;var t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}
function ocHash(str){var h=2166136261;str=String(str);for(var i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
// Ordine di partenza: primo e ultimo fermi, gli altri mescolati (mai già in ordine)
function ocShuffled(lvl,seed){
 var n=(OC_LEVELS[lvl]||OC_LEVELS.facile).n;var rnd=ocRand(seed);var out=[];
 for(var r=0;r<OC_ROWS;r++){
  var mid=[];for(var i=1;i<n-1;i++)mid.push(i);
  var tries=0;
  do{for(var j=mid.length-1;j>0;j--){var k=Math.floor(rnd()*(j+1));var t=mid[j];mid[j]=mid[k];mid[k]=t;}tries++;}
  while(tries<20&&ocRowErr([0].concat(mid,[n-1]))<mid.length);
  out.push([0].concat(mid,[n-1]));
 }
 return out;
}
// Errore come nel test di Farnsworth: per ogni colore si guarda quanto sono lontani
// i vicini rispetto al giusto; 0 = ordine perfetto
function ocRowErr(row){var e=0;for(var i=1;i<row.length-1;i++){e+=Math.abs(row[i]-row[i-1])+Math.abs(row[i+1]-row[i])-2;}return e;}
function ocErr(rows){var e=0;(rows||[]).forEach(function(r){e+=ocRowErr(r);});return e;}
// Precisione in percentuale: 100% ordine perfetto, 0% come un ordine a caso
function ocRandErr(lvl){
 ocRandErr.c=ocRandErr.c||{};if(ocRandErr.c[lvl])return ocRandErr.c[lvl];
 var tot=0,N=300;for(var s=0;s<N;s++)tot+=ocErr(ocShuffled(lvl,7919+s*104729));
 return (ocRandErr.c[lvl]=Math.max(1,tot/N));
}
function ocPrec(rows,lvl){var e=ocErr(rows);return Math.max(0,Math.min(100,Math.round(100*(1-e/ocRandErr(lvl)))));}
// Copia pulita dell'ordine: solo le 4 file di numeri (niente dati del tabellone come la fila scelta),
// così il server la salva e la restituisce come elenco
function ocPlain(rows){return (rows||[]).slice(0,OC_ROWS).map(function(r){return Array.isArray(r)?r.slice():r;});}
// Il server può restituire un elenco come oggetto {0:..,1:..}: lo si rimette a elenco
function ocArr(v){if(Array.isArray(v))return v;if(!v||typeof v!=="object")return v;var out=[];Object.keys(v).forEach(function(k){if(/^\d+$/.test(k))out[+k]=ocArr(v[k]);});return out;}
function ocValid(rows,lvl){
 var n=(OC_LEVELS[lvl]||OC_LEVELS.facile).n;
 if(!Array.isArray(rows)||rows.length!==OC_ROWS)return false;
 return rows.every(function(r){if(!Array.isArray(r)||r.length!==n||r[0]!==0||r[n-1]!==n-1)return false;var s=r.slice().sort(function(a,b){return a-b;});for(var i=0;i<n;i++)if(s[i]!==i)return false;return true;});
}

// ── Il tabellone ──
// In alto le 4 file (linguette); sotto la fila scelta in grande: strisce alte, una accanto all'altra.
// Si sposta una striscia trascinandola a destra o a sinistra, oppure toccandola e poi toccando
// il posto dove metterla. Le strisce col puntino restano ferme.
// Ogni fila si chiude con «Fila fatta»: «Ho finito» (cta) si attiva solo quando sono fatte tutte.
// Il tabellone sta tutto nello schermo e non cambia misura mentre si gioca: la pagina non si muove.
function ocBoard(wrap,lvl,rows,onChange,readonly,cta){
 var colors=ocColors(lvl);var n=colors[0].length;
 if(typeof rows._r!=="number")rows._r=0;
 if(!Array.isArray(rows._done))rows._done=rows.map(function(){return false;});
 var box=div("oc-board3");wrap.appendChild(box);
 var tabs=div("oc-tabs3");box.appendChild(tabs);
 var col=div("oc-col3");box.appendChild(col);
 // sotto: «Fila N fatta» e, accanto, «Ho finito» (spento finché non sono fatte tutte)
 var act=div("oc-act");box.appendChild(act);
 var slot=div("oc-slot");act.appendChild(slot);if(cta)act.appendChild(cta);
 var sel=null;
 function allDone(){return rows._done.every(Boolean);}
 function nextUndone(){for(var k=1;k<=OC_ROWS;k++){var r=(rows._r+k)%OC_ROWS;if(!rows._done[r])return r;}return -1;}
 function goRow(r){if(r<0||r===rows._r)return;rows._r=r;sel=null;paintTabs();paintCol();paintAct();}
 function paintTabs(){
  tabs.innerHTML="";
  rows.forEach(function(row,r){
   var t=btn("oc-tab3"+(r===rows._r?" on":"")+(rows._done[r]?" done":""),"",function(){goRow(r);});
   // pallino col colore della fila, nome, e la spunta quando è fatta
   if(rows._done[r])t.appendChild(el("span","oc-tab3-ok","✓"));
   else{var dot=el("span","oc-tab3-dot","");dot.style.background=colors[r][Math.floor(n/2)];t.appendChild(dot);}
   t.appendChild(el("span","oc-tab3-l",T("ocRow").replace("{n}",r+1)));
   tabs.appendChild(t);
  });
 }
 function paintCol(){
  col.innerHTML="";var r=rows._r;
  rows[r].forEach(function(ci,i){
   var bar=div("oc-bar3"+(i===0||i===n-1?" fix":"")+(sel===i?" sel":""));
   bar.style.background=colors[r][ci];bar.dataset.i=i;
   if(i===0||i===n-1)bar.appendChild(div("oc-dot"));
   col.appendChild(bar);
  });
 }
 function paintAct(){
  slot.innerHTML="";var r=rows._r;
  if(!readonly){
   if(!rows._done[r]){
    slot.appendChild(btn("oc-rowbtn",T("ocRowDone").replace("{n}",r+1),function(){
     rows._done[r]=true;var nx=nextUndone();
     if(nx>=0)goRow(nx);else{paintTabs();paintAct();}
    }));
   } else if(!allDone()){
    var nx=nextUndone();
    slot.appendChild(btn("oc-rowbtn out",T("ocRowGo").replace("{n}",nx+1),function(){goRow(nx);}));
   }
  }
  slot.style.display=slot.firstChild?"":"none";
  if(cta)cta.disabled=!allDone();
 }
 function move(from,to){
  if(from===to)return;var row=rows[rows._r];var v=row.splice(from,1)[0];row.splice(to,0,v);
  if(onChange)onChange(rows);
 }
 function recolor(hold){
  var r=rows._r;var bars=col.children;
  rows[r].forEach(function(ci,i){bars[i].style.background=colors[r][ci];bars[i].classList.toggle("sel",i===hold);bars[i].classList.toggle("lift",i===hold);});
  var t=tabs.children[r];var sw=t&&t.querySelector(".oc-tab3-sw");if(sw)rows[r].forEach(function(ci,i){sw.children[i].style.background=colors[r][ci];});
 }
 if(!readonly){
  var st=null;
  function idxAt(x){var bars=col.children;var best=1,bd=1e9;for(var k=1;k<bars.length-1;k++){var b=bars[k].getBoundingClientRect();var d=Math.abs(x-(b.left+b.width/2));if(d<bd){bd=d;best=k;}}return best;}
  col.addEventListener("pointerdown",function(e){
   var bar=e.target.closest(".oc-bar3");if(!bar)return;var i=+bar.dataset.i;
   e.preventDefault();
   st={i:i,x:e.clientX,y:e.clientY,drag:false,id:e.pointerId,fix:(i===0||i===n-1)};
   try{col.setPointerCapture(e.pointerId);}catch(er){}
  });
  col.addEventListener("pointermove",function(e){
   if(!st||e.pointerId!==st.id)return;e.preventDefault();
   if(st.fix)return;
   if(!st.drag&&Math.abs(e.clientX-st.x)>6){st.drag=true;sel=null;recolor(st.i);}
   if(st.drag){var to=idxAt(e.clientX);if(to!==st.i){move(st.i,to);st.i=to;}recolor(st.i);}
  });
  col.addEventListener("pointerup",function(e){
   if(!st||e.pointerId!==st.id)return;var s2=st;st=null;
   if(s2.drag){paintCol();paintTabs();return;}
   if(s2.fix){sel=null;paintCol();return;}
   if(sel!==null&&sel!==s2.i){move(sel,s2.i);sel=null;paintCol();paintTabs();return;}
   sel=(sel===s2.i)?null:s2.i;paintCol();
  });
  col.addEventListener("pointercancel",function(e){if(st&&e.pointerId===st.id){st=null;paintCol();}});
  // niente scorrimento della pagina né menu del browser mentre si toccano le strisce
  box.addEventListener("touchmove",function(e){if(e.target.closest(".oc-col3"))e.preventDefault();},{passive:false});
  col.addEventListener("contextmenu",function(e){e.preventDefault();});
 }
 // Altezza delle strisce: tutto (tabellone e «Ho finito») deve stare nello schermo.
 // Si calcola quando la schermata è pronta e solo se cambia davvero la misura dello schermo
 // (rotazione), mai mentre si gioca: così niente si sposta.
 var lastW=0,lastH=0;
 function fit(force){
  if(!document.body.contains(col)){window.removeEventListener("resize",onRs);return;}
  var w=window.innerWidth,h=window.innerHeight;
  if(!force&&w===lastW&&Math.abs(h-lastH)<140)return;
  lastW=w;lastH=h;
  // fondo del contenuto (non dell'intera pagina, che è alta almeno quanto lo schermo)
  var root=document.getElementById("root")||document.body;
  col.style.height="240px";
  var over=root.getBoundingClientRect().bottom+(window.scrollY||0)-h;
  col.style.height=Math.max(150,Math.min(400,Math.floor(240-over-2)))+"px";
 }
 function onRs(){fit(false);}
 window.addEventListener("resize",onRs);
 paintTabs();paintCol();paintAct();
 box._fit=function(){fit(true);};
 requestAnimationFrame(function(){requestAnimationFrame(function(){fit(true);});});
 return box;
}
// Confronto: le file messe dal giocatore e, sotto ognuna, quella giusta
function ocCompare(wrap,lvl,rows){
 var colors=ocColors(lvl);var n=colors[0].length;
 var box=div("oc-compare");
 rows.forEach(function(row,r){
  var a=div("oc-row small");row.forEach(function(ci,i){var c=div("oc-cap"+(ci!==i?" off":""));c.style.background=colors[r][ci];a.appendChild(c);});
  var b=div("oc-row small ok");for(var i=0;i<n;i++){var c=div("oc-cap");c.style.background=colors[r][i];b.appendChild(c);}
  box.appendChild(a);box.appendChild(b);
 });
 wrap.appendChild(div("codice-section",T("ocCompare")));
 wrap.appendChild(box);
}
// Nomi a inizio frase: "Tu e Bruno sono pari" (non "te e Bruno")
function ocNamesStart(list,me){var t=rlNames(list,me);var y=String(T("rlYouIn"));if(t.indexOf(y+" ")===0||t===y)t=String(T("cdrYou2"))+t.slice(y.length);return t.charAt(0).toUpperCase()+t.slice(1);}
function ocLvlName(l){return l==="esperto"?T("ocExpert"):rlLevelName(l);}
function ocPrecTxt(p){return T("ocPrec").replace("{p}",p);}

// ══════════════════════════════════════════
// SOLO e TRA AMICI (stesso telefono)
// ══════════════════════════════════════════
var OCL=null;
function ocTitle(){return T("ocTitle");}
function ocHdr(wrap){
 var cat=getCatById(S.cat);
 var hdr=div("dhdr");hdr.style.background=(CAT_PASTEL&&CAT_PASTEL[S.cat])?CAT_PASTEL[S.cat]:cat.bg;
 var top=div("dhdr-top");hdr.appendChild(top);
 top.appendChild(btn("card-nav-btn back",T("backToGames"),goBackToGames));
 top.appendChild(btn("card-nav-btn",T("exitBtn"),goHome));
 hdr.appendChild(div("dtitle",ocTitle()));
 var card=div("dcard");card.appendChild(hdr);var body=div("dbody");card.appendChild(body);wrap.appendChild(card);
 return body;
}
function renderOcSetup(){
 ocStrings();clr();
 var wrap=div("panel");var body=ocHdr(wrap);
 var solo=S.cat==="solitario";
 var inputs=[];
 if(!solo){
  body.appendChild(div("rlabel",T("howMany")));
  if(!S.ocNames)S.ocNames=[];
  var grid=div("player-names-grid");
  var build=function(n){
   grid.innerHTML="";inputs=[];
   for(var k=0;k<n;k++){(function(idx){
    var row=div("player-name-row");row.appendChild(div("player-name-label",T("qvPlayer")+(idx+1)));
    var inp=document.createElement("input");inp.type="text";inp.className="player-name-input";inp.maxLength=16;
    inp.placeholder=T("playerNamePH")+(idx+1);inp.value=S.ocNames[idx]||"";
    inp.addEventListener("input",function(){S.ocNames[idx]=inp.value;});
    row.appendChild(inp);inputs.push(inp);grid.appendChild(row);
   })(k);}
  };
  body.appendChild(makeStepperWidget(S.ocNum||1,1,OC_MAX_PLAYERS,function(n){S.ocNum=n;build(n);}));
  body.appendChild(grid);
 }
 var lt=div("rlabel",T("ocChooseLevel"));lt.style.marginTop="18px";body.appendChild(lt);
 var lg=div("oc-levels");
 ["facile","media","difficile"].forEach(function(l){
  var c=div("oc-level");c.appendChild(el("span","oc-level-n",rlLevelName(l)));
  c.appendChild(el("span","oc-level-d",T("ocLvlDesc").replace("{n}",OC_LEVELS[l].n)));
  // anteprima: solo i colori fermi (primo e ultimo di ogni fila), così non si svela l'ordine
  var pv=div("oc-level-pv");ocColors(l).forEach(function(row){[row[0],row[row.length-1]].forEach(function(h){var s=div("");s.style.background=h;pv.appendChild(s);});});c.appendChild(pv);
  c.onclick=function(){
   var names=solo?[(typeof FILOS_NAME!=="undefined"&&FILOS_NAME)||T("ocYou")]:(function(){var seen={};return inputs.map(function(inp,i){var v=inp.value.trim()||(T("qvPlayer")+(i+1));var b=v,c2=2;while(seen[v.toLowerCase()]){v=b+" "+c2;c2++;}seen[v.toLowerCase()]=1;return v;});})();
   ocLocalStart(names,l);
  };
  lg.appendChild(c);
 });
 body.appendChild(lg);
 document.getElementById("root").appendChild(wrap);
}
function ocLocalStart(players,lvl){
 var seed=(Math.random()*4294967295)>>>0;
 OCL={players:players,solo:players.length<2,rounds:[{lvl:lvl,seed:seed,p:players.slice(),res:{}}],turn:0,cur:null,phase:players.length<2?"play":"pass"};
 S.screen="occhio";render();
}
function ocLocalRound(){return OCL.rounds[OCL.rounds.length-1];}
function renderOc(){
 ocStrings();clr();
 if(!OCL){S.screen="occhio_setup";renderOcSetup();return;}
 addBackArrow(goBackToGames);
 var rd=ocLocalRound();var who=rd.p[OCL.turn];
 var wrap=div("codice-wrap oc");wrap.style.textAlign="center";document.getElementById("root").appendChild(wrap);
 var isTb=OCL.rounds.length>1;
 if(OCL.phase==="pass"){
  wrap.appendChild(div("agr-round",(isTb?T("ocTbRound"):ocTitle())+" · "+ocLvlName(rd.lvl)));
  if(isTb)wrap.appendChild(div("rl-tb",T("rlTbBetween").replace("{n}",rlNames(rd.p,null))));
  wrap.appendChild(div("codice-big",T("codicePassTo")+who));
  wrap.appendChild(div("codice-sub",T("ocPassSub")));
  wrap.appendChild(btn("codice-cta",T("codiceIAm")+who,function(){OCL.phase="play";OCL.cur=null;renderOc();}));
  return;
 }
 if(OCL.phase==="play"){
  if(!OCL.cur)OCL.cur=ocShuffled(rd.lvl,rd.seed);
  if(OCL.solo||isTb)wrap.appendChild(div("agr-round",(isTb?T("ocTbRound")+" · ":"")+ocLvlName(rd.lvl)));
  if(!OCL.solo)wrap.appendChild(div("codice-big oc-who",T("codiceTurnBig").replace("{n}",who)));
  var done=btn("codice-cta",T("ocDone"),function(){
   if(done.disabled)return;
   rd.res[who]=OCL.cur.map(function(r){return r.slice();});OCL.cur=null;
   if(OCL.solo){OCL.phase="end";}
   else if(OCL.turn<rd.p.length-1){OCL.turn++;OCL.phase="pass";}
   else OCL.phase="res";
   window.scrollTo(0,0);renderOc();
  });
  ocBoard(wrap,rd.lvl,OCL.cur,null,false,done);
  window.scrollTo(0,0);
  return;
 }
 if(OCL.solo){ocLocalSoloEnd(wrap,rd);return;}
 // Risultati della prova (e spareggio se serve)
 var ranked=rd.p.slice().sort(function(a,b){return ocErr(rd.res[a])-ocErr(rd.res[b]);});
 var best=ocErr(rd.res[ranked[0]]);var top=ranked.filter(function(n){return ocErr(rd.res[n])===best;});
 if(top.length>1){
  wrap.appendChild(div("end-title",T("rlTbTitle")));
  wrap.appendChild(div("end-sub",T("ocTbSub").replace("{n}",rlNames(top,null))));
  ocResList(wrap,rd,ranked);
  wrap.appendChild(btn("codice-cta",T("rlTbGo"),function(){
   var lv=ocNextLevel(rd.lvl);OCL.rounds.push({lvl:lv,seed:(Math.random()*4294967295)>>>0,p:top.slice(),res:{}});OCL.turn=0;OCL.phase="pass";window.scrollTo(0,0);renderOc();
  }));
  return;
 }
 var winner=ranked[0];
 wrap.appendChild(div("end-title",winTxt(winner)));
 wrap.appendChild(div("end-sub",isTb?T("rlWonTb"):ocPrecTxt(ocPrec(rd.res[winner],rd.lvl))));
 ocFinalBoard(wrap,OCL.rounds,OCL.players);
 var bt=div("endbtns");
 bt.appendChild(btn("ebtn",T("qvPlayAgain"),function(){ocLocalStart(OCL.players,OCL.rounds[0].lvl);}));
 bt.appendChild(btn("ebtn out",T("changeLevel"),function(){OCL=null;S.screen="occhio_setup";render();}));
 bt.appendChild(btn("ebtn out",T("exitBtn"),goHome));
 wrap.appendChild(bt);
}
function ocLocalSoloEnd(wrap,rd){
 var me=rd.p[0];var p=ocPrec(rd.res[me],rd.lvl);var e=ocErr(rd.res[me]);
 wrap.appendChild(div("end-title",ocPrecTxt(p)));
 wrap.appendChild(div("end-sub",e===0?T("ocPerfect"):p>=90?T("ui_fenomenale"):p>=75?T("ui_ottimo"):p>=50?T("ui_non_male"):T("ui_riprova")));
 ocCompare(wrap,rd.lvl,rd.res[me]);
 var bt=div("endbtns");
 bt.appendChild(btn("ebtn",T("qvPlayAgain"),function(){ocLocalStart(OCL.players,rd.lvl);}));
 bt.appendChild(btn("ebtn out",T("changeLevel"),function(){OCL=null;S.screen="occhio_setup";render();}));
 bt.appendChild(btn("ebtn out",T("exitBtn"),goHome));
 wrap.appendChild(bt);
}
function ocResList(wrap,rd,ranked){
 var list=div("agr-list");
 var best=ranked.length?ocErr(rd.res[ranked[0]]):0;
 ranked.forEach(function(n,i){var r=div("agr-row"+(ocErr(rd.res[n])===best?" win":""));r.appendChild(div("agr-row-n",n));r.appendChild(div("agr-row-v",ocPrecTxt(ocPrec(rd.res[n],rd.lvl))));list.appendChild(r);});
 wrap.appendChild(list);
}
// Classifica finale: prima la prova principale, e per chi era pari conta lo spareggio
function ocFinalBoard(wrap,rounds,players){
 var main=rounds[0];
 var ord=ocFinalOrder(rounds,players,function(rd,n){return rd.res[n];});
 wrap.appendChild(div("codice-section",T("ocRanking")));
 var sc=div("agr-scores");
 ord.forEach(function(n){var r=div("agr-score");r.appendChild(div("agr-score-n",n));r.appendChild(div("agr-score-v",main.res[n]?ocPrecTxt(ocPrec(main.res[n],main.lvl)):"—"));sc.appendChild(r);});
 wrap.appendChild(sc);
}
function ocFinalOrder(rounds,players,get){
 function errOf(rd,n){var v=get(rd,n);return v?ocErr(v):1e9;}
 var ord=players.slice().sort(function(a,b){return errOf(rounds[0],a)-errOf(rounds[0],b);});
 for(var k=1;k<rounds.length;k++){
  var g=rounds[k].p;var pos=ord.indexOf(g[0]);var grp=ord.filter(function(n){return g.indexOf(n)>=0;});
  grp.sort(function(a,b){return errOf(rounds[k],a)-errOf(rounds[k],b);});
  var rest=ord.filter(function(n){return g.indexOf(n)<0;});
  ord=rest.slice(0,pos).concat(grp,rest.slice(pos));
 }
 return ord;
}

// ══════════════════════════════════════════
// A DISTANZA: ognuno dal proprio telefono, stessi colori per tutti, 3 minuti
//  rooms/{code}/oc/players/{nome} = {n,t}
//  rooms/{code}/oc/meta = {phase, order, game, lvl, rounds:[{lvl,seed,qt,p}], end}
//  rooms/{code}/oc/g{game}/r{k}/{nome} = {o:[[...],...], t}
// ══════════════════════════════════════════
var OCR={code:null,me:null,data:null,unsub:null,sig:"",busy:false,closed:false,cur:null,curKey:""};
function ocrPath(p){return "rooms/"+OCR.code+"/oc"+(p?"/"+p:"");}
function ocrState(){
 var d=OCR.data||{};var meta=d.meta||{phase:"lobby",order:[],game:1};
 var players=Object.keys(d.players||{}).sort(function(a,b){return (d.players[a].t||0)-(d.players[b].t||0);}).map(function(k){return d.players[k].n||k;});
 var left=d.left||{};var isLeft=function(n){return !!left[cdrKey(n)];};
 var lobby=players.filter(function(n){return !isLeft(n);});
 var order=meta.order||[];var active=order.filter(function(n){return !isLeft(n);});
 var phase=meta.phase||"lobby";var game=meta.game||1;
 var rounds=meta.rounds||[];var k=Math.max(0,rounds.length-1);var rd=rounds[k]||null;
 var gd=d["g"+game]||{};
 function ansOf(i){var raw=gd["r"+i]||{};var out={};var r=rounds[i];if(!r)return out;order.forEach(function(n){var a=raw[cdrKey(n)];if(a){a={o:ocArr(a.o),t:a.t};if(ocValid(a.o,r.lvl))out[n]=a;}});return out;}
 var cur=ansOf(k);
 var elig=rd?active.filter(function(n){return (rd.p||[]).indexOf(n)>=0;}):[];
 var allIn=elig.length>0&&elig.every(function(n){return !!cur[n];});
 var rv=!!(d.rv||{})[game+"_"+k];
 var reveal=phase==="play"&&!!rd&&(allIn||rv);
 var rt=0;
 if(reveal&&rd){var lim=(rd.qt||0)+OC_MS;if(allIn){var mx=0;elig.forEach(function(n){var t=+cur[n].t||0;if(t>mx)mx=t;});rt=Math.min(lim,Math.max(rd.qt||0,mx));}else rt=lim+1500;}
 var ended=false,interrupted=false;
 if(phase==="play"){if(meta.end)ended=true;else if(active.length<2){ended=true;interrupted=true;}else if(k>0&&elig.length<2)ended=true;}
 var leader=(phase==="lobby"?lobby:active.length?active:lobby)[0]||null;
 return {meta:meta,phase:phase,players:players,lobby:lobby,order:order,active:active,isLeft:isLeft,game:game,rounds:rounds,k:k,rd:rd,cur:cur,ansOf:ansOf,elig:elig,allIn:allIn,reveal:reveal,rt:rt,ended:ended,interrupted:interrupted,leader:leader};
}
// Chi è pari in testa nella prova k (fra chi la giocava)
function ocrTop(st,k){
 var rd=st.rounds[k];var a=st.ansOf(k);
 var group=st.active.filter(function(n){return (rd.p||[]).indexOf(n)>=0;});
 var best=1e9;group.forEach(function(n){var e=a[n]?ocErr(a[n].o):1e9;if(e<best)best=e;});
 return group.filter(function(n){return (a[n]?ocErr(a[n].o):1e9)===best;});
}
function ocrCreate(done){
 cdrStrings();ocStrings();
 if(!fbDB){done(false,T("firebaseErr"));return;}
 var tries=0;
 (function attempt(){
  tries++;var code=String(Math.floor(1000+Math.random()*9000));
  cdrNet(fbGet(fbRef(fbDB,"rooms/"+code))).then(function(snap){
   if(snap.exists()&&tries<8){attempt();return;}
   var me=cdrMyName();var now=Date.now();
   var room={created:now,kind:"occhio",oc:{meta:{phase:"lobby",order:[],game:1,lvl:"facile"},players:{}}};
   room.oc.players[cdrKey(me)]={n:me,t:now};
   cdrNet(fbSet(fbRef(fbDB,"rooms/"+code),room)).then(function(){ocrAttach(code,me);done(true);}).catch(function(){done(false,T("connErr"));});
  }).catch(function(){done(false,T("connErr"));});
 })();
}
function ocrJoin(code,done){
 cdrStrings();ocStrings();
 if(!fbDB){done(false,T("firebaseErr"));return;}
 code=String(code||"").replace(/\D/g,"");
 if(code.length!==4){done(false,T("ui_stanza_non_trovata_o_scaduta"));return;}
 cdrNet(fbGet(fbRef(fbDB,"rooms/"+code+"/oc"))).then(function(snap){
  if(!snap.exists()){done(false,T("ui_stanza_non_trovata_o_scaduta"));return;}
  var d=snap.val()||{};var meta=d.meta||{};
  if(meta.phase&&meta.phase!=="lobby"){done(false,T("cdrAlreadyStarted"));return;}
  var left=d.left||{};
  var taken=Object.keys(d.players||{}).filter(function(k){return !left[k];}).map(function(k){return d.players[k].n||k;});
  if(!taken.length){done(false,T("ui_stanza_non_trovata_o_scaduta"));return;}
  if(taken.length>=OC_MAX_PLAYERS){done(false,T("rlRoomFull"));return;}
  rlClaim("rooms/"+code+"/oc",left,OC_MAX_PLAYERS,T("rlRoomFull"),function(ok,me,msg){if(!ok){done(false,msg);return;}ocrAttach(code,me);done(true);}).go(taken,left);
 }).catch(function(){done(false,T("connErr"));});
}
function ocrAttach(code,me){
 if(typeof rlRejoinSave==="function")rlRejoinSave("ocr",code,me);
 ocrDetach();
 OCR.code=code;OCR.me=me;OCR.data=null;OCR.sig="";OCR.closed=false;OCR.busy=false;OCR.abusy=false;OCR.cur=null;OCR.curKey="";
 OCR.unsub=fbOnValue(fbRef(fbDB,"rooms/"+code+"/oc"),function(snap){
  var v=snap.val();if(!v){OCR.closed=true;OCR.data=null;}else OCR.data=v;
  if(S.screen==="ocr")ocrRender(false);
 });
}
function ocrDetach(){if(OCR.unsub){try{OCR.unsub();}catch(e){}}OCR.unsub=null;}
function ocrLeave(soft){
 // soft: la pagina si sta chiudendo o ricaricando: si segna l'uscita ma la stanza non si chiude,
 // così si può rientrare (vedi rlTryRejoin)
 if(!soft&&typeof rlRejoinClear==="function")rlRejoinClear();
 if(OCR.code&&OCR.me&&fbDB&&!OCR.closed){
  var close=false;
  try{var st=ocrState();close=(!soft&&st.phase==="lobby"&&st.leader===OCR.me)||st.lobby.filter(function(n){return n!==OCR.me;}).length===0;}catch(e){}
  if(close){try{fbRemove(fbRef(fbDB,"rooms/"+OCR.code));}catch(e){}}
  else{try{fbSet(fbRef(fbDB,ocrPath("left/"+cdrKey(OCR.me))),true);}catch(e){}}
 }
 ocrDetach();OCR.code=null;OCR.me=null;OCR.data=null;OCR.sig="";OCR.closed=false;OCR.cur=null;
}
window.addEventListener("pagehide",function(e){if(OCR.code&&!(e&&e.persisted))ocrLeave(true);});
function ocrExit(){ocrLeave();goBackToGames();}
function ocrNewRound(lvl,p,qt,seedKey){return {lvl:lvl,seed:ocHash(seedKey),qt:qt,p:p.slice()};}
function ocrStart(){
 var st=ocrState();if(st.leader!==OCR.me||st.lobby.length<2||OCR.busy)return;
 OCR.busy=true;var order=st.lobby.slice(0,OC_MAX_PLAYERS);var lv=rlLevel(st.meta);
 var m={phase:"play",order:order,game:st.game,lvl:lv,end:false,rounds:[ocrNewRound(lv,order,fbNow(),OCR.code+"|"+st.game+"|"+Math.random())]};
 cdrNet(fbSet(fbRef(fbDB,ocrPath("meta")),m)).then(function(){OCR.busy=false;}).catch(function(){OCR.busy=false;cdrToast(T("connErr"));});
}
function ocrSetLevel(l){
 var st=ocrState();if(st.leader!==OCR.me||OCR.busy||RL_LEVELS.indexOf(l)<0)return;
 OCR.busy=true;
 cdrNet(fbSet(fbRef(fbDB,ocrPath("meta")),Object.assign({},st.meta,{lvl:l}))).then(function(){OCR.busy=false;}).catch(function(){OCR.busy=false;cdrToast(T("connErr"));});
}
function ocrSend(rows){
 // Invio della risposta: ha un suo blocco (abusy), così un tocco non si perde mentre il telefono
 // sta scrivendo il passaggio alla domanda successiva
 var st=ocrState();
 if(st.phase!=="play"||st.ended||st.reveal||st.elig.indexOf(OCR.me)<0||st.cur[OCR.me]||OCR.abusy)return;
 if(!ocValid(ocPlain(rows),st.rd.lvl)){OCR.sig="";ocrRender(true);return;}
 OCR.abusy=true;
 var ref=fbRef(fbDB,ocrPath("g"+st.game+"/r"+st.k+"/"+cdrKey(OCR.me)));
 cdrNet(fbGet(ref)).then(function(snap){
  if(snap.exists()){OCR.abusy=false;OCR.sig="";ocrRender(true);return;}
  return cdrNet(fbSet(ref,{o:ocPlain(rows),t:fbNow()})).then(function(){OCR.abusy=false;OCR.sig="";ocrRender(true);});
 }).catch(function(){OCR.abusy=false;cdrToast(T("connErr"));OCR.sig="";ocrRender(true);});
}
// Allo scadere dei 3 minuti l'ordine fatto fin lì parte da solo, poi si mostrano i risultati
function ocrTimeUp(game,k){
 var st=ocrState();if(st.game!==game||st.k!==k||st.reveal||st.ended||st.phase!=="play")return;
 if(st.elig.indexOf(OCR.me)>=0&&!st.cur[OCR.me]&&OCR.cur&&OCR.curKey===game+"|"+k)ocrSend(OCR.cur);
 setTimeout(function(){var s2=ocrState();if(s2.game!==game||s2.k!==k||s2.reveal)return;try{fbSet(fbRef(fbDB,ocrPath("rv/"+game+"_"+k)),true);}catch(e){}},1500);
}
// Dopo i risultati: spareggio per chi è pari in testa, altrimenti fine (uguale su tutti i telefoni)
function ocrNext(game,k){
 var st=ocrState();if(st.phase!=="play"||!st.reveal||st.ended||OCR.busy||st.game!==game||st.k!==k)return;
 if(st.active.indexOf(OCR.me)<0)return;
 var m=JSON.parse(JSON.stringify(st.meta));var top=ocrTop(st,k);
 if(top.length>1){m.rounds=(m.rounds||[]).concat([ocrNewRound(ocNextLevel(st.rd.lvl),top,st.rt+OC_REV_MS,st.rd.seed+"|tb"+(k+1))]);}
 else m.end=true;
 OCR.busy=true;
 cdrNet(fbSet(fbRef(fbDB,ocrPath("meta")),m)).then(function(){OCR.busy=false;}).catch(function(){OCR.busy=false;});
}
function ocrRematch(){
 var st=ocrState();if(st.leader!==OCR.me||OCR.busy)return;
 var still=st.order.filter(function(n){return !st.isLeft(n);});var lv=rlLevel(st.meta);
 var m=still.length<2?{phase:"lobby",order:[],game:st.game+1,lvl:lv}:{phase:"play",order:still,game:st.game+1,lvl:lv,end:false,rounds:[ocrNewRound(lv,still,fbNow(),OCR.code+"|"+(st.game+1)+"|"+Math.random())]};
 OCR.busy=true;
 cdrNet(fbSet(fbRef(fbDB,ocrPath("meta")),m)).then(function(){OCR.busy=false;}).catch(function(){OCR.busy=false;cdrToast(T("connErr"));});
}
function ocrInvite(silent){
 if(!fbDB||!OCR.code)return;
 var inv={from:OCR.me,game:"L'OCCHIO DEI COLORI",kind:"occhio",cat:"relax",roomCode:OCR.code,dev:(typeof filosDevId==="function"?filosDevId():null),pubCode:(typeof filosVenue==="function"?filosVenue():"")||null,ts:invNow()};
 var key="inv_"+Date.now()+"_"+Math.random().toString(36).slice(2,7);
 try{fbSet(fbRef(fbDB,invPath(key)),inv);setTimeout(function(){try{fbRemove(fbRef(fbDB,invPath(key)));}catch(e){}},30000);if(!silent)cdrToast(T("cdrInviteSent"));}catch(e){}
}
function renderOcRemote(){ocrRender(true);}
function ocrSignature(st){
 var s=[OCR.closed,st.phase,rlLevel(st.meta),st.lobby,st.active,st.game,st.k,st.reveal,st.ended,st.leader,LANG,!!st.cur[OCR.me]];
 if(st.cur[OCR.me]||st.reveal||st.elig.indexOf(OCR.me)<0)s.push(Object.keys(st.cur));
 return JSON.stringify(s);
}
function ocrRender(force){
 if(S.screen!=="ocr")return;
 if(typeof geoGateNeededNow==="function"&&geoGateNeededNow())return; // fuori dal locale: resta la schermata della posizione
 cdrStrings();ocStrings();
 var st=OCR.code?ocrState():null;if(st&&rlGuard(st,OCR.me,OC_MAX_PLAYERS,function(){ocrLeave();}))return;var sig=OCR.code?ocrSignature(st):"none";
 if(!force&&sig===OCR.sig)return;OCR.sig=sig;
 clr();addBackArrow(ocrExit);
 var wrap=div("codice-wrap cdr agr oc");wrap.style.textAlign="center";document.getElementById("root").appendChild(wrap);
 if(!OCR.code){ocrScreenStart(wrap);return;}
 if(OCR.closed){wrap.appendChild(div("codice-big",T("cdrClosed")));wrap.appendChild(div("codice-sub",T("cdrClosedSub")));wrap.appendChild(btn("codice-cta",T("backToGames"),ocrExit));return;}
 if(!OCR.data){wrap.appendChild(div("codice-sub",T("cdrConnecting")));return;}
 if(st.isLeft(OCR.me)){wrap.appendChild(div("codice-big",T("cdrYouLeft")));wrap.appendChild(btn("codice-cta",T("backToGames"),ocrExit));return;}
 if(st.phase==="lobby"){ocrScreenLobby(wrap,st);return;}
 if(st.order.indexOf(OCR.me)<0){wrap.appendChild(div("codice-big",T("cdrAlreadyStarted")));wrap.appendChild(btn("codice-cta",T("backToGames"),ocrExit));return;}
 if(st.ended){ocrScreenEnd(wrap,st);return;}
 if(st.reveal){ocrScreenReveal(wrap,st);return;}
 if(st.elig.indexOf(OCR.me)<0)ocrScreenWatch(wrap,st);
 else if(!st.cur[OCR.me])ocrScreenPlay(wrap,st);
 else ocrScreenWait(wrap,st);
}
function ocrScreenStart(wrap){
 cdrHeader(wrap,T("cdrRemote"),ocTitle(),T("cdrIntro"));
 if(!fbDB){wrap.appendChild(div("codice-sub",T("firebaseErr")));return;}
 var err=div("cdr-err");
 var sfida=btn("codice-cta",T("ui_sfida_un_altro_tavolo"),function(){
  if(sfida.disabled)return;sfida.disabled=true;sfida.textContent=T("ui_invio_sfida");err.textContent="";
  ocrCreate(function(ok,msg){
   if(!ok){sfida.disabled=false;sfida.textContent=T("ui_sfida_un_altro_tavolo");err.textContent=msg||T("connErr");return;}
   ocrInvite(true);if(S.screen!=="ocr"){ocrLeave();return;}ocrRender(true);
  });
 });
 wrap.appendChild(sfida);
 wrap.appendChild(div("codice-legend",T("ui_gli_altri_dispositivi_riceveranno_una")));
 wrap.appendChild(err);
}
function ocrScreenLobby(wrap,st){
 var lead=st.leader===OCR.me;
 cdrHeader(wrap,lead?T("ui_in_attesa_degli_altri"):T("ui_connesso"),ocTitle(),lead?null:T("cdrWaitHost").replace("{n}",st.leader||""));
 wrap.appendChild(div("codice-section",T("playersInRoom")+" "+st.lobby.length+"/"+OC_MAX_PLAYERS));
 var list=div("cdr-list"+(st.lobby.length>8?" many":""));
 st.lobby.forEach(function(n){var r=div("cdr-row");r.appendChild(div("cdr-dot on"));r.appendChild(div("cdr-name",n+(n===OCR.me?" "+T("cdrYou"):"")));if(n===st.leader)r.appendChild(div("cdr-tag",T("cdrHost")));list.appendChild(r);});
 wrap.appendChild(list);
 rlLevelPicker(wrap,rlLevel(st.meta),lead,ocrSetLevel);
 if(lead){
  var go=btn("codice-cta",T("qvStart"),ocrStart);go.disabled=st.lobby.length<2;wrap.appendChild(go);
  if(st.lobby.length<2)wrap.appendChild(div("codice-legend",T("ui_aspetta_che_si_colleghi_almeno")));
  if(st.lobby.length<OC_MAX_PLAYERS)wrap.appendChild(btn("cdr-link",T("cdrResend"),function(){ocrInvite();}));
  wrap.appendChild(btn("cdr-link muted",T("ui_annulla_sfida"),ocrExit));
 } else wrap.appendChild(btn("cdr-link muted",T("ui_esci_dalla_stanza"),ocrExit));
}
function ocrHead(wrap,st){
 var isTb=st.k>0;
 wrap.appendChild(div("agr-round",(isTb?T("ocTbRound"):ocTitle())+" · "+ocLvlName(st.rd.lvl)));
 if(isTb)wrap.appendChild(div("rl-tb",T("rlTbBetween").replace("{n}",rlNames(st.rd.p||[],OCR.me))));
}
function ocrTimer(wrap,st){var g=st.game,k=st.k;rlTimer(wrap,st.rd.qt||fbNow(),OC_MS,function(){ocrTimeUp(g,k);});}
function ocrScreenPlay(wrap,st){
 ocrHead(wrap,st);
 var key=st.game+"|"+st.k;
 if(OCR.curKey!==key){OCR.curKey=key;OCR.cur=ocShuffled(st.rd.lvl,st.rd.seed);}
 ocrTimer(wrap,st);
 var ok=btn("codice-cta",T("ocDone"),function(){if(ok.disabled)return;ok.disabled=true;ocrSend(OCR.cur);});
 ocBoard(wrap,st.rd.lvl,OCR.cur,null,false,ok);
}
function ocrChips(wrap,st){var c=div("agr-chips");st.elig.forEach(function(n){c.appendChild(div("agr-chip"+(st.cur[n]?" on":""),n===OCR.me?T("cdrYou2"):n));});wrap.appendChild(c);}
function ocrScreenWait(wrap,st){
 ocrHead(wrap,st);ocrTimer(wrap,st);
 var box=div("agr-sent");box.appendChild(div("agr-sent-t",T("qvAnswerSent")));wrap.appendChild(box);
 var missing=st.elig.filter(function(n){return !st.cur[n];});
 wrap.appendChild(div("codice-sub",T("ocWaiting").replace("{a}",st.elig.length-missing.length).replace("{t}",st.elig.length)));
 ocrChips(wrap,st);
}
function ocrScreenWatch(wrap,st){
 ocrHead(wrap,st);ocrTimer(wrap,st);
 wrap.appendChild(div("codice-sub",T("rlTbWatch").replace("{n}",rlNames(st.elig,OCR.me))));
 ocrChips(wrap,st);
}
function ocrScreenReveal(wrap,st){
 ocrHead(wrap,st);
 var top=ocrTop(st,st.k);var willTb=top.length>1;
 var box=div("rl-next");box.appendChild(div("rl-next-l",willTb?T("rlNextTb"):T("rlNextFinal")));wrap.appendChild(box);
 var g=st.game,k=st.k;rlTimer(box,st.rt||fbNow(),OC_REV_MS,function(){ocrNext(g,k);});
 var a=st.cur;var group=st.order.filter(function(n){return (st.rd.p||[]).indexOf(n)>=0;});
 var ranked=group.slice().sort(function(x,y){return (a[x]?ocErr(a[x].o):1e9)-(a[y]?ocErr(a[y].o):1e9);});
 var list=div("agr-list");
 ranked.forEach(function(n){
  var r=div("agr-row"+(top.indexOf(n)>=0?" win":""));
  r.appendChild(div("agr-row-n",(n===OCR.me?T("cdrYou2"):n)+(st.isLeft(n)?" · "+T("cdrLeftTag"):"")));
  r.appendChild(div("agr-row-v",a[n]?ocPrecTxt(ocPrec(a[n].o,st.rd.lvl)):T("ocNoAnswer")));
  list.appendChild(r);
 });
 wrap.appendChild(list);
 if(willTb)wrap.appendChild(div("agr-point",T("ocTbSub").replace("{n}",ocNamesStart(top,OCR.me))));
 if(a[OCR.me])ocCompare(wrap,st.rd.lvl,a[OCR.me].o);
}
function ocrScreenEnd(wrap,st){
 if(st.interrupted){wrap.appendChild(div("end-title",T("cdrInterrupted")));wrap.appendChild(div("end-sub",T("cdrInterruptedSub")));}
 var rounds=st.rounds.map(function(r,i){var a=st.ansOf(i);var res={};Object.keys(a).forEach(function(n){res[n]=a[n].o;});return {lvl:r.lvl,p:r.p||[],res:res};});
 if(!st.interrupted&&rounds.length){
  var ord=ocFinalOrder(rounds,st.order,function(rd,n){return rd.res[n];});var w=ord[0];
  wrap.appendChild(div("end-title",w===OCR.me?T("cdrYouWon"):winTxt(w)));
  wrap.appendChild(div("end-sub",rounds.length>1?T("rlWonTb"):(rounds[0].res[w]?ocPrecTxt(ocPrec(rounds[0].res[w],rounds[0].lvl)):"")));
 }
 if(rounds.length){
  var ord2=ocFinalOrder(rounds,st.order,function(rd,n){return rd.res[n];});
  wrap.appendChild(div("codice-section",T("ocRanking")));
  var sc=div("agr-scores");
  ord2.forEach(function(n){var r=div("agr-score");r.appendChild(div("agr-score-n",(n===OCR.me?T("cdrYou2"):n)+(st.isLeft(n)?" · "+T("cdrLeftTag"):"")));r.appendChild(div("agr-score-v",rounds[0].res[n]?ocPrecTxt(ocPrec(rounds[0].res[n],rounds[0].lvl)):"—"));sc.appendChild(r);});
  wrap.appendChild(sc);
 }
 if(st.leader===OCR.me)rlLevelPicker(wrap,rlLevel(st.meta),true,ocrSetLevel);
 var bt=div("endbtns");
 if(st.leader===OCR.me)bt.appendChild(btn("ebtn",T("qvPlayAgain"),ocrRematch));
 else wrap.appendChild(div("cdr-wait",T("cdrWaitRematch").replace("{n}",st.leader||"")));
 bt.appendChild(btn("ebtn out",T("exitBtn"),function(){ocrLeave();goHome();}));
 wrap.appendChild(bt);
}

// ── Testi ──
function ocStrings(){
 if(typeof STRINGS==="undefined"||STRINGS.it.ocTitle)return;
 Object.assign(STRINGS.it,{ocTitle:"L'OCCHIO DEI COLORI",ocRulesSolo:"Metti in ordine di sfumatura le quattro file di strisce colorate. La prima e l'ultima di ogni fila (con il puntino) restano ferme. Sposta le altre trascinandole a destra o a sinistra, oppure tocca una striscia e poi il posto dove metterla. Conta solo la precisione.",ocRulesFriends:"A turno, sullo stesso telefono, ognuno mette in ordine di sfumatura le stesse quattro file di strisce colorate. La prima e l'ultima di ogni fila (con il puntino) restano ferme. Vince chi è più preciso; se c'è parità si rifà una prova più difficile solo tra chi è pari.",ocIntroRemote:"Ognuno gioca dal proprio telefono, anche da tavoli diversi: tutti ricevono gli stessi colori da mettere in ordine di sfumatura. Ci sono 3 minuti. Vince chi è più preciso; se c'è parità, prova più difficile solo per chi è pari.",ocChooseLevel:"SCEGLI IL LIVELLO",ocLvlDesc:"{n} colori per fila",ocExpert:"Esperto",ocYou:"Tu",ocPassSub:"Gli altri non devono guardare lo schermo mentre metti in ordine i colori.",ocHint:"Scegli una fila, poi trascina le strisce a destra o a sinistra, oppure toccane una e poi il posto dove metterla. Quelle con il puntino restano ferme.",ocRow:"Fila {n}",ocRowDone:"Fila {n} fatta",ocRowGo:"Vai alla fila {n}",ocRowsLeft:"File fatte: {a} di {t}",ocDone:"Ho finito",ocPrec:"Precisione {p}%",ocPerfect:"Perfetto! Ordine senza errori.",ocCompare:"IL TUO ORDINE E QUELLO GIUSTO",ocRanking:"CLASSIFICA",ocTbRound:"Spareggio",ocTbSub:"{n} sono pari: prova più difficile solo per loro.",ocWaiting:"Hanno finito {a} su {t}",ocNoAnswer:"non ha finito"});
 Object.assign(STRINGS.en,{ocTitle:"THE COLOR EYE",ocRulesSolo:"Put the four rows of colored stripes in order of shade. The first and last stripe of each row (with the dot) stay fixed. Move the others by dragging them left or right, or tap a stripe and then the spot where it goes. Only accuracy counts.",ocRulesFriends:"Taking turns on the same phone, everyone puts the same four rows of colored stripes in order of shade. The first and last stripe of each row (with the dot) stay fixed. The most accurate player wins; if there is a tie, the tied players play a harder round.",ocIntroRemote:"Everyone plays on their own phone, even from different tables: all players get the same colors to put in order of shade. You have 3 minutes. The most accurate player wins; if there is a tie, only the tied players play a harder round.",ocChooseLevel:"CHOOSE THE LEVEL",ocLvlDesc:"{n} colors per row",ocExpert:"Expert",ocYou:"You",ocPassSub:"Nobody else should look at the screen while you sort the colors.",ocHint:"Pick a row, then drag the stripes left or right, or tap one and then the spot where it goes. The ones with a dot stay fixed.",ocRow:"Row {n}",ocRowDone:"Row {n} done",ocRowGo:"Go to row {n}",ocRowsLeft:"Rows done: {a} of {t}",ocDone:"I'm done",ocPrec:"Accuracy {p}%",ocPerfect:"Perfect! No mistakes.",ocCompare:"YOUR ORDER AND THE RIGHT ONE",ocRanking:"RANKING",ocTbRound:"Tie-break",ocTbSub:"{n} are tied: a harder round just for them.",ocWaiting:"{a} of {t} have finished",ocNoAnswer:"didn't finish"});
 Object.assign(STRINGS.es,{ocTitle:"EL OJO DE LOS COLORES",ocRulesSolo:"Ordena por matices las cuatro filas de franjas de colores. La primera y la última de cada fila (con el punto) no se mueven. Mueve las demás arrastrándolas a la derecha o a la izquierda, o toca una franja y luego el sitio donde va. Solo cuenta la precisión.",ocRulesFriends:"Por turnos, en el mismo móvil, cada uno ordena por matices las mismas cuatro filas de franjas de colores. La primera y la última de cada fila (con el punto) no se mueven. Gana quien es más preciso; si hay empate, los empatados juegan una prueba más difícil.",ocIntroRemote:"Cada uno juega desde su móvil, incluso desde mesas distintas: todos reciben los mismos colores para ordenar por matices. Hay 3 minutos. Gana quien es más preciso; si hay empate, solo los empatados juegan una prueba más difícil.",ocChooseLevel:"ELIGE EL NIVEL",ocLvlDesc:"{n} colores por fila",ocExpert:"Experto",ocYou:"Tú",ocPassSub:"Los demás no deben mirar la pantalla mientras ordenas los colores.",ocHint:"Elige una fila y luego arrastra las franjas a la derecha o a la izquierda, o toca una y luego el sitio donde va. Las que tienen un punto no se mueven.",ocRow:"Fila {n}",ocRowDone:"Fila {n} hecha",ocRowGo:"Ir a la fila {n}",ocRowsLeft:"Filas hechas: {a} de {t}",ocDone:"He terminado",ocPrec:"Precisión {p}%",ocPerfect:"¡Perfecto! Sin errores.",ocCompare:"TU ORDEN Y EL CORRECTO",ocRanking:"CLASIFICACIÓN",ocTbRound:"Desempate",ocTbSub:"{n} están empatados: prueba más difícil solo para ellos.",ocWaiting:"Han terminado {a} de {t}",ocNoAnswer:"no ha terminado"});
}
