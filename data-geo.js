/*!
 * Filòs — © 2026 i titolari del progetto Filòs. Tutti i diritti riservati.
 * Codice e contenuti sono opere protette dalla legge sul diritto d'autore (L. 633/1941).
 * È vietata qualsiasi copia, riproduzione, modifica o ridistribuzione senza autorizzazione scritta.
 */
// ══════════════════════════════════════════
// SOLO DENTRO IL LOCALE (posizione)
// Il gestore salva il centro del locale dal pannello (filos_pub/{locale}/p/geo = {lat,lng,r}).
// I telefoni entrati dal tag di quel locale giocano solo entro il raggio (100 m).
// - Senza permesso per la posizione: non si gioca (messaggio con le istruzioni).
// - Posizione imprecisa: si lascia giocare; si blocca solo chi è di sicuro fuori.
// - Si ricontrolla ogni 3 minuti e quando si torna sull'app.
// Il telefono del gestore non viene mai bloccato.
// ══════════════════════════════════════════
var GEO_R=100,GEO_EVERY=180000,GEO_MAX_SAVE_ACC=150,GEO_WAIT=20000;
var GEO={v:"",status:"",at:0,dist:0,acc:0,busy:false,gen:0};
function geoStrings(){
 if(typeof STRINGS==="undefined"||STRINGS.it.geoFarTitle)return;
 Object.assign(STRINGS.it,{geoChecking:"Controllo che tu sia nel locale…",geoFarTitle:"Sei troppo lontano",geoFarText:"Filòs qui funziona solo dentro il locale (entro {r} metri). Ora risulti a circa {d}. Torna al locale e tocca Riprova.",geoDeniedTitle:"Serve la posizione",geoDeniedText:"Per giocare in questo locale Filòs deve sapere che sei qui. Attiva la posizione per questo sito nelle impostazioni del browser, poi tocca Riprova.",geoRetry:"Riprova",geoSection:"Posizione del locale",geoInfo:"Con la posizione salvata, i clienti entrati dai tag giocano solo entro {r} metri dal locale. Mettiti al centro del locale e tocca il pulsante.",geoUseHere:"Usa la mia posizione attuale",geoSaved:"Posizione salvata (precisione ±{a} m)",geoActive:"Attivo: solo entro {r} metri dal locale",geoOff:"Non attivo: si può giocare ovunque",geoRemove:"Togli il controllo posizione",geoRemoved:"Controllo posizione tolto",geoBadAcc:"Posizione troppo imprecisa (±{a} m). Avvicinati a una finestra o all'ingresso e riprova.",geoNoPerm:"Permesso per la posizione negato: attivalo per questo sito nelle impostazioni del browser.",geoNoGps:"Questo telefono non riesce a dare la posizione. Riprova tra poco.",geoSaving:"Un attimo…",geoSaveErr:"Non salvato: controlla la connessione e riprova."});
 Object.assign(STRINGS.en,{geoChecking:"Checking that you're at the venue…",geoFarTitle:"You're too far away",geoFarText:"Here Filòs only works inside the venue (within {r} metres). You seem to be about {d} away. Go back to the venue and tap Try again.",geoDeniedTitle:"Location needed",geoDeniedText:"To play at this venue, Filòs needs to know you're here. Turn on location for this site in your browser settings, then tap Try again.",geoRetry:"Try again",geoSection:"Venue location",geoInfo:"With the location saved, customers who came in from the tags can only play within {r} metres of the venue. Stand in the middle of the venue and tap the button.",geoUseHere:"Use my current location",geoSaved:"Location saved (accuracy ±{a} m)",geoActive:"On: only within {r} metres of the venue",geoOff:"Off: people can play anywhere",geoRemove:"Remove the location check",geoRemoved:"Location check removed",geoBadAcc:"Location too inaccurate (±{a} m). Move near a window or the entrance and try again.",geoNoPerm:"Location permission denied: turn it on for this site in your browser settings.",geoNoGps:"This phone can't get a location. Try again in a moment.",geoSaving:"One moment…",geoSaveErr:"Not saved: check the connection and try again."});
 Object.assign(STRINGS.es,{geoChecking:"Comprobando que estás en el local…",geoFarTitle:"Estás demasiado lejos",geoFarText:"Aquí Filòs solo funciona dentro del local (a menos de {r} metros). Ahora pareces estar a unos {d}. Vuelve al local y toca Reintentar.",geoDeniedTitle:"Hace falta la ubicación",geoDeniedText:"Para jugar en este local, Filòs tiene que saber que estás aquí. Activa la ubicación para este sitio en los ajustes del navegador y luego toca Reintentar.",geoRetry:"Reintentar",geoSection:"Ubicación del local",geoInfo:"Con la ubicación guardada, los clientes que entran por las tarjetas solo juegan a menos de {r} metros del local. Ponte en el centro del local y toca el botón.",geoUseHere:"Usar mi ubicación actual",geoSaved:"Ubicación guardada (precisión ±{a} m)",geoActive:"Activo: solo a menos de {r} metros del local",geoOff:"Desactivado: se puede jugar en cualquier sitio",geoRemove:"Quitar el control de ubicación",geoRemoved:"Control de ubicación quitado",geoBadAcc:"Ubicación demasiado imprecisa (±{a} m). Acércate a una ventana o a la entrada y vuelve a intentarlo.",geoNoPerm:"Permiso de ubicación denegado: actívalo para este sitio en los ajustes del navegador.",geoNoGps:"Este móvil no consigue la ubicación. Inténtalo de nuevo en un momento.",geoSaving:"Un momento…",geoSaveErr:"No guardado: comprueba la conexión y vuelve a intentarlo."});
}
function geoT(k,o){geoStrings();var s=T(k);o=o||{};for(var x in o)s=s.split("{"+x+"}").join(o[x]);return s;}
function geoFmt(m){var loc=LANG==="en"?"en-US":LANG==="es"?"es-ES":"it-IT";if(m>=1000)return (Math.round(m/100)/10).toLocaleString(loc)+" km";return Math.round(m/10)*10+(LANG==="en"?" metres":LANG==="es"?" metros":" metri");}
function geoDist(a,b,c,d){var R=6371000,r=Math.PI/180;var dl=(c-a)*r,dg=(d-b)*r;var h=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a*r)*Math.cos(c*r)*Math.sin(dg/2)*Math.sin(dg/2);return 2*R*Math.asin(Math.min(1,Math.sqrt(h)));}
// Il centro del locale per questo telefono (solo clienti entrati dal tag, mai il gestore)
function geoVenue(){
 try{
  if(typeof nfcIsOwnerDevice==="function"&&nfcIsOwnerDevice())return null;
  var v=(typeof filosVenue==="function")?filosVenue():"";if(!v)return null;
  var p=(typeof pubProfileCached==="function")?pubProfileCached(v):null;var g=p&&p.geo;
  if(!g||typeof g.lat!=="number"||typeof g.lng!=="number"||!isFinite(g.lat)||!isFinite(g.lng))return null;
  return {v:v,lat:g.lat,lng:g.lng,r:(+g.r>0?+g.r:GEO_R)};
 }catch(e){return null;}
}
function geoGateNeeded(){
 var c=geoVenue();if(!c)return false;
 if(GEO.v!==c.v){GEO.v=c.v;GEO.status="checking";GEO.at=0;geoCheck();return true;}
 if(Date.now()-GEO.at>GEO_EVERY&&!GEO.busy)geoCheck();
 return GEO.status==="checking"||GEO.status==="far"||GEO.status==="denied";
}
function geoCheck(fresh){
 var c=geoVenue();if(!c||GEO.busy)return;
 if(!navigator.geolocation){GEO.status="unavail";GEO.at=Date.now();return;}
 GEO.busy=true;var fin=false;var my=++GEO.gen;
 var before=geoGateNeededNow();
 function done(){if(fin||my!==GEO.gen)return;fin=true;clearTimeout(wd);GEO.busy=false;GEO.at=Date.now();if(geoGateNeededNow()!==before||GEO.status==="far"||document.querySelector(".geo-gate")){if(typeof render==="function")render();}}
 // Se la richiesta del permesso resta senza risposta, si spiega cosa fare invece di aspettare per sempre
 var wd=setTimeout(function(){if(fin||my!==GEO.gen)return;GEO.status="denied";done();},GEO_WAIT);
 try{
  if(navigator.permissions&&navigator.permissions.query){navigator.permissions.query({name:"geolocation"}).then(function(r){if(r&&r.state==="denied"&&!fin&&my===GEO.gen){GEO.status="denied";done();}}).catch(function(){});}
  navigator.geolocation.getCurrentPosition(function(pos){if(fin||my!==GEO.gen)return;
   var lat=pos.coords.latitude,lng=pos.coords.longitude,acc=+pos.coords.accuracy||0;
   var d=geoDist(c.lat,c.lng,lat,lng);GEO.dist=Math.round(d);GEO.acc=Math.round(acc);
   // Si blocca solo se, anche contando l'errore del GPS, si è di sicuro fuori dal raggio
   GEO.status=(d-acc>c.r)?"far":"ok";
   done();
  },function(err){
   if(fin||my!==GEO.gen)return;
   // Permesso negato: non si gioca. Posizione non disponibile o troppo lenta: si lascia giocare e si riprova dopo
   GEO.status=(err&&err.code===1)?"denied":"unavail";
   done();
  },{enableHighAccuracy:true,timeout:15000,maximumAge:fresh?0:30000});
 }catch(e){GEO.status="unavail";done();}
}
function geoGateNeededNow(){return !!geoVenue()&&(GEO.status==="checking"||GEO.status==="far"||GEO.status==="denied");}
// Si ricontrolla ogni tanto e quando si torna sull'app
setInterval(function(){try{if(document.visibilityState==="visible"&&geoVenue()&&Date.now()-GEO.at>GEO_EVERY)geoCheck();}catch(e){}},30000);
document.addEventListener("visibilitychange",function(){try{if(document.visibilityState==="visible"&&geoVenue()&&Date.now()-GEO.at>60000)geoCheck();}catch(e){}});
function renderGeoGate(){
 try{if(typeof stopAllTimers==="function")stopAllTimers();}catch(e){}
 clr();geoStrings();
 var c=geoVenue()||{r:GEO_R};
 var root=document.getElementById("root");
 var wrap=div("geo-gate");
 var icon=div("geo-icon");
 icon.innerHTML='<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';
 wrap.appendChild(icon);
 if(GEO.status==="checking"||GEO.busy&&GEO.status!=="far"&&GEO.status!=="denied"){
  wrap.appendChild(div("geo-title",geoT("geoChecking")));
 } else if(GEO.status==="denied"){
  wrap.appendChild(div("geo-title",geoT("geoDeniedTitle")));
  wrap.appendChild(div("geo-text",geoT("geoDeniedText")));
 } else {
  wrap.appendChild(div("geo-title",geoT("geoFarTitle")));
  wrap.appendChild(div("geo-text",geoT("geoFarText",{r:c.r,d:geoFmt(GEO.dist)})));
 }
 if(GEO.status!=="checking"){
  var b=document.createElement("button");b.className="ebtn";b.textContent=geoT("geoRetry");
  b.onclick=function(){GEO.status="checking";GEO.busy=false;geoCheck(true);render();};
  wrap.appendChild(b);
 }
 root.appendChild(wrap);
}
// Pannello del gestore (Profilo): salva il centro del locale
function geoPanelSection(section,pubCode){
 geoStrings();
 var v=(typeof nfcCleanVenue==="function")?nfcCleanVenue(pubCode):"";
 var box=div("");box.style.cssText="padding:12px 16px;display:flex;flex-direction:column;gap:8px;";
 var cur=(v&&typeof pubProfileCached==="function")?pubProfileCached(v):null;var g=cur&&cur.geo;
 var on=!!(g&&isFinite(g.lat));
 var st=div("",on?geoT("geoActive",{r:(+g.r||GEO_R)}):geoT("geoOff"));st.style.cssText="font-size:13px;font-weight:700;color:"+(on?"#34c759":"#8e8e93")+";";box.appendChild(st);
 var inf=div("",geoT("geoInfo",{r:GEO_R}));inf.style.cssText="font-size:13px;color:#636366;line-height:1.5;";box.appendChild(inf);
 var msg=div("");msg.style.cssText="font-size:13px;font-weight:600;min-height:18px;";
 if(!v){var np=div("",T("pubNeedCode"));np.style.cssText="font-size:13px;color:#ff9f0a;font-weight:600;";box.appendChild(np);section(geoT("geoSection"),[box]);return;}
 var b=document.createElement("button");b.className="as-btn as-btn-primary";b.style.margin="4px 0 0";b.textContent=geoT("geoUseHere");
 b.onclick=function(){
  if(!navigator.geolocation){msg.style.color="#ff3b30";msg.textContent=geoT("geoNoGps");return;}
  b.disabled=true;msg.style.color="#636366";msg.textContent=geoT("geoSaving");
  navigator.geolocation.getCurrentPosition(function(pos){
   var acc=Math.round(+pos.coords.accuracy||0);
   if(acc>GEO_MAX_SAVE_ACC){b.disabled=false;msg.style.color="#ff3b30";msg.textContent=geoT("geoBadAcc",{a:acc});return;}
   var geo={lat:Math.round(pos.coords.latitude*1e6)/1e6,lng:Math.round(pos.coords.longitude*1e6)/1e6,r:GEO_R};
   pubProfileSave(v,{geo:geo},function(ok){
    b.disabled=false;
    if(!ok){msg.style.color="#ff3b30";msg.textContent=geoT("geoSaveErr");return;}
    st.textContent=geoT("geoActive",{r:GEO_R});st.style.color="#34c759";
    msg.style.color="#34c759";msg.textContent=geoT("geoSaved",{a:acc});rm.style.display="";
   });
  },function(err){b.disabled=false;msg.style.color="#ff3b30";msg.textContent=(err&&err.code===1)?geoT("geoNoPerm"):geoT("geoNoGps");},{enableHighAccuracy:true,timeout:20000,maximumAge:0});
 };
 box.appendChild(b);
 var rm=document.createElement("button");rm.style.cssText="margin-top:4px;padding:8px 14px;border-radius:8px;background:transparent;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;width:fit-content;border:1.5px solid #ff3b30;color:#ff3b30;";
 rm.textContent=geoT("geoRemove");if(!on)rm.style.display="none";
 rm.onclick=function(){
  rm.disabled=true;
  pubProfileSave(v,{geo:null},function(ok){
   rm.disabled=false;
   if(!ok){msg.style.color="#ff3b30";msg.textContent=geoT("geoSaveErr");return;}
   st.textContent=geoT("geoOff");st.style.color="#8e8e93";msg.style.color="#636366";msg.textContent=geoT("geoRemoved");rm.style.display="none";
  });
 };
 box.appendChild(rm);box.appendChild(msg);
 section(geoT("geoSection"),[box]);
}
