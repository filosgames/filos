/*!
 * Filòs — © 2026 i titolari del progetto Filòs. Tutti i diritti riservati.
 * Codice e contenuti sono opere protette dalla legge sul diritto d'autore (L. 633/1941).
 * È vietata qualsiasi copia, riproduzione, modifica o ridistribuzione senza autorizzazione scritta.
 */
// ══════════════════════════════════════════
// IMPOSTAZIONI DEL SINGOLO LOCALE (decise dal pannello Filòs, index.html#admin)
// Tutti i locali hanno gli stessi giochi; qui si applicano solo le differenze di un locale.
// Firebase: filos_cfg/{locale} = {
//   at: ultima modifica,
//   cats: {<categoria>: 0}                     categoria nascosta in questo locale
//   g:   {<chiave>: {vis, name, rules, tip, players, time, items, rounds, ed}}
//        chiave = vcKey(categoria, nome italiano); vis 0 = spento, 1 = acceso (anche se in pausa)
//        name/rules/tip = {it,en,es}; items = frasi {it:[…],en:[…],es:[…]}
//        rounds = domande {it:[{label,items:[…]}],…}; ed = quando è stato modificato
//   nw:  {<id>: {cat, kind:"frasi"|"domande", name, rules, tip, players, time, items|rounds, vis, ord, ed}}
// }
// I telefoni del locale (gestore, o clienti entrati dal tag) leggono solo il loro locale.
// ══════════════════════════════════════════
var VC_LANGS=["it","en","es"];
var VC_BAMBINI_ORD=["PRIMO APPUNTAMENTO","ROMPIGHIACCIO","CONOSCIAMOCI"];
var VCFG={v:null,cfg:null,pending:null,fetching:false,fetchedAt:0,nameMap:{it:{},en:{},es:{}}};
function vcKey(cat,it){return encodeURIComponent(String(cat)+"|"+String(it)).replace(/\./g,"%2E");}
function vcKeyRaw(k){return encodeURIComponent(String(k)).replace(/\./g,"%2E");}
function vcArr(x){
 if(Array.isArray(x))return x.slice();
 if(x&&typeof x==="object")return Object.keys(x).sort(function(a,b){return (+a)-(+b);}).map(function(k){return x[k];});
 return [];
}
function vcStr(x,max){return typeof x==="string"?x.replace(/\r/g,"").trim().slice(0,max):"";}
function vcLang(o,max){
 var r={},any=false;
 if(o&&typeof o==="object")VC_LANGS.forEach(function(L){var s=vcStr(o[L],max);if(s){r[L]=s;any=true;}});
 return any?r:null;
}
// Come vcLang, ma tiene anche il testo vuoto (per togliere il consiglio)
function vcLangE(o,max){
 var r={},any=false;
 if(o&&typeof o==="object")VC_LANGS.forEach(function(L){if(typeof o[L]==="string"){r[L]=vcStr(o[L],max);any=true;}});
 return any?r:null;
}
function vcItems(o){
 var r={},any=false;
 if(o&&typeof o==="object")VC_LANGS.forEach(function(L){
  var a=vcArr(o[L]).map(function(s){return vcStr(s,400);}).filter(Boolean).slice(0,500);
  if(a.length){r[L]=a;any=true;}
 });
 return any?r:null;
}
function vcRounds(o){
 var r={},any=false;
 if(o&&typeof o==="object")VC_LANGS.forEach(function(L){
  var a=vcArr(o[L]).map(function(rd){
   if(!rd||typeof rd!=="object")return null;
   var it=vcArr(rd.items).map(function(s){return vcStr(s,400);}).filter(Boolean).slice(0,300);
   return it.length?{label:vcStr(rd.label,80),items:it}:null;
  }).filter(Boolean).slice(0,20);
  if(a.length){r[L]=a;any=true;}
 });
 return any?r:null;
}
// Pulisce quello che arriva da Firebase (mai fidarsi dei dati: si tengono solo i campi previsti)
function vcNorm(raw){
 var out={cats:{},g:{},nw:[],at:0};
 if(!raw||typeof raw!=="object")return out;
 out.at=+raw.at||0;
 if(raw.cats&&typeof raw.cats==="object")Object.keys(raw.cats).forEach(function(c){if(raw.cats[c]===0)out.cats[c]=0;});
 if(raw.g&&typeof raw.g==="object")Object.keys(raw.g).forEach(function(k){
  var o=raw.g[k];if(!o||typeof o!=="object")return;
  var x={};
  if(o.vis===0||o.vis===1)x.vis=o.vis;
  var n=vcLang(o.name,80);if(n)x.name=n;
  var ru=vcLang(o.rules,3000);if(ru)x.rules=ru;
  var tp=vcLangE(o.tip,600);if(tp)x.tip=tp;
  var pl=vcStr(o.players,12);if(pl)x.players=pl;
  var tm=vcStr(o.time,20);if(tm)x.time=tm;
  var it=vcItems(o.items);if(it)x.items=it;
  var rd=vcRounds(o.rounds);if(rd)x.rounds=rd;
  if(!Object.keys(x).length)return; // niente di utile
  x.ed=+o.ed||0;
  out.g[k]=x;
 });
 if(raw.nw&&typeof raw.nw==="object")Object.keys(raw.nw).forEach(function(id){
  var o=raw.nw[id];if(!o||typeof o!=="object"||!/^[a-z0-9]{4,24}$/.test(id))return;
  var kind=o.kind==="domande"?"domande":"frasi";
  var x={id:id,cat:vcStr(o.cat,20),kind:kind,name:vcLang(o.name,80),rules:vcLang(o.rules,3000),tip:vcLang(o.tip,600),
   players:vcStr(o.players,12)||"2+",time:vcStr(o.time,20)||"15 min",vis:o.vis===0?0:1,ord:+o.ord||0,ed:+o.ed||0};
  if(kind==="frasi")x.items=vcItems(o.items);else x.rounds=vcRounds(o.rounds);
  if(!x.cat||!x.name||!(x.items||x.rounds))return;
  out.nw.push(x);
 });
 out.nw.sort(function(a,b){return a.ord-b.ord||(a.id<b.id?-1:1);});
 return out;
}
function vcHasAny(c){return !!c&&(Object.keys(c.cats).length>0||Object.keys(c.g).length>0||c.nw.length>0);}
// Testo nella lingua attiva (se manca, l'italiano)
function vcPick(o,L){if(!o)return "";return o[L]||o.it||o.en||o.es||"";}
function vcLangNow(){return (typeof LANG!=="undefined"&&VC_LANGS.indexOf(LANG)>=0)?LANG:"it";}
function vcTables(){return {it:(typeof GAMES!=="undefined"?GAMES:null),en:(typeof GAMES_EN!=="undefined"?GAMES_EN:null),es:(typeof GAMES_ES!=="undefined"?GAMES_ES:null)};}

