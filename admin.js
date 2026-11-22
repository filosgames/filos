/*!
 * Filòs — © 2026 i titolari del progetto Filòs. Tutti i diritti riservati.
 * Codice e contenuti sono opere protette dalla legge sul diritto d'autore (L. 633/1941).
 * È vietata qualsiasi copia, riproduzione, modifica o ridistribuzione senza autorizzazione scritta.
 */
// ══════════════════════════════════════════
// PANNELLO FILÒS (index.html#admin)
// Si entra con l'account Google; possono modificare solo gli account elencati in filos_super/{uid}
// (lo controllano le regole di Firebase). Per ogni locale si salvano solo le differenze
// in filos_cfg/{locale}: le legge l'app (data-venue.js) sui telefoni di quel locale.
// ══════════════════════════════════════════
(function(){
if(window.ADM_STARTED)return;window.ADM_STARTED=true;
window.VC_ADMIN=true;
try{if(typeof vcApply==="function")vcApply(null);}catch(e){}

var FB_VER="10.12.2";
var FB_CFG={apiKey:"AIzaSyCOvPyLIaj5hLwuxSnZiHRdXmku6iQB0c4",authDomain:"filos-app-aba91.firebaseapp.com",databaseURL:"https://filos-app-aba91-default-rtdb.europe-west1.firebasedatabase.app",projectId:"filos-app-aba91"};
var LANGS=["it","en","es"];

// ── Testi del pannello ──
var STR={
 it:{title:"Pannello Filòs",loginSub:"Entra con il tuo account Google per modificare i giochi dei singoli locali.",loginBtn:"Entra con Google",loading:"Caricamento…",
  loadErr:"Il pannello non si è caricato. Controlla la connessione e ricarica la pagina.",loginErr:"Accesso non riuscito. Riprova.",
  notSuper:"Questo account non è abilitato al pannello.",notSuperHow:"Per abilitarlo: console Firebase → Realtime Database → Dati. Sotto «filos_super» aggiungi una riga con questo codice come nome e true come valore. Poi ricarica la pagina.",
  uid:"Codice del tuo account",copy:"Copia",copied:"Copiato",logout:"Esci",signed:"Accesso: {e}",
  venues:"Locali",search:"Cerca un locale…",openCode:"Apri un locale con il suo codice",openBtn:"Apri",noVenues:"Nessun locale trovato.",
  ch1:"1 modifica",chN:"{n} modifiche",ch0:"Come tutti gli altri",back:"Indietro",
  who:"Le modifiche valgono solo sui telefoni di questo locale: il gestore e i clienti entrati dal tag. L'app le legge quando si apre.",
  preview:"Prova l'app di questo locale",reset:"Riporta il locale come tutti gli altri",resetQ:"Tutte le modifiche di questo locale verranno cancellate. Continuare?",
  catOn:"Categoria visibile",catOff:"Categoria nascosta",on:"Acceso",off:"Spento",
  bEdit:"Modificato",bNew:"Nuovo",bPause:"In pausa",
  newGame:"+ Nuovo gioco",saved:"Salvato",saveErr:"Non salvato: controlla la connessione o i permessi.",
  riddles:"Gli indovinelli non si modificano dal pannello: qui puoi solo nascondere la categoria.",
  editT:"Modifica gioco",newT:"Nuovo gioco",fName:"Nome",fPlayers:"Giocatori",fTime:"Durata",fRules:"Regole (una per riga)",fTip:"Consiglio (facoltativo)",
  fItems:"Frasi (una per riga)",fRounds:"Domande",fRLabel:"Titolo del gruppo",fRItems:"Domande del gruppo (una per riga)",addRound:"+ Aggiungi gruppo",delRound:"Togli gruppo",
  kind:"Tipo di gioco",kFrasi:"Frasi da leggere",kDomande:"Domande in gruppi",
  noContent:"Le frasi di questo gioco non si cambiano dal pannello, perché il gioco ha un funzionamento suo. Puoi cambiare nome, regole, giocatori e durata.",
  shared:"Uguale in tutte le lingue",langs:"Lingua dei testi",
  save:"Salva",cancel:"Annulla",restore:"Torna all'originale",restoreQ:"Il gioco tornerà come negli altri locali. Continuare?",
  del:"Elimina gioco",delQ:"Il gioco verrà eliminato da questo locale. Continuare?",
  warnLang:"Hai modificato {f} solo in {l}. Nelle altre lingue resterà il testo di prima.",saveAny:"Salva comunque",keepEd:"Torna a modificare",
  missing:"Manca ancora: {x}",others:"Salva anche in altri locali",othersN:"Anche in {n} altri locali",count:"{n} righe",
  fNameS:"il nome",fRulesS:"le regole",fTipS:"il consiglio",fItemsS:"le frasi",fRoundsS:"le domande",
  mName:"nome",mRules:"regole",mItems:"frasi",mRounds:"domande",mPlayers:"giocatori",mTime:"durata",
  original:"Originale",confirm:"Conferma",yes:"Sì",no:"No",and:"e",codeEx:"es. barcentrale"},
 en:{title:"Filòs panel",loginSub:"Sign in with your Google account to edit the games of each venue.",loginBtn:"Sign in with Google",loading:"Loading…",
  loadErr:"The panel didn't load. Check your connection and reload the page.",loginErr:"Sign-in failed. Try again.",
  notSuper:"This account can't use the panel.",notSuperHow:"To enable it: Firebase console → Realtime Database → Data. Under \"filos_super\" add a row with this code as the name and true as the value. Then reload the page.",
  uid:"Your account code",copy:"Copy",copied:"Copied",logout:"Sign out",signed:"Signed in: {e}",
  venues:"Venues",search:"Search a venue…",openCode:"Open a venue by its code",openBtn:"Open",noVenues:"No venues found.",
  ch1:"1 change",chN:"{n} changes",ch0:"Same as all the others",back:"Back",
  who:"Changes only apply to this venue's phones: the manager and customers who came in from the tag. The app reads them when it opens.",
  preview:"Try this venue's app",reset:"Make this venue like all the others",resetQ:"All this venue's changes will be deleted. Continue?",
  catOn:"Category visible",catOff:"Category hidden",on:"On",off:"Off",
  bEdit:"Edited",bNew:"New",bPause:"Paused",
  newGame:"+ New game",saved:"Saved",saveErr:"Not saved: check your connection or permissions.",
  riddles:"Riddles can't be edited from the panel: here you can only hide the category.",
  editT:"Edit game",newT:"New game",fName:"Name",fPlayers:"Players",fTime:"Duration",fRules:"Rules (one per line)",fTip:"Tip (optional)",
  fItems:"Phrases (one per line)",fRounds:"Questions",fRLabel:"Group title",fRItems:"Questions in the group (one per line)",addRound:"+ Add group",delRound:"Remove group",
  kind:"Game type",kFrasi:"Phrases to read",kDomande:"Questions in groups",
  noContent:"This game's phrases can't be changed from the panel, because the game works in its own way. You can change name, rules, players and duration.",
  shared:"Same in every language",langs:"Language of the texts",
  save:"Save",cancel:"Cancel",restore:"Back to the original",restoreQ:"The game will go back to how it is in the other venues. Continue?",
  del:"Delete game",delQ:"The game will be deleted from this venue. Continue?",
  warnLang:"You changed {f} only in {l}. The other languages will keep the previous text.",saveAny:"Save anyway",keepEd:"Keep editing",
  missing:"Still missing: {x}",others:"Also save in other venues",othersN:"Also in {n} other venues",count:"{n} lines",
  fNameS:"the name",fRulesS:"the rules",fTipS:"the tip",fItemsS:"the phrases",fRoundsS:"the questions",
  mName:"name",mRules:"rules",mItems:"phrases",mRounds:"questions",mPlayers:"players",mTime:"duration",
  original:"Original",confirm:"Confirm",yes:"Yes",no:"No",and:"and",codeEx:"e.g. barcentrale"},
 es:{title:"Panel de Filòs",loginSub:"Entra con tu cuenta de Google para modificar los juegos de cada local.",loginBtn:"Entrar con Google",loading:"Cargando…",
  loadErr:"El panel no se ha cargado. Revisa la conexión y recarga la página.",loginErr:"No se ha podido entrar. Inténtalo de nuevo.",
  notSuper:"Esta cuenta no está habilitada para el panel.",notSuperHow:"Para habilitarla: consola de Firebase → Realtime Database → Datos. Bajo «filos_super» añade una fila con este código como nombre y true como valor. Luego recarga la página.",
  uid:"Código de tu cuenta",copy:"Copiar",copied:"Copiado",logout:"Salir",signed:"Sesión: {e}",
  venues:"Locales",search:"Busca un local…",openCode:"Abre un local con su código",openBtn:"Abrir",noVenues:"No se ha encontrado ningún local.",
  ch1:"1 cambio",chN:"{n} cambios",ch0:"Igual que todos los demás",back:"Atrás",
  who:"Los cambios solo valen en los teléfonos de este local: el encargado y los clientes que han entrado desde la etiqueta. La app los lee al abrirse.",
  preview:"Prueba la app de este local",reset:"Dejar el local como todos los demás",resetQ:"Se borrarán todos los cambios de este local. ¿Continuar?",
  catOn:"Categoría visible",catOff:"Categoría oculta",on:"Activado",off:"Desactivado",
  bEdit:"Modificado",bNew:"Nuevo",bPause:"En pausa",
  newGame:"+ Nuevo juego",saved:"Guardado",saveErr:"No guardado: revisa la conexión o los permisos.",
  riddles:"Los acertijos no se modifican desde el panel: aquí solo puedes ocultar la categoría.",
  editT:"Modificar juego",newT:"Nuevo juego",fName:"Nombre",fPlayers:"Jugadores",fTime:"Duración",fRules:"Reglas (una por línea)",fTip:"Consejo (opcional)",
  fItems:"Frases (una por línea)",fRounds:"Preguntas",fRLabel:"Título del grupo",fRItems:"Preguntas del grupo (una por línea)",addRound:"+ Añadir grupo",delRound:"Quitar grupo",
  kind:"Tipo de juego",kFrasi:"Frases para leer",kDomande:"Preguntas en grupos",
  noContent:"Las frases de este juego no se cambian desde el panel, porque el juego funciona a su manera. Puedes cambiar nombre, reglas, jugadores y duración.",
  shared:"Igual en todos los idiomas",langs:"Idioma de los textos",
  save:"Guardar",cancel:"Cancelar",restore:"Volver al original",restoreQ:"El juego volverá a ser como en los demás locales. ¿Continuar?",
  del:"Eliminar juego",delQ:"El juego se eliminará de este local. ¿Continuar?",
  warnLang:"Has cambiado {f} solo en {l}. En los demás idiomas quedará el texto anterior.",saveAny:"Guardar igualmente",keepEd:"Seguir editando",
  missing:"Todavía falta: {x}",others:"Guardar también en otros locales",othersN:"También en otros {n} locales",count:"{n} líneas",
  fNameS:"el nombre",fRulesS:"las reglas",fTipS:"el consejo",fItemsS:"las frases",fRoundsS:"las preguntas",
  mName:"nombre",mRules:"reglas",mItems:"frases",mRounds:"preguntas",mPlayers:"jugadores",mTime:"duración",
  original:"Original",confirm:"Confirmar",yes:"Sí",no:"No",and:"y",codeEx:"p. ej. barcentrale"}
};
var LNAME={it:"IT",en:"EN",es:"ES"};
var A={lang:(typeof LANG!=="undefined"&&STR[LANG])?LANG:"it",fb:null,user:null,sup:false,screen:"boot",venues:[],q:"",v:null,cfg:null,ed:null,msg:"",busy:false};
function t(k,o){var s=(STR[A.lang]&&STR[A.lang][k])||STR.it[k]||k;if(o)Object.keys(o).forEach(function(x){s=s.split("{"+x+"}").join(o[x]);});return s;}

// ── Firebase (Auth + Database dal sito di Google; i test possono sostituirlo con window.ADM_FB) ──
function realFb(){
 var AU,D,auth,db,base="https://www.gstatic.com/firebasejs/"+FB_VER+"/";
 return {
  init:function(){
   return Promise.all([import(base+"firebase-app.js"),import(base+"firebase-auth.js"),import(base+"firebase-database.js")]).then(function(m){
    AU=m[1];D=m[2];
    var app=m[0].initializeApp(FB_CFG,"filos-admin");
    auth=AU.getAuth(app);db=D.getDatabase(app);
    return AU.getRedirectResult(auth).catch(function(){});
   });
  },
  onUser:function(cb){AU.onAuthStateChanged(auth,function(u){cb(u?{uid:u.uid,email:u.email||"",name:u.displayName||""}:null);});},
  signIn:function(){
   var pr=new AU.GoogleAuthProvider();pr.setCustomParameters({prompt:"select_account"});
   return AU.signInWithPopup(auth,pr).catch(function(e){
    var c=e&&e.code||"";
    if(c==="auth/popup-blocked"||c==="auth/operation-not-supported-in-this-environment")return AU.signInWithRedirect(auth,pr);
    if(c==="auth/popup-closed-by-user"||c==="auth/cancelled-popup-request")return null;
    throw e;
   });
  },
  signOut:function(){return AU.signOut(auth);},
  get:function(path){return D.get(D.ref(db,path)).then(function(s){return s.val();});},
  update:function(path,obj){return D.update(D.ref(db,path),obj);},
  shallow:function(path){
   return auth.currentUser.getIdToken().then(function(tk){return fetch(FB_CFG.databaseURL+"/"+path+".json?shallow=true&auth="+encodeURIComponent(tk));})
    .then(function(r){if(!r.ok)throw new Error("http "+r.status);return r.json();})
    .then(function(j){return j&&typeof j==="object"?Object.keys(j):[];});
  }
 };
}

// ── Stile (tutto dentro #adm, non tocca l'app) ──
var CSS='#adm{position:fixed;inset:0;z-index:10000;overflow:auto;-webkit-overflow-scrolling:touch;background:#f7f3e8;color:#1a1d21;font-family:var(--f-font,system-ui),system-ui,-apple-system,"Segoe UI",sans-serif;font-size:15px;line-height:1.4}'+
'#adm *{box-sizing:border-box}#adm .w{max-width:760px;margin:0 auto;padding:16px 16px 120px}'+
'#adm .top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px;flex-wrap:wrap}'+
'#adm h1{font-family:"Bowlby One",var(--f-font,system-ui),sans-serif!important;font-weight:400;font-size:26px;line-height:1.1;margin:0;letter-spacing:0}'+
'#adm h2{font-family:"Bowlby One",var(--f-font,system-ui),sans-serif!important;font-weight:400;font-size:20px;line-height:1.15;margin:0 0 4px;overflow-wrap:anywhere}'+
'#adm .lp{display:flex;gap:4px;background:#fff;border-radius:999px;padding:3px;box-shadow:0 0 0 1px rgba(26,29,33,.1)}'+
'#adm .lp button{border:0;background:transparent;border-radius:999px;padding:5px 10px;font-weight:700;font-size:13px;color:#1a1d21;cursor:pointer}#adm .lp button.on{background:#1a1d21;color:#fff}'+
'#adm .card{background:#fff;border-radius:16px;padding:16px;box-shadow:0 1px 2px rgba(0,0,0,.06),0 0 0 1px rgba(26,29,33,.06);margin-bottom:12px}'+
'#adm .muted{color:#5d6168;font-size:14px}#adm .small{font-size:13px}'+
'#adm .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:0;border-radius:12px;padding:11px 16px;font-weight:700;font-size:15px;cursor:pointer;background:#1a1d21;color:#fff;min-height:44px}'+
'#adm .btn.sec{background:#fff;color:#1a1d21;box-shadow:inset 0 0 0 1.5px rgba(26,29,33,.18)}#adm .btn.red{background:#fff;color:#b42318;box-shadow:inset 0 0 0 1.5px rgba(180,35,24,.35)}'+
'#adm .btn:disabled{opacity:.45;cursor:default}#adm .btn.sm{min-height:36px;padding:7px 12px;font-size:14px;border-radius:10px}'+
'#adm .row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}'+
'#adm input[type=text],#adm textarea,#adm select{width:100%;border:1.5px solid rgba(26,29,33,.18);border-radius:12px;padding:10px 12px;font-size:15px;background:#fff;color:#1a1d21}'+
'#adm textarea{min-height:110px;resize:vertical;line-height:1.45}#adm input:focus,#adm textarea:focus,#adm select:focus{outline:none;border-color:#1a1d21}'+
'#adm label.f{display:block;font-weight:700;font-size:14px;margin:14px 0 6px}#adm .hint{font-size:13px;color:#5d6168;margin-top:4px}'+
'#adm .vrow{display:flex;align-items:center;gap:12px;padding:12px 4px;border-top:1px solid rgba(26,29,33,.08);cursor:pointer}#adm .vrow:first-child{border-top:0}'+
'#adm .vlogo{width:40px;height:40px;border-radius:50%;background:#efe7cf;flex:none;display:flex;align-items:center;justify-content:center;font-weight:800;color:#5d6168;overflow:hidden}'+
'#adm .vlogo img{width:100%;height:100%;object-fit:cover}#adm .vtx{flex:1;min-width:0}#adm .vn{font-weight:700;overflow-wrap:anywhere}#adm .chev{color:#9a9ea5;font-size:22px}'+
'#adm .cat{padding:0;overflow:hidden}#adm .cath{display:flex;align-items:center;gap:10px;padding:14px 16px;cursor:pointer}#adm .cath .cn{flex:1;font-weight:800;letter-spacing:.3px}'+
'#adm .cath .cnt{font-size:13px;color:#5d6168}#adm .catb{padding:0 16px 14px}'+
'#adm .grow2{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid rgba(26,29,33,.08)}'+
'#adm .gname{flex:1;min-width:0;font-weight:600;overflow-wrap:anywhere;cursor:pointer}#adm .gname.offg{color:#9a9ea5;text-decoration:line-through}'+
'#adm .bdg{display:inline-block;font-size:11px;font-weight:800;letter-spacing:.3px;border-radius:999px;padding:2px 8px;margin-left:6px;vertical-align:2px;text-transform:uppercase}'+
'#adm .bdg.e{background:#e8eefc;color:#2346a0}#adm .bdg.n{background:#e3f4ea;color:#17663a}#adm .bdg.p{background:#f1ede2;color:#6b5d36}'+
'#adm .tg{border:0;border-radius:999px;padding:7px 12px;min-width:92px;font-weight:800;font-size:13px;cursor:pointer;flex:none}'+
'#adm .tg.on{background:#1f7a4a;color:#fff}#adm .tg.off{background:#e6e3da;color:#5d6168}'+
'#adm .tabs{display:flex;gap:6px;margin:4px 0 2px}#adm .tabs button{flex:1;border:0;border-radius:10px;padding:9px 0;font-weight:800;font-size:14px;background:#efe9d8;color:#1a1d21;cursor:pointer;position:relative}'+
'#adm .tabs button.on{background:#1a1d21;color:#fff}#adm .tabs button .dot{position:absolute;top:6px;right:8px;width:7px;height:7px;border-radius:50%;background:#e2583e}'+
'#adm .rnd{border:1.5px dashed rgba(26,29,33,.15);border-radius:14px;padding:12px;margin-top:10px}'+
'#adm .box{border-radius:12px;padding:12px 14px;margin-top:12px;font-size:14px}#adm .box.warn{background:#fff4e0;color:#7a4a00}#adm .box.err{background:#fde8e6;color:#8a1c12}#adm .box.info{background:#eef2f7;color:#2b3a4f}'+
'#adm-toast{position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom));transform:translateX(-50%);background:#1a1d21;color:#fff;border-radius:12px;padding:10px 16px;font:700 15px var(--f-font,system-ui),system-ui,sans-serif;z-index:10003;max-width:calc(100% - 32px);text-align:center}'+
'#adm-toast.bad{background:#b42318}#adm .ovl{position:fixed;inset:0;background:rgba(0,0,0,.35);z-index:10001;display:flex;align-items:center;justify-content:center;padding:16px}'+
'#adm .dlg{background:#fff;border-radius:16px;padding:18px;max-width:420px;width:100%;max-height:85vh;overflow:auto}#adm .dlg p{margin:0 0 14px}'+
'#adm .chk{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid rgba(26,29,33,.08)}#adm .chk input{width:20px;height:20px;flex:none}'+
'#adm .orig{font-size:13px;color:#5d6168;margin-top:4px;white-space:pre-wrap;overflow-wrap:anywhere}#adm .acts{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}'+
'#adm code{background:#f1ede2;border-radius:6px;padding:2px 6px;font-size:13px;overflow-wrap:anywhere}';

// ── Utilità ──
function h(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined&&txt!==null)e.textContent=txt;return e;}
function b(cls,txt,fn){var e=h("button",cls,txt);e.type="button";e.onclick=fn;return e;}
var ROOT=null;
// Il messaggio sta fuori da #adm, così non sparisce quando la schermata si ridisegna
function toast(msg,bad){var o=document.getElementById("adm-toast");if(o)o.remove();var e=h("div",bad?"bad":"",msg);e.id="adm-toast";e.setAttribute("role","status");document.body.appendChild(e);setTimeout(function(){if(e.parentNode)e.remove();},bad?4500:1800);}
function ask(msg,okTxt,onOk,danger){
 var ov=h("div","ovl"),d=h("div","dlg");ov.appendChild(d);d.appendChild(h("p","",msg));
 var r=h("div","acts");d.appendChild(r);
 r.appendChild(b("btn sec",t("no"),function(){ov.remove();}));
 r.appendChild(b("btn"+(danger?" red":""),okTxt||t("yes"),function(){ov.remove();onOk();}));
 ROOT.appendChild(ov);
}
function rid(n){var a="abcdefghijkmnpqrstuvwxyz23456789",s="";var x=new Uint8Array(n);crypto.getRandomValues(x);for(var i=0;i<n;i++)s+=a[x[i]%a.length];return s;}
function clean(v){return String(v||"").toLowerCase().replace(/[^a-z0-9_]/g,"").slice(0,40);}
function lines(s){return String(s||"").replace(/\r/g,"").split("\n").map(function(x){return x.trim();}).filter(Boolean);}
function arr(x){return typeof vcArr==="function"?vcArr(x):(Array.isArray(x)?x:[]);}

// ── Catalogo dei giochi (dalle liste originali dell'app) ──
function tables(){return {it:GAMES,en:(typeof GAMES_EN!=="undefined"?GAMES_EN:GAMES),es:(typeof GAMES_ES!=="undefined"?GAMES_ES:GAMES)};}
function bv(g,f){return g&&g._vb?g._vb[f]:(g?g[f]:undefined);}
// Gioco della lingua L collegato a quello italiano
function inLang(L,cat,it){
 var l=(tables()[L]||{})[cat]||[],hit=null;
 for(var i=0;i<l.length;i++){var g=l[i];if(g&&!g._vnew&&(g._it||g.name)===it){if(!g.hidden)return g;hit=hit||g;}}
 return hit;
}
function catalog(cat){
 return (GAMES[cat]||[]).filter(function(g){return g&&!g._vnew&&!g.hidden&&!g.quizzone;});
}
function baseDeck(L,cat,it){
 var g=inLang(L,cat,it);if(!g)return null;
 if(L!=="it"&&typeof STARTER_TR!=="undefined"&&STARTER_TR[L]&&STARTER_TR[L][it])return STARTER_TR[L][it];
 var p=L==="en"?(typeof STARTER_PACK_EN!=="undefined"?STARTER_PACK_EN:null):L==="es"?(typeof STARTER_PACK_ES!=="undefined"?STARTER_PACK_ES:null):STARTER_PACK;
 return (p&&p[bv(g,"name")])||null;
}
// Che contenuto si può cambiare: "rounds" (domande in gruppi), "items" (frasi) o niente
function contentKind(cat,g){
 var it=g._it||g.name;
 var q=bv(g,"questions");if(q&&q.length)return "rounds";
 var flags=(typeof GAME_LAUNCH_FLAGS!=="undefined"?GAME_LAUNCH_FLAGS:[]).some(function(f){return !!g[f];});
 if(g._adulti&&window.ADULTI_DECKS&&ADULTI_DECKS[g._adulti]&&ADULTI_DECKS[g._adulti].mode!=="starter"&&flags&&cat==="adulti")return "adeck";
 if(flags)return null;
 if((cat==="cultura"||g.lingua)&&typeof QUIZ_DATA!=="undefined"&&QUIZ_DATA[it])return null;
 return baseDeck("it",cat,it)?"items":null;
}
function baseOf(cat,itg){
 var it=itg._it||itg.name,kind=contentKind(cat,itg),o={kind:kind,name:{},rules:{},tip:{},items:{},rounds:{},players:String(bv(itg,"players")||""),time:String(bv(itg,"time")||"")};
 LANGS.forEach(function(L){
  var g=inLang(L,cat,it)||itg;
  o.name[L]=String(bv(g,"name")||"");o.rules[L]=String(bv(g,"rules")||"");o.tip[L]=String(bv(g,"tip")||"");
  if(kind==="items")o.items[L]=(baseDeck(L,cat,it)||[]).slice();
  if(kind==="adeck"){var a=ADULTI_DECKS[itg._adulti];o.items[L]=((a[L]||a.it).deck||[]).slice();}
  if(kind==="rounds")o.rounds[L]=(bv(g,"questions")||[]).map(function(r){return {label:String(r.label||""),items:arr(r.items).slice()};});
 });
 if(kind==="adeck")o.kind="items";
 return o;
}
function catName(id){try{var keep=LANG;LANG=A.lang;var n=getCatName(id);LANG=keep;return n;}catch(e){return id;}}

// ── Dati del locale ──
function cfgCount(raw){
 if(!raw||typeof raw!=="object")return 0;
 var n=0;if(raw.cats)n+=Object.keys(raw.cats).filter(function(k){return raw.cats[k]===0;}).length;
 if(raw.g)n+=Object.keys(raw.g).length;if(raw.nw)n+=Object.keys(raw.nw).length;return n;
}
function gcfg(cat,it){return (A.cfg&&A.cfg.g&&A.cfg.g[vcKey(cat,it)])||null;}
function writeVenue(v,obj){var o={};Object.keys(obj).forEach(function(k){o[k]=obj[k];});o.at=Date.now();return A.fb.update("filos_cfg/"+v,o);}
function reloadCfg(){return A.fb.get("filos_cfg/"+A.v.code).then(function(r){A.cfg=r||{};A.v.n=cfgCount(A.cfg);});}

// ── Schermate ──
function render(){
 if(!ROOT)return;
 var keepY=ROOT.scrollTop;
 ROOT.innerHTML="";
 var w=h("div","w");ROOT.appendChild(w);
 var top=h("div","top");w.appendChild(top);
 top.appendChild(h("h1","",t("title")));
 var lp=h("div","lp");LANGS.forEach(function(L){lp.appendChild(b(A.lang===L?"on":"",LNAME[L],function(){A.lang=L;render();}));});top.appendChild(lp);
 ({boot:sBoot,err:sErr,login:sLogin,nosup:sNoSup,list:sList,venue:sVenue,edit:sEdit})[A.screen](w);
 if(A.keepScroll){ROOT.scrollTop=keepY;A.keepScroll=false;}else ROOT.scrollTop=0;
}
function rerender(){A.keepScroll=true;render();}
function sBoot(w){w.appendChild(h("p","muted",t("loading")));}
function sErr(w){var c=h("div","card");c.appendChild(h("div","box err",t("loadErr")));w.appendChild(c);}
function sLogin(w){
 var c=h("div","card");w.appendChild(c);
 c.appendChild(h("p","",t("loginSub")));
 c.appendChild(b("btn",t("loginBtn"),function(){
  this.disabled=true;var me=this;
  A.fb.signIn().then(function(){me.disabled=false;}).catch(function(){me.disabled=false;toast(t("loginErr"),true);});
 }));
}
function sNoSup(w){
 var c=h("div","card");w.appendChild(c);
 c.appendChild(h("p","",t("notSuper")));
 c.appendChild(h("p","muted small",t("notSuperHow")));
 c.appendChild(h("label","f",t("uid")));
 var r=h("div","row");c.appendChild(r);r.appendChild(h("code","",A.user.uid));
 r.appendChild(b("btn sm sec",t("copy"),function(){var me=this;try{navigator.clipboard.writeText(A.user.uid).then(function(){me.textContent=t("copied");});}catch(e){}}));
 var a=h("div","acts");c.appendChild(a);a.appendChild(b("btn sec",t("logout"),function(){A.fb.signOut();}));
}
function userBar(w){
 var r=h("div","row muted small");r.style.marginBottom="12px";r.style.justifyContent="space-between";
 r.appendChild(h("span","",t("signed",{e:A.user.email||A.user.name||A.user.uid})));
 r.appendChild(b("btn sm sec",t("logout"),function(){A.fb.signOut();}));w.appendChild(r);
}
function sList(w){
 userBar(w);
 w.appendChild(h("h2","",t("venues")));
 var s=h("input");s.type="text";s.placeholder=t("search");s.value=A.q;s.style.margin="8px 0 12px";
 w.appendChild(s);
 var c=h("div","card");w.appendChild(c);
 function fill(){
  c.innerHTML="";var q=A.q.trim().toLowerCase();
  var l=A.venues.filter(function(v){return !q||v.code.indexOf(q)>=0||String(v.name||"").toLowerCase().indexOf(q)>=0;});
  if(!l.length){c.appendChild(h("p","muted",t("noVenues")));return;}
  l.forEach(function(v){
   var r=h("div","vrow");
   var lg=h("div","vlogo");if(v.logo&&/^data:image\//.test(v.logo)){var im=h("img");im.src=v.logo;im.alt="";lg.appendChild(im);}else lg.textContent=(v.name||v.code).charAt(0).toUpperCase();
   r.appendChild(lg);
   var tx=h("div","vtx");tx.appendChild(h("div","vn",v.name||v.code));
   tx.appendChild(h("div","muted small",v.code+" · "+(v.n?(v.n===1?t("ch1"):t("chN",{n:v.n})):t("ch0"))));
   r.appendChild(tx);r.appendChild(h("span","chev","›"));
   r.onclick=function(){openVenue(v);};
   c.appendChild(r);
  });
 }
 s.oninput=function(){A.q=s.value;fill();};
 fill();
 var c2=h("div","card");w.appendChild(c2);
 c2.appendChild(h("label","f",t("openCode")));c2.firstChild.style.marginTop="0";
 var r=h("div","row");c2.appendChild(r);
 var inp=h("input");inp.type="text";inp.placeholder=t("codeEx");inp.style.flex="1";inp.style.width="auto";r.appendChild(inp);
 r.appendChild(b("btn",t("openBtn"),function(){var code=clean(inp.value);if(!code)return;var v=A.venues.filter(function(x){return x.code===code;})[0]||{code:code,name:"",n:0};openVenue(v);}));
}
function openVenue(v){
 A.v=v;A.cfg=null;A.screen="venue";A.open={};render();
 reloadCfg().then(render).catch(function(){A.cfg={};toast(t("saveErr"),true);render();});
}
function sVenue(w){
 var v=A.v;
 var top=h("div","row");top.style.marginBottom="10px";
 top.appendChild(b("btn sm sec","‹ "+t("back"),function(){A.screen="list";render();}));w.appendChild(top);
 var c=h("div","card");w.appendChild(c);
 c.appendChild(h("h2","",v.name||v.code));
 c.appendChild(h("div","muted small",v.code+" · "+(v.n?(v.n===1?t("ch1"):t("chN",{n:v.n})):t("ch0"))));
 c.appendChild(h("div","box info",t("who")));
 var acts=h("div","acts");c.appendChild(acts);
 acts.appendChild(b("btn sec",t("preview"),function(){window.open(location.pathname+"?vprev="+encodeURIComponent(v.code),"_blank","noopener");}));
 if(v.n)acts.appendChild(b("btn red",t("reset"),function(){
  ask(t("resetQ"),t("confirm"),function(){
   A.fb.update("filos_cfg",(function(){var o={};o[v.code]=null;return o;})()).then(function(){A.cfg={};v.n=0;toast(t("saved"));render();}).catch(function(){toast(t("saveErr"),true);});
  },true);
 }));
 if(!A.cfg){w.appendChild(h("p","muted",t("loading")));return;}
 CATS.forEach(function(cat){w.appendChild(catCard(cat));});
}
function catCard(cat){
 var id=cat.id,hidden=!!(A.cfg.cats&&A.cfg.cats[id]===0);
 var c=h("div","card cat"),hd=h("div","cath");c.appendChild(hd);
 var open=!!A.open[id];
 hd.appendChild(h("span","chev",open?"⌄":"›"));
 hd.appendChild(h("span","cn",catName(id)));
 var tg=b("tg "+(hidden?"off":"on"),hidden?t("off"):t("on"),function(e){
  e.stopPropagation();var o={};o["cats/"+id]=hidden?null:0;
  saveAndReload(writeVenue(A.v.code,o));
 });
 tg.setAttribute("aria-label",hidden?t("catOff"):t("catOn"));
 hd.appendChild(tg);
 hd.onclick=function(){A.open[id]=!open;rerender();};
 if(!open)return c;
 var bd=h("div","catb");c.appendChild(bd);
 if(hidden)bd.appendChild(h("div","box warn",t("catOff")));
 if(id==="indovinelli"){bd.appendChild(h("div","box info",t("riddles")));return c;}
 // Prima i giochi che si vedono negli altri locali (in DOMANDE nell'ordine dell'app), poi quelli in pausa
 var gl=catalog(id),ord=id==="bambini"?VC_BAMBINI_ORD:[];
 gl=gl.map(function(g,i){var k=g._it||g.name,oi=ord.indexOf(k);return {g:g,s:(vcDefaultVisible(id,g)?0:1000)+(oi>=0?oi:100)+i/1000};}).sort(function(a,b2){return a.s-b2.s;}).map(function(x){return x.g;});
 gl.forEach(function(g){bd.appendChild(gameRow(id,g));});
 var nw=A.cfg.nw||{};
 Object.keys(nw).filter(function(k){return nw[k]&&nw[k].cat===id;}).sort(function(a,b2){return (+nw[a].ord||0)-(+nw[b2].ord||0);}).forEach(function(k){bd.appendChild(newRow(id,k,nw[k]));});
 var a=h("div","acts");bd.appendChild(a);
 a.appendChild(b("btn sm sec",t("newGame"),function(){openNew(id);}));
 return c;
}
function gameRow(cat,g){
 var it=g._it||g.name,o=gcfg(cat,it),def=vcDefaultVisible(cat,g);
 var vis=o&&o.vis===0?false:o&&o.vis===1?true:def;
 var r=h("div","grow2");
 var nm=h("div","gname"+(vis?"":" offg"));
 var shown=(o&&o.name&&o.name[A.lang])||String(bv(inLang(A.lang,cat,it)||g,"name")||it);
 nm.appendChild(document.createTextNode(shown));
 var edited=o&&Object.keys(o).some(function(k){return k!=="vis"&&k!=="ed";});
 if(edited)nm.appendChild(h("span","bdg e",t("bEdit")));
 if(!def)nm.appendChild(h("span","bdg p",t("bPause")));
 nm.onclick=function(){openEdit(cat,g);};
 r.appendChild(nm);
 r.appendChild(b("tg "+(vis?"on":"off"),vis?t("on"):t("off"),function(){
  var nv=!vis,o2={};
  // Si salva solo se è diverso da come è negli altri locali
  o2["g/"+vcKey(cat,it)+"/vis"]=(nv===def)?null:(nv?1:0);
  saveAndReload(writeVenue(A.v.code,o2));
 }));
 r.appendChild(b("btn sm sec","›",function(){openEdit(cat,g);}));
 return r;
}
function newRow(cat,id,n){
 var vis=n.vis!==0;
 var r=h("div","grow2");
 var nm=h("div","gname"+(vis?"":" offg"));
 nm.appendChild(document.createTextNode((n.name&&(n.name[A.lang]||n.name.it))||id));
 nm.appendChild(h("span","bdg n",t("bNew")));
 nm.onclick=function(){openNewEdit(cat,id,n);};
 r.appendChild(nm);
 r.appendChild(b("tg "+(vis?"on":"off"),vis?t("on"):t("off"),function(){var o={};o["nw/"+id+"/vis"]=vis?0:null;saveAndReload(writeVenue(A.v.code,o));}));
 r.appendChild(b("btn sm sec","›",function(){openNewEdit(cat,id,n);}));
 return r;
}
function saveAndReload(p){
 if(A.busy)return;A.busy=true;
 return p.then(function(){return reloadCfg();}).then(function(){A.busy=false;toast(t("saved"));rerender();})
  .catch(function(){A.busy=false;toast(t("saveErr"),true);reloadCfg().then(rerender).catch(function(){});});
}

// ── Editor ──
function openEdit(cat,g){
 var it=g._it||g.name,base=baseOf(cat,g),o=gcfg(cat,it)||{};
 var cur={name:{},rules:{},tip:{},items:{},rounds:{},players:o.players||base.players,time:o.time||base.time};
 LANGS.forEach(function(L){
  cur.name[L]=(o.name&&o.name[L])||base.name[L];
  cur.rules[L]=(o.rules&&o.rules[L])||base.rules[L];
  cur.tip[L]=(o.tip&&typeof o.tip[L]==="string")?o.tip[L]:base.tip[L];
  if(base.kind==="items")cur.items[L]=((o.items&&arr(o.items[L]).length)?arr(o.items[L]):base.items[L]).join("\n");
  if(base.kind==="rounds")cur.rounds[L]=((o.rounds&&arr(o.rounds[L]).length)?arr(o.rounds[L]).map(function(r){return {label:r.label||"",items:arr(r.items)};}):base.rounds[L]).map(function(r){return {label:r.label,items:r.items.join("\n")};});
 });
 A.ed={mode:"edit",cat:cat,it:it,base:base,kind:base.kind,cur:cur,tab:A.lang,others:[],had:!!gcfg(cat,it)};
 A.screen="edit";render();
}
function openNew(cat){
 var cur={name:{},rules:{},tip:{},items:{},rounds:{},players:"2+",time:"15 min"};
 LANGS.forEach(function(L){cur.name[L]="";cur.rules[L]="";cur.tip[L]="";cur.items[L]="";cur.rounds[L]=[{label:"",items:""}];});
 A.ed={mode:"new",cat:cat,id:rid(10),kind:"items",cur:cur,tab:A.lang,others:[],fresh:true};
 A.screen="edit";render();
}
function openNewEdit(cat,id,n){
 var cur={name:{},rules:{},tip:{},items:{},rounds:{},players:n.players||"2+",time:n.time||"15 min"};
 LANGS.forEach(function(L){
  cur.name[L]=(n.name&&n.name[L])||"";cur.rules[L]=(n.rules&&n.rules[L])||"";cur.tip[L]=(n.tip&&n.tip[L])||"";
  cur.items[L]=arr(n.items&&n.items[L]).join("\n");
  var rr=arr(n.rounds&&n.rounds[L]).map(function(r){return {label:r.label||"",items:arr(r.items).join("\n")};});
  cur.rounds[L]=rr.length?rr:[{label:"",items:""}];
 });
 A.ed={mode:"new",cat:cat,id:id,kind:n.kind==="domande"?"rounds":"items",cur:cur,tab:A.lang,others:[],ord:n.ord,vis:n.vis};
 A.screen="edit";render();
}
// Valori del modulo → oggetto pulito per lingua
function roundsVal(rs){return (rs||[]).map(function(r){return {label:String(r.label||"").trim(),items:lines(r.items)};}).filter(function(r){return r.items.length;});}
function same(a,b2){return JSON.stringify(a)===JSON.stringify(b2);}
function textOf(f,L,c){
 if(f==="items")return lines(c.items[L]);
 if(f==="rounds")return roundsVal(c.rounds[L]);
 return String(c[f][L]||"").replace(/\r/g,"").trim();
}
function baseText(f,L,bs){
 if(f==="items")return (bs.items[L]||[]).map(function(x){return String(x).trim();}).filter(Boolean);
 if(f==="rounds")return roundsVal((bs.rounds[L]||[]).map(function(r){return {label:r.label,items:r.items.join("\n")};}));
 return String(bs[f][L]||"").replace(/\r/g,"").trim();
}
function editFields(){var f=["name","rules","tip"];if(A.ed.kind==="items")f.push("items");if(A.ed.kind==="rounds")f.push("rounds");return f;}
function changedLangs(f){var e=A.ed;return LANGS.filter(function(L){return !same(textOf(f,L,e.cur),baseText(f,L,e.base));});}
function sEdit(w){
 var e=A.ed,c=e.cur;
 var top=h("div","row");top.style.marginBottom="10px";
 top.appendChild(b("btn sm sec","‹ "+t("back"),function(){A.screen="venue";render();}));w.appendChild(top);
 var card=h("div","card");w.appendChild(card);
 card.appendChild(h("div","muted small",(A.v.name||A.v.code)+" · "+catName(e.cat)));
 card.appendChild(h("h2","",e.mode==="new"?t("newT"):(c.name[A.lang]||e.it)));
 if(e.mode==="new"){
  card.appendChild(h("label","f",t("kind")));
  var sel=h("select");[["items",t("kFrasi")],["rounds",t("kDomande")]].forEach(function(x){var op=h("option","",x[1]);op.value=x[0];if(e.kind===x[0])op.selected=true;sel.appendChild(op);});
  sel.disabled=!e.fresh;sel.onchange=function(){e.kind=sel.value;rerender();};card.appendChild(sel);
 }
 // Campi uguali in tutte le lingue
 var r2=h("div","row");r2.style.alignItems="flex-start";card.appendChild(r2);
 [["players","fPlayers",12],["time","fTime",20]].forEach(function(x){
  var col=h("div","");col.style.flex="1";col.style.minWidth="140px";r2.appendChild(col);
  col.appendChild(h("label","f",t(x[1])));
  var i=h("input");i.type="text";i.maxLength=x[2];i.value=c[x[0]];i.oninput=function(){c[x[0]]=i.value;};col.appendChild(i);
  if(e.base&&e.base[x[0]]!==undefined)col.appendChild(h("div","hint",t("original")+": "+e.base[x[0]]));
 });
 card.appendChild(h("div","hint",t("shared")));
 // Testi per lingua
 card.appendChild(h("label","f",t("langs")));
 var tabs=h("div","tabs");card.appendChild(tabs);
 LANGS.forEach(function(L){
  var tb=b(e.tab===L?"on":"",LNAME[L],function(){e.tab=L;rerender();});
  if(e.mode==="edit"&&editFields().some(function(f){return changedLangs(f).indexOf(L)>=0;}))tb.appendChild(h("span","dot"));
  tabs.appendChild(tb);
 });
 var L=e.tab;
 function fld(f,label,big,max){
  card.appendChild(h("label","f",t(label)));
  var i=big?h("textarea"):h("input");if(!big)i.type="text";if(max)i.maxLength=max;
  i.value=c[f][L]||"";i.oninput=function(){c[f][L]=i.value;};
  card.appendChild(i);
  if(e.base&&!same(textOf(f,L,c),baseText(f,L,e.base))&&e.base[f][L])card.appendChild(h("div","orig",t("original")+": "+e.base[f][L]));
 }
 fld("name","fName",false,80);
 fld("rules","fRules",true,3000);
 fld("tip","fTip",false,600);
 if(e.kind==="items"){
  card.appendChild(h("label","f",t("fItems")));
  var ta=h("textarea");ta.style.minHeight="220px";ta.value=c.items[L]||"";card.appendChild(ta);
  var cn=h("div","hint",t("count",{n:lines(ta.value).length}));
  ta.oninput=function(){c.items[L]=ta.value;cn.textContent=t("count",{n:lines(ta.value).length});};card.appendChild(cn);
 } else if(e.kind==="rounds"){
  card.appendChild(h("label","f",t("fRounds")));
  (c.rounds[L]||[]).forEach(function(rd,ix){
   var bx=h("div","rnd");card.appendChild(bx);
   bx.appendChild(h("label","f",t("fRLabel")));bx.lastChild.style.marginTop="0";
   var li=h("input");li.type="text";li.maxLength=80;li.value=rd.label||"";li.oninput=function(){rd.label=li.value;};bx.appendChild(li);
   bx.appendChild(h("label","f",t("fRItems")));
   var ri=h("textarea");ri.value=rd.items||"";bx.appendChild(ri);
   var cn2=h("div","hint",t("count",{n:lines(ri.value).length}));ri.oninput=function(){rd.items=ri.value;cn2.textContent=t("count",{n:lines(ri.value).length});};bx.appendChild(cn2);
   if(c.rounds[L].length>1){var del=b("btn sm red",t("delRound"),function(){c.rounds[L].splice(ix,1);rerender();});del.style.marginTop="8px";bx.appendChild(del);}
  });
  var add=b("btn sm sec",t("addRound"),function(){c.rounds[L].push({label:"",items:""});rerender();});add.style.marginTop="10px";card.appendChild(add);
 } else {
  card.appendChild(h("div","box info",t("noContent")));
 }
 // Altri locali
 var others=A.venues.filter(function(v){return v.code!==A.v.code;});
 if(others.length){
  var ob=b("btn sm sec",e.others.length?t("othersN",{n:e.others.length}):t("others"),function(){pickOthers(others);});ob.style.marginTop="16px";card.appendChild(ob);
 }
 var msg=h("div","");card.appendChild(msg);e.msgEl=msg;
 var acts=h("div","acts");card.appendChild(acts);
 acts.appendChild(b("btn",t("save"),function(){trySave(false);}));
 acts.appendChild(b("btn sec",t("cancel"),function(){A.screen="venue";render();}));
 if(e.mode==="edit"&&e.had)acts.appendChild(b("btn red",t("restore"),function(){
  ask(t("restoreQ"),t("confirm"),function(){
   var k="g/"+vcKey(e.cat,e.it),o0=gcfg(e.cat,e.it)||{},o={};
   o[k]=(o0.vis===0||o0.vis===1)?{vis:o0.vis}:null;
   saveAndBack(writeVenue(A.v.code,o));
  },true);
 }));
 if(e.mode==="new"&&!e.fresh)acts.appendChild(b("btn red",t("del"),function(){
  ask(t("delQ"),t("confirm"),function(){var o={};o["nw/"+e.id]=null;saveAndBack(writeVenue(A.v.code,o));},true);
 }));
}
function pickOthers(list){
 var e=A.ed,sel=e.others.slice();
 var ov=h("div","ovl"),d=h("div","dlg");ov.appendChild(d);
 d.appendChild(h("h2","",t("others")));
 list.forEach(function(v){
  var r=h("label","chk");var cb=h("input");cb.type="checkbox";cb.checked=sel.indexOf(v.code)>=0;
  cb.onchange=function(){var i=sel.indexOf(v.code);if(cb.checked&&i<0)sel.push(v.code);if(!cb.checked&&i>=0)sel.splice(i,1);};
  r.appendChild(cb);r.appendChild(h("span","",(v.name||v.code)+" · "+v.code));d.appendChild(r);
 });
 var a=h("div","acts");d.appendChild(a);
 a.appendChild(b("btn sec",t("cancel"),function(){ov.remove();}));
 a.appendChild(b("btn",t("confirm"),function(){e.others=sel;ov.remove();rerender();}));
 ROOT.appendChild(ov);
}
function showMsg(cls,txt,btns){
 var m=A.ed.msgEl;if(!m)return;m.innerHTML="";var bx=h("div","box "+cls,txt);m.appendChild(bx);
 if(btns){var a=h("div","acts");btns.forEach(function(x){a.appendChild(x);});bx.appendChild(a);}
 bx.scrollIntoView({block:"center",behavior:"smooth"});
}
var FNAMES={name:"fNameS",rules:"fRulesS",tip:"fTipS",items:"fItemsS",rounds:"fRoundsS"};
function trySave(force){
 var e=A.ed,c=e.cur;
 if(e.mode==="new"){
  var miss=[];
  if(!String(c.players).trim())miss.push(t("mPlayers"));
  if(!String(c.time).trim())miss.push(t("mTime"));
  LANGS.forEach(function(L){
   if(!textOf("name",L,c))miss.push(t("mName")+" ("+LNAME[L]+")");
   if(!textOf("rules",L,c))miss.push(t("mRules")+" ("+LNAME[L]+")");
   if(e.kind==="items"&&!textOf("items",L,c).length)miss.push(t("mItems")+" ("+LNAME[L]+")");
   if(e.kind==="rounds"&&!textOf("rounds",L,c).length)miss.push(t("mRounds")+" ("+LNAME[L]+")");
  });
  if(miss.length){showMsg("err",t("missing",{x:miss.join(", ")}));return;}
  var n={cat:e.cat,kind:e.kind==="rounds"?"domande":"frasi",name:{},rules:{},tip:{},players:String(c.players).trim().slice(0,12),time:String(c.time).trim().slice(0,20),ord:e.ord||Date.now(),ed:Date.now()};
  if(e.vis===0)n.vis=0;
  LANGS.forEach(function(L){n.name[L]=textOf("name",L,c);n.rules[L]=textOf("rules",L,c);n.tip[L]=textOf("tip",L,c);});
  if(e.kind==="items"){n.items={};LANGS.forEach(function(L){n.items[L]=textOf("items",L,c);});}
  else{n.rounds={};LANGS.forEach(function(L){n.rounds[L]=textOf("rounds",L,c);});}
  var all=[A.v.code].concat(e.others);
  saveAndBack(Promise.all(all.map(function(v){var o={};o["nw/"+e.id]=n;return writeVenue(v,o);})));
  return;
 }
 // Gioco esistente: si salvano solo le differenze dall'originale
 if(!force){
  var partial=[];
  editFields().forEach(function(f){var ch=changedLangs(f);if(ch.length&&ch.length<3)partial.push([f,ch]);});
  if(partial.length){
   // Un solo avviso per gruppo di lingue: «Hai modificato il nome e le frasi solo in IT.»
   var grp={},gOrd=[];
   partial.forEach(function(p){var l=p[1].map(function(x){return LNAME[x];}).join(", ");if(!grp[l]){grp[l]=[];gOrd.push(l);}grp[l].push(t(FNAMES[p[0]]));});
   var txt=gOrd.map(function(l){var f=grp[l];var fs=f.length>1?f.slice(0,-1).join(", ")+" "+t("and")+" "+f[f.length-1]:f[0];return t("warnLang",{f:fs,l:l});}).join(" ");
   showMsg("warn",txt,[b("btn sm",t("saveAny"),function(){trySave(true);}),b("btn sm sec",t("keepEd"),function(){A.ed.msgEl.innerHTML="";})]);
   return;
  }
 }
 if(!String(c.players).trim()||!String(c.time).trim()){showMsg("err",t("missing",{x:(!String(c.players).trim()?t("mPlayers"):t("mTime"))}));return;}
 var diff={};
 editFields().forEach(function(f){
  LANGS.forEach(function(L){
   var v=textOf(f,L,c);
   if(same(v,baseText(f,L,e.base)))return;
   if((f==="name"||f==="rules")&&!v)return; // nome e regole non si lasciano vuoti
   if((f==="items"||f==="rounds")&&!v.length)return;
   diff[f]=diff[f]||{};diff[f][L]=v;
  });
 });
 var pl=String(c.players).trim().slice(0,12),tm=String(c.time).trim().slice(0,20);
 if(pl!==e.base.players)diff.players=pl;
 if(tm!==e.base.time)diff.time=tm;
 var any=Object.keys(diff).length>0;
 if(any)diff.ed=Date.now();
 var key="g/"+vcKey(e.cat,e.it);
 var all=[A.v.code].concat(e.others);
 saveAndBack(Promise.all(all.map(function(v){
  // La scelta acceso/spento resta quella di ciascun locale
  return A.fb.get("filos_cfg/"+v+"/"+key+"/vis").then(function(vis){
   var obj=any?JSON.parse(JSON.stringify(diff)):null;
   if(vis===0||vis===1){obj=obj||{};obj.vis=vis;}
   var o={};o[key]=obj;return writeVenue(v,o);
  });
 })));
}
function saveAndBack(p){
 if(A.busy)return;A.busy=true;
 var others=(A.ed&&A.ed.others)||[];
 p.then(function(){return reloadCfg();}).then(function(){
  A.busy=false;
  others.forEach(function(code){A.venues.forEach(function(v){if(v.code===code)v.n=Math.max(v.n||0,1);});});
  toast(t("saved"));A.screen="venue";render();
 }).catch(function(){A.busy=false;toast(t("saveErr"),true);});
}

// ── Avvio ──
function loadVenues(){
 return Promise.all(["filos_pub","nfc_h","filos_cfg"].map(function(p){return A.fb.shallow(p).catch(function(){return [];});})).then(function(r){
  var codes={};r.forEach(function(l){l.forEach(function(k){var c=clean(k);if(c)codes[c]=1;});});
  var list=Object.keys(codes).sort();
  return Promise.all(list.map(function(code){
   return Promise.all([A.fb.get("filos_pub/"+code+"/p/name").catch(function(){return "";}),A.fb.get("filos_pub/"+code+"/p/logo").catch(function(){return "";}),A.fb.get("filos_cfg/"+code).catch(function(){return null;})])
    .then(function(x){return {code:code,name:typeof x[0]==="string"?x[0]:"",logo:typeof x[1]==="string"?x[1]:"",n:cfgCount(x[2])};});
  }));
 }).then(function(l){
  l.sort(function(a,b2){return String(a.name||a.code).localeCompare(String(b2.name||b2.code));});
  A.venues=l;
 });
}
function onUser(u){
 A.user=u;
 if(!u){A.sup=false;A.screen="login";render();return;}
 A.screen="boot";render();
 A.fb.get("filos_super/"+u.uid).then(function(x){return x===true;}).catch(function(){return false;}).then(function(ok){
  if(A.user!==u)return;
  A.sup=ok;
  if(!ok){A.screen="nosup";render();return;}
  return loadVenues().then(function(){A.screen="list";render();});
 }).catch(function(){A.screen="err";render();});
}
function start(){
 var st=document.createElement("style");st.textContent=CSS;document.head.appendChild(st);
 ROOT=document.createElement("div");ROOT.id="adm";document.body.appendChild(ROOT);
 var app=document.getElementById("app");if(app)app.style.display="none";
 document.title=t("title");
 render();
 A.fb=window.ADM_FB||realFb();
 A.fb.init().then(function(){A.fb.onUser(onUser);}).catch(function(){A.screen="err";render();});
}
window.ADM=A;
start();
})();