// ── Anteprima dal pannello: index.html?vprev=CODICE mostra l'app come la vede quel locale ──
// (solo i giochi: statistiche, menu e accesso restano quelli normali del telefono)
(function(){
 try{
  var p=new URLSearchParams(window.location.search),v=p.get("vprev");
  if(v!==null){
   v=String(v).toLowerCase().replace(/[^a-z0-9_]/g,"").slice(0,40);
   if(v)sessionStorage.setItem("filos_vprev",v);else sessionStorage.removeItem("filos_vprev");
   p.delete("vprev");var q=p.toString();
   history.replaceState(null,"",window.location.pathname+(q?"?"+q:"")+window.location.hash);
  }
 }catch(e){}
})();
function vcPreview(){try{return sessionStorage.getItem("filos_vprev")||"";}catch(e){return "";}}
function vcPreviewExit(){try{sessionStorage.removeItem("filos_vprev");}catch(e){}VCFG.v=null;vcTick(true);if(typeof render==="function")render();}
// Locale di cui valgono le impostazioni
function vcVenue(){
 var p=vcPreview();if(p)return p;
 try{return (typeof filosVenue==="function"&&filosVenue())||"";}catch(e){return "";}
}

// ── Copia di partenza dei giochi (per poter tornare all'originale) ──
function vcSnapshot(){
 var t=vcTables();
 VC_LANGS.forEach(function(L){
  var T2=t[L];if(!T2)return;
  Object.keys(T2).forEach(function(c){
   (T2[c]||[]).forEach(function(g){
    if(!g||g._vnew||g._vb)return;
    g._vb={name:g.name,rules:g.rules,tip:g.tip,players:g.players,time:g.time,questions:g.questions};
   });
  });
 });
}
function vcRestore(){
 var t=vcTables();
 VC_LANGS.forEach(function(L){
  var T2=t[L];if(!T2)return;
  Object.keys(T2).forEach(function(c){
   var l=T2[c];if(!l)return;
   for(var i=l.length-1;i>=0;i--){
    var g=l[i];if(!g)continue;
    if(g._vnew){l.splice(i,1);continue;}
    if(g._vb){g.name=g._vb.name;g.rules=g._vb.rules;g.tip=g._vb.tip;g.players=g._vb.players;g.time=g._vb.time;g.questions=g._vb.questions;}
   }
  });
 });
 VCFG.nameMap={it:{},en:{},es:{}};
}
// Applica le impostazioni di un locale alle liste dei giochi (IT/EN/ES)
function vcApply(cfg){
 vcSnapshot();vcRestore();
 VCFG.cfg=vcHasAny(cfg)?cfg:null;
 if(!VCFG.cfg)return;
 var t=vcTables();
 VC_LANGS.forEach(function(L){
  var T2=t[L];if(!T2)return;
  Object.keys(T2).forEach(function(c){
   (T2[c]||[]).forEach(function(g){
    if(!g||g._vnew)return;
    var o=cfg.g[vcKey(c,g._it||g.name)];if(!o)return;
    if(o.name&&o.name[L]&&o.name[L]!==g.name){VCFG.nameMap[L][o.name[L]]=g.name;g.name=o.name[L];}
    if(o.rules&&o.rules[L])g.rules=o.rules[L];
    if(o.tip&&o.tip[L]!==undefined)g.tip=o.tip[L];
    if(o.players)g.players=o.players;
    if(o.time)g.time=o.time;
    if(o.rounds&&o.rounds[L]&&g.questions)g.questions=o.rounds[L];
   });
  });
  // Giochi creati solo per questo locale
  cfg.nw.forEach(function(n){
   if(!T2[n.cat])T2[n.cat]=[];
   var g={name:vcPick(n.name,L),players:n.players,time:n.time,rules:vcPick(n.rules,L),tip:vcPick(n.tip,L),_it:"V:"+n.id,_vnew:n.id,isnew:true};
   if(n.kind==="domande")g.questions=(n.rounds&&(n.rounds[L]||n.rounds.it))||[];
   T2[n.cat].push(g);
  });
 });
}
function vcNew(it){
 if(!VCFG.cfg||typeof it!=="string"||it.indexOf("V:")!==0)return null;
 var id=it.slice(2);
 for(var i=0;i<VCFG.cfg.nw.length;i++)if(VCFG.cfg.nw[i].id===id)return VCFG.cfg.nw[i];
 return null;
}
// Nome per le statistiche: per i giochi creati per il locale il nome italiano (non il codice interno)
function vcLogName(g){if(!g)return "";if(g._vnew){var n=vcNew(g._it);return (n&&vcPick(n.name,"it"))||g.name;}return g._it||g.name;}
function vcGameCfg(cat,it){return (VCFG.cfg&&VCFG.cfg.g[vcKey(cat,it)])||null;}
// Visibile di base (senza impostazioni del locale): i giochi in pausa no
function vcDefaultVisible(cat,g){
 if(!g)return false;
 if(g._vnew)return true;
 var k=g._it||g.name;
 var p=(typeof GIOCHI_IN_PAUSA!=="undefined")&&GIOCHI_IN_PAUSA[cat];
 if(p&&p.indexOf(k)>=0)return false;
 if(cat==="bambini"&&VC_BAMBINI_ORD.indexOf(k)<0)return false;
 return true;
}
function vcGameVisible(cat,g,def){
 if(g&&g._vnew){var n=vcNew(g._it);return !!n&&n.vis!==0;}
 var o=g?vcGameCfg(cat,g._it||g.name):null;
 if(o&&o.vis===0)return false;
 if(o&&o.vis===1)return true;
 return def;
}
function vcCatVisible(id){return !(VCFG.cfg&&VCFG.cfg.cats[id]===0);}
// Frasi/domande del locale per il gioco (null = quelle normali)
function vcItemsFor(cat,it){
 if(!VCFG.cfg||!it)return null;
 var L=vcLangNow();
 var n=vcNew(it);if(n)return n.kind==="frasi"&&n.items?(n.items[L]||n.items.it||null):null;
 var o=vcGameCfg(cat,it);
 return (o&&o.items&&o.items[L]&&o.items[L].length)?o.items[L]:null;
}
// Suffisso per la memoria delle frasi già viste quando il locale usa frasi sue
function vcDeckTag(cat,it){
 if(!VCFG.cfg||!it)return "";
 var n=vcNew(it);if(n)return "@"+VCFG.v+"_"+n.ed;
 var o=vcGameCfg(cat,it),L=vcLangNow();
 return (o&&o.items&&o.items[L])?"@"+VCFG.v+"_"+o.ed:"";
}

// ── Agganci alle funzioni dell'app ──
// Mazzo di frasi: prima quello del locale; con il nome cambiato si cerca il mazzo col nome originale
if(typeof spDeck==="function"){
 var _vcSpDeck0=spDeck;
 spDeck=function(name,itName){
  if(VCFG.cfg){
   var cat=(typeof S!=="undefined"&&S.cat)||"";
   var own=vcItemsFor(cat,itName||name);if(own)return own;
   if(vcNew(itName||name))return null;
   var m=VCFG.nameMap[vcLangNow()];if(m&&m[name])name=m[name];
  }
  return _vcSpDeck0(name,itName);
 };
}
// Mazzi 18+ con schermata propria (Confessioni, Ex, Chi sei davvero)
if(typeof adultiDeck==="function"){
 var _vcAdultiDeck0=adultiDeck;
 adultiDeck=function(){
  if(VCFG.cfg&&typeof curGame==="function"){var g=curGame();if(g){var own=vcItemsFor(S.cat,g._it||g.name);if(own)return own;}}
  return _vcAdultiDeck0();
 };
}
if(typeof adultiKey==="function"){
 var _vcAdultiKey0=adultiKey;
 adultiKey=function(){var k=_vcAdultiKey0();var g=(typeof curGame==="function")?curGame():null;return g?k+vcDeckTag(S.cat,g._it||g.name):k;};
}
// Regole nel foglio «Regole» in alto
if(typeof regoleNow==="function"){
 var _vcRegoleNow0=regoleNow;
 regoleNow=function(){
  var r=_vcRegoleNow0();
  if(!VCFG.cfg)return r;
  try{
   var L=vcLangNow(),k=(typeof REGOLE_SCREEN!=="undefined"&&REGOLE_SCREEN[S.screen])||"";
   var g=(typeof curGame==="function")?curGame():null;
   if(!k){if(!g||!S.cat)return r;k=S.cat+"|"+(g._it||g.name);}
   var n=vcNew(k.slice(k.indexOf("|")+1));
   if(n)return {key:k,rules:vcPick(n.rules,L),tip:vcPick(n.tip,L)};
   var o=VCFG.cfg.g[vcKeyRaw(k)];
   if(!o||(!o.rules&&!o.tip))return r;
   r=r||{key:k,rules:"",tip:""};
   return {key:k,rules:(o.rules&&o.rules[L])||r.rules,tip:(o.tip&&o.tip[L]!==undefined)?o.tip[L]:r.tip};
  }catch(e){return r;}
 };
}

// ── Lettura da Firebase (con copia sul telefono per partire subito) ──
function vcCacheGet(v){try{var x=JSON.parse(localStorage.getItem("filos_vcfg_"+v)||"null");return x?vcNorm(x):null;}catch(e){return null;}}
function vcCacheSet(v,raw){try{if(raw)localStorage.setItem("filos_vcfg_"+v,JSON.stringify(raw));else localStorage.removeItem("filos_vcfg_"+v);}catch(e){}}
// Si cambiano le liste solo fuori da una partita (mai mentre si gioca)
function vcSafeNow(){return typeof S==="undefined"||["onboarding","splash","home","games","terms"].indexOf(S.screen)>=0;}
function vcFetch(){
 var v=VCFG.v;
 if(!v||VCFG.fetching||typeof fbDB==="undefined"||!fbDB||!fbGet||!fbRef)return;
 VCFG.fetching=true;
 fbGet(fbRef(fbDB,"filos_cfg/"+v)).then(function(snap){
  VCFG.fetching=false;VCFG.fetchedAt=Date.now();
  if(window.VC_ADMIN)return;
  if(v!==VCFG.v){vcFetch();return;}
  var raw=snap&&snap.val?snap.val():null;
  vcCacheSet(v,raw);
  var cfg=vcNorm(raw);
  var cur=VCFG.cfg?JSON.stringify(VCFG.cfg):"",nxt=vcHasAny(cfg)?JSON.stringify(cfg):"";
  if(cur===nxt)return;
  VCFG.pending=cfg;
  if(vcSafeNow()){vcApply(VCFG.pending);VCFG.pending=null;if(typeof render==="function"&&typeof S!=="undefined"&&(S.screen==="home"||S.screen==="games"))render();}
 }).catch(function(){VCFG.fetching=false;VCFG.fetchedAt=Date.now();if(v!==VCFG.v)vcFetch();});
}
// Chiamata a ogni render: controlla se il locale è cambiato e applica le novità in sospeso
function vcTick(force){
 if(window.VC_ADMIN)return; // nel pannello Filòs le liste restano quelle originali
 try{vcPreviewBar();}catch(e){}
 var v=vcVenue();
 if(v!==VCFG.v){
  if(!force&&!vcSafeNow())return;
  VCFG.v=v;VCFG.pending=null;
  vcApply(v?vcCacheGet(v):null);
  if(v)vcFetch();
  return;
 }
 if(VCFG.pending&&vcSafeNow()){vcApply(VCFG.pending);VCFG.pending=null;}
}
function vcBoot(){vcTick(true);}
// Striscia in basso durante l'anteprima dal pannello
var VC_PREV_TXT={it:["Anteprima del locale","Esci"],en:["Venue preview","Exit"],es:["Vista previa del local","Salir"]};
function vcPreviewBar(){
 var p=vcPreview(),bar=document.getElementById("vc-prev");
 if(!p){if(bar)bar.remove();return;}
 var tx=VC_PREV_TXT[vcLangNow()];
 if(!bar){
  bar=document.createElement("div");bar.id="vc-prev";
  bar.style.cssText="position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:9000;display:flex;align-items:center;justify-content:space-between;gap:10px;background:#1a1d21;color:#fff;border-radius:14px;padding:10px 12px 10px 16px;font:600 14px/1.3 system-ui,-apple-system,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.25);max-width:520px;margin:0 auto;";
  var t=document.createElement("span");t.className="vc-prev-t";bar.appendChild(t);
  var b=document.createElement("button");b.type="button";b.className="vc-prev-x";
  b.style.cssText="border:0;border-radius:10px;background:#fff;color:#1a1d21;font:700 14px system-ui,sans-serif;padding:8px 14px;cursor:pointer;flex:none;";
  b.onclick=vcPreviewExit;bar.appendChild(b);
  document.body.appendChild(bar);
 }
 bar.querySelector(".vc-prev-t").textContent=tx[0]+": "+p;
 bar.querySelector(".vc-prev-x").textContent=tx[1];
}
// Tornando sull'app dopo un po' si ricontrolla (al massimo ogni 5 minuti)
document.addEventListener("visibilitychange",function(){
 try{if(document.visibilityState==="visible"&&VCFG.v&&Date.now()-VCFG.fetchedAt>300000)vcFetch();}catch(e){}
});
