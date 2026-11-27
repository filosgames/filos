/*!
 * Filòs — © 2026 i titolari del progetto Filòs. Tutti i diritti riservati.
 * Codice e contenuti sono opere protette dalla legge sul diritto d'autore (L. 633/1941).
 * È vietata qualsiasi copia, riproduzione, modifica o ridistribuzione senza autorizzazione scritta.
 */
// ══════════════════════════════════════════
// TOP 10 (Tra amici) — classifiche vere, con la fonte scritta sulla carta.
// Si gioca da soli, uno contro uno o a squadre: si prova a indovinare le voci della
// classifica, poi la si scopre tutta e si prende 1 punto per ogni voce indovinata.
// Schermate: t10_setup (giocatori/squadre) → t10_play (carta) → t10_rank (punteggi) → fine gioco.
// Ogni classifica: s = fonte, t = titolo, l = le 10 voci in ordine (una lista unica se uguale in tutte le lingue).
// Fonti verificate a novembre 2026.
// ══════════════════════════════════════════
var TOP10=[
{s:{it:"Kirin Holdings, dati 2024",en:"Kirin Holdings, 2024 data",es:"Kirin Holdings, datos de 2024"},
 t:{it:"I 10 paesi dove si beve più birra a testa",en:"The 10 countries that drink the most beer per person",es:"Los 10 países donde más cerveza se bebe por persona"},
 l:{it:["Repubblica Ceca","Lituania","Austria","Irlanda","Croazia","Estonia","Spagna","Slovenia","Romania","Germania"],
    en:["Czech Republic","Lithuania","Austria","Ireland","Croatia","Estonia","Spain","Slovenia","Romania","Germany"],
    es:["República Checa","Lituania","Austria","Irlanda","Croacia","Estonia","España","Eslovenia","Rumanía","Alemania"]}},
{s:{it:"World Happiness Report 2025",en:"World Happiness Report 2025",es:"World Happiness Report 2025"},
 t:{it:"I 10 paesi più felici del mondo",en:"The 10 happiest countries in the world",es:"Los 10 países más felices del mundo"},
 l:{it:["Finlandia","Danimarca","Islanda","Svezia","Paesi Bassi","Costa Rica","Norvegia","Israele","Lussemburgo","Messico"],
    en:["Finland","Denmark","Iceland","Sweden","Netherlands","Costa Rica","Norway","Israel","Luxembourg","Mexico"],
    es:["Finlandia","Dinamarca","Islandia","Suecia","Países Bajos","Costa Rica","Noruega","Israel","Luxemburgo","México"]}},
{s:{it:"Ethnologue, stime 2025",en:"Ethnologue, 2025 estimates",es:"Ethnologue, estimaciones de 2025"},
 t:{it:"Le 10 lingue più parlate al mondo (contando anche chi l'ha imparata)",en:"The 10 most spoken languages in the world (including people who learned them)",es:"Las 10 lenguas más habladas del mundo (contando también a quien las aprendió)"},
 l:{it:["Inglese","Cinese mandarino","Hindi","Spagnolo","Arabo","Francese","Bengalese","Portoghese","Russo","Indonesiano"],
    en:["English","Mandarin Chinese","Hindi","Spanish","Arabic","French","Bengali","Portuguese","Russian","Indonesian"],
    es:["Inglés","Chino mandarín","Hindi","Español","Árabe","Francés","Bengalí","Portugués","Ruso","Indonesio"]}},
{s:{it:"YouTube, visualizzazioni ad aprile 2025",en:"YouTube, views as of April 2025",es:"YouTube, reproducciones en abril de 2025"},
 t:{it:"I 10 video più visti di sempre su YouTube",en:"The 10 most viewed YouTube videos of all time",es:"Los 10 vídeos más vistos de la historia de YouTube"},
 l:["Baby Shark Dance (Pinkfong)","Despacito (Luis Fonsi)","Wheels on the Bus (Cocomelon)","Bath Song (Cocomelon)","Johny Johny Yes Papa (LooLoo Kids)","See You Again (Wiz Khalifa)","Shape of You (Ed Sheeran)","Phonics Song with Two Words (ChuChu TV)","Gangnam Style (Psy)","Uptown Funk (Mark Ronson)"]},
{s:{it:"Netflix, classifica ufficiale (visualizzazioni nei primi 91 giorni)",en:"Netflix, official ranking (views in the first 91 days)",es:"Netflix, clasificación oficial (visualizaciones en los primeros 91 días)"},
 t:{it:"Le 10 serie più viste di sempre su Netflix",en:"The 10 most watched series ever on Netflix",es:"Las 10 series más vistas de la historia de Netflix"},
 l:{it:["Mercoledì – stagione 1","Adolescence","Stranger Things – stagione 4","Stranger Things – stagione 5","I Will Find You","Mercoledì – stagione 2","Dahmer","Bridgerton – stagione 1","La regina degli scacchi","Bridgerton – stagione 3"],
    en:["Wednesday – season 1","Adolescence","Stranger Things – season 4","Stranger Things – season 5","I Will Find You","Wednesday – season 2","Dahmer","Bridgerton – season 1","The Queen's Gambit","Bridgerton – season 3"],
    es:["Miércoles – temporada 1","Adolescencia","Stranger Things – temporada 4","Stranger Things – temporada 5","I Will Find You","Miércoles – temporada 2","Dahmer","Los Bridgerton – temporada 1","Gambito de dama","Los Bridgerton – temporada 3"]}},
{s:{it:"Netflix, classifica ufficiale (visualizzazioni nei primi 91 giorni)",en:"Netflix, official ranking (views in the first 91 days)",es:"Netflix, clasificación oficial (visualizaciones en los primeros 91 días)"},
 t:{it:"I 10 film più visti di sempre su Netflix",en:"The 10 most watched films ever on Netflix",es:"Las 10 películas más vistas de la historia de Netflix"},
 l:{it:["KPop Demon Hunters","Red Notice","Carry-On","Don't Look Up","The Adam Project","Bird Box","Back in Action","Swapped","Il mondo dietro di te","War Machine"],
    en:["KPop Demon Hunters","Red Notice","Carry-On","Don't Look Up","The Adam Project","Bird Box","Back in Action","Swapped","Leave the World Behind","War Machine"],
    es:["KPop Demon Hunters","Alerta roja","Carry-On","No mires arriba","El proyecto Adam","A ciegas (Bird Box)","De vuelta a la acción","Swapped","Dejar el mundo atrás","War Machine"]}},
{s:{it:"Spotify Wrapped 2025",en:"Spotify Wrapped 2025",es:"Spotify Wrapped 2025"},
 t:{it:"I 10 artisti più ascoltati al mondo su Spotify nel 2025",en:"The 10 most streamed artists in the world on Spotify in 2025",es:"Los 10 artistas más escuchados del mundo en Spotify en 2025"},
 l:["Bad Bunny","Taylor Swift","The Weeknd","Drake","Billie Eilish","Kendrick Lamar","Bruno Mars","Ariana Grande","Arijit Singh","Fuerza Regida"]},
{s:{it:"Spotify Wrapped 2025",en:"Spotify Wrapped 2025",es:"Spotify Wrapped 2025"},
 t:{it:"Le 10 canzoni più ascoltate al mondo su Spotify nel 2025",en:"The 10 most streamed songs in the world on Spotify in 2025",es:"Las 10 canciones más escuchadas del mundo en Spotify en 2025"},
 l:["Die With A Smile (Lady Gaga, Bruno Mars)","Birds of a Feather (Billie Eilish)","APT. (Rosé, Bruno Mars)","Ordinary (Alex Warren)","DtMF (Bad Bunny)","Back to Friends (sombr)","Golden (KPop Demon Hunters)","Luther (Kendrick Lamar, SZA)","That's So True (Gracie Abrams)","Wildflower (Billie Eilish)"]},
{s:{it:"Uber Lost & Found Index 2025",en:"Uber Lost & Found Index 2025",es:"Uber Lost & Found Index 2025"},
 t:{it:"I 10 oggetti più dimenticati sulle auto Uber",en:"The 10 items most often left behind in Uber cars",es:"Los 10 objetos más olvidados en los coches de Uber"},
 l:{it:["Telefono","Portafoglio","Chiavi","Valigia","Cuffie","Occhiali","Vestiti","Passaporto","Sigaretta elettronica","Borraccia"],
    en:["Phone","Wallet","Keys","Luggage","Headphones","Glasses","Clothing","Passport","Vape","Water bottle"],
    es:["Móvil","Cartera","Llaves","Maleta","Auriculares","Gafas","Ropa","Pasaporte","Vapeador","Botella de agua"]}},
{s:{it:"ISTAT, residenti al 31 dicembre 2024",en:"ISTAT, residents at 31 December 2024",es:"ISTAT, residentes a 31 de diciembre de 2024"},
 t:{it:"Le 10 regioni italiane più popolose",en:"The 10 most populated regions of Italy",es:"Las 10 regiones italianas más pobladas"},
 l:{it:["Lombardia","Lazio","Campania","Veneto","Sicilia","Emilia-Romagna","Piemonte","Puglia","Toscana","Calabria"],
    en:["Lombardy","Lazio","Campania","Veneto","Sicily","Emilia-Romagna","Piedmont","Apulia","Tuscany","Calabria"],
    es:["Lombardía","Lacio","Campania","Véneto","Sicilia","Emilia-Romaña","Piamonte","Apulia","Toscana","Calabria"]}},
{s:{it:"ISTAT, dati 2025",en:"ISTAT, 2025 data",es:"ISTAT, datos de 2025"},
 t:{it:"Le 10 città italiane più popolose",en:"The 10 most populated cities in Italy",es:"Las 10 ciudades italianas más pobladas"},
 l:{it:["Roma","Milano","Napoli","Torino","Palermo","Genova","Bologna","Firenze","Bari","Catania"],
    en:["Rome","Milan","Naples","Turin","Palermo","Genoa","Bologna","Florence","Bari","Catania"],
    es:["Roma","Milán","Nápoles","Turín","Palermo","Génova","Bolonia","Florencia","Bari","Catania"]}},
{s:{it:"Osservatorio JobPricing, Salary Outlook 2026 (stipendi del 2025)",en:"JobPricing Observatory, Salary Outlook 2026 (2025 salaries)",es:"Observatorio JobPricing, Salary Outlook 2026 (sueldos de 2025)"},
 t:{it:"I 10 settori dove si guadagna di più in Italia (stipendio medio lordo)",en:"The 10 best-paid sectors in Italy (average gross salary)",es:"Los 10 sectores mejor pagados de Italia (sueldo medio bruto)"},
 l:{it:["Banche e servizi finanziari","Ingegneria","Telecomunicazioni","Farmaceutica e biotecnologie","Petrolio e gas","Assicurazioni","Informatica e software","Aeronautica","Chimica","Media, web ed editoria"],
    en:["Banking and financial services","Engineering","Telecommunications","Pharmaceuticals and biotech","Oil and gas","Insurance","IT and software","Aerospace","Chemicals","Media, web and publishing"],
    es:["Banca y servicios financieros","Ingeniería","Telecomunicaciones","Farmacéutica y biotecnología","Petróleo y gas","Seguros","Informática y software","Aeronáutica","Química","Medios, web y editorial"]}},
{s:{it:"ENCI, cani iscritti ai libri genealogici nel 2025",en:"ENCI (Italian Kennel Club), dogs registered in 2025",es:"ENCI (club canino italiano), perros inscritos en 2025"},
 t:{it:"Le 10 razze di cani più iscritte in Italia",en:"The 10 most registered dog breeds in Italy",es:"Las 10 razas de perro más inscritas en Italia"},
 l:{it:["Setter inglese","Pastore tedesco","Labrador retriever","Golden retriever","Boxer","Cane corso","Jack Russell terrier","American Staffordshire terrier","Rottweiler","Chihuahua"],
    en:["English Setter","German Shepherd","Labrador Retriever","Golden Retriever","Boxer","Cane Corso","Jack Russell Terrier","American Staffordshire Terrier","Rottweiler","Chihuahua"],
    es:["Setter inglés","Pastor alemán","Labrador retriever","Golden retriever","Bóxer","Cane corso","Jack Russell terrier","American Staffordshire terrier","Rottweiler","Chihuahua"]}},
{g:1,
 t:{it:"I 10 film più cercati su Google in Italia",en:"The 10 most searched films on Google in Italy",es:"Las 10 películas más buscadas en Google en Italia"},
 l:{it:["Conclave","Nosferatu","Anora","Follemente","Dragon Trainer","The Brutalist","Io sono la fine del mondo","Thunderbolts","Mickey 17","Superman"],
    en:["Conclave","Nosferatu","Anora","Follemente","How to Train Your Dragon","The Brutalist","Io sono la fine del mondo","Thunderbolts","Mickey 17","Superman"],
    es:["Cónclave","Nosferatu","Anora","Follemente","Cómo entrenar a tu dragón","The Brutalist","Io sono la fine del mondo","Thunderbolts","Mickey 17","Superman"]}},
{g:1,
 t:{it:"Le 10 serie TV più cercate su Google in Italia",en:"The 10 most searched TV series on Google in Italy",es:"Las 10 series más buscadas en Google en Italia"},
 l:{it:["Monster: la storia di Ed Gein","Squid Game","Adolescence","M. Il figlio del secolo","Il Gattopardo","Ginny & Georgia","L'estate nei tuoi occhi","Il mostro di Firenze","ACAB – La serie","Tutto quello che ho"],
    en:["Monster: The Ed Gein Story","Squid Game","Adolescence","M. Son of the Century","The Leopard","Ginny & Georgia","The Summer I Turned Pretty","The Monster of Florence","ACAB – The Series","Tutto quello che ho"],
    es:["Monstruo: La historia de Ed Gein","El juego del calamar","Adolescencia","M. El hijo del siglo","El Gatopardo","Ginny y Georgia","El verano en que me enamoré","El monstruo de Florencia","ACAB – La serie","Tutto quello che ho"]}},
{g:1,
 t:{it:"Le 10 persone più cercate su Google in Italia",en:"The 10 most searched people on Google in Italy",es:"Las 10 personas más buscadas en Google en Italia"},
 l:["Lucio Corsi","Olly","Lorenzo Musetti","Bianca Balti","Jasmine Paolini","Marcella Bella","Serena Brancale","Cecilia Sala","Achille Lauro","Brunori Sas"]},
{g:1,
 t:{it:"I 10 cantanti più cercati su Google in Italia",en:"The 10 most searched singers on Google in Italy",es:"Los 10 cantantes más buscados en Google en Italia"},
 l:["Lucio Corsi","Olly","Marcella Bella","Serena Brancale","Achille Lauro","Brunori Sas","Tony Effe","Gianni Bella","Joan Thiele","Massimo Ranieri"]}
];
var TOP10_GSRC={it:"Google, ricerche in Italia nel 2025",en:"Google, searches in Italy in 2025",es:"Google, búsquedas en Italia en 2025"};

// Altre risposte accettate (oltre ai nomi della classifica in italiano, inglese e spagnolo).
// Stesso ordine di TOP10; chiave = posizione nella classifica (0 = 1° posto).
var TOP10_A=[
 {0:["Cechia","Czechia","Chequia","Rep Ceca","Repubblica Ceca"],9:["Deutschland"]},
 {4:["Olanda","Holland","Holanda"]},
 {0:["Inglese"],1:["Cinese","Mandarino","Chinese","Mandarin","Chino","Mandarín"],6:["Bengali","Bangla"],9:["Bahasa"]},
 {0:["Baby Shark"],2:["Wheels on the bus"],4:["Johny Johny","Johnny Johnny Yes Papa","Johnny Johnny"],7:["Phonics Song"]},
 {0:["Wednesday","Mercoledi"],6:["Monster","Jeffrey Dahmer","Mostro","Monstruo"],7:["Bridgerton"],8:["Queen's Gambit","Regina degli scacchi"],9:["Bridgerton"]},
 {0:["Demon Hunters","K-Pop Demon Hunters","KPop"],4:["Adam Project"],5:["A ciegas"],8:["Mondo dietro di te"]},
 {2:["Weeknd","The Weekend"]},
 {2:["APT","Apateu"],4:["Debi tirar mas fotos","DTMF"]},
 {0:["Cellulare","Smartphone","Telefonino","Cell","Celular","Teléfono"],1:["Portafogli","Billetera"],2:["Chiave","Key","Llave"],3:["Bagaglio","Bagagli","Trolley","Suitcase","Equipaje"],4:["Auricolari","Cuffiette","AirPods","Earphones","Earbuds","Cascos"],5:["Occhiali da sole","Sunglasses","Lentes","Gafas de sol"],6:["Abiti","Vestito","Abbigliamento","Clothes","Ropa"],8:["Svapo","E-cig","Sigaretta elettronica","Vapeador","Cigarrillo electrónico"],9:["Bottiglia","Bottiglia d'acqua","Bottle","Botella","Cantimplora"]},
 {5:["Emilia","Emilia Romagna"],7:["Apulia"]},
 {},
 {0:["Banca","Banche","Finanza","Servizi finanziari","Banking","Finance","Banks","Finanzas","Bancos"],1:["Ingegneri","Engineers"],2:["Telecomunicazione","TLC","Telco","Telecom","Telecomunicación"],3:["Farmaceutica","Farmaceutico","Pharma","Farmaci","Biotecnologie","Biotech","Pharmaceutical","Farmacéutica"],4:["Petrolio","Gas","Oil","Petróleo","Petrolifero"],5:["Assicurazione","Assicurativo","Insurance","Seguro","Aseguradoras"],6:["Informatica","Software","IT","Tecnologia informatica","Informática"],7:["Aerospaziale","Aerospace","Aviazione","Aeronáutica","Aeroespacial"],8:["Chimico","Chemical","Chemistry","Químico"],9:["Media","Editoria","Web","Publishing","Medios","Editorial"]},
 {0:["Setter"],2:["Labrador"],3:["Golden"],6:["Jack Russell"],7:["Amstaff","American Staffordshire","Staffordshire"],8:["Rottweiler"],9:["Chiwawa","Chihuahua"]},
 {4:["Dragon trainer"]},
 {0:["Monster","Ed Gein","Monster Ed Gein"],3:["M il figlio del secolo","Il figlio del secolo","M"],4:["Gattopardo","Leopard"],5:["Ginny e Georgia","Ginny and Georgia","Ginny y Georgia"],6:["Estate nei tuoi occhi"],7:["Mostro di Firenze"],8:["ACAB"]},
 {0:["Corsi"],2:["Musetti"],3:["Balti"],4:["Paolini"],6:["Brancale"],7:["Sala"],8:["Lauro"],9:["Brunori"]},
 {0:["Corsi"],3:["Brancale"],4:["Lauro"],5:["Brunori"],8:["Thiele"],9:["Ranieri"]}
];

// Regole (stesso formato di data-regole.js)
if(typeof REGOLE!=="undefined")REGOLE["amici|TOP 10"]={
 f:"top10",p:"2+",
 it:["1. Formate le squadre (da 2 a 4) e scrivete i nomi.\n2. L'app mostra una classifica vera con la sua fonte: per esempio «Le 10 città italiane più popolose».\n3. La squadra di turno scrive una risposta e tocca «Rispondi».\n4. Se è in classifica, l'app dice in che posizione è: il 1° posto vale 2 punti, gli altri 1 punto. La squadra continua a rispondere.\n5. Se non è in classifica, la squadra perde 1 punto e tocca all'altra.\n6. Quando escono tutte e 10 le voci (o toccate «Mostra le mancanti») si passa alla classifica successiva.\nVince chi ha più punti alla fine.","Non serve scrivere in modo perfetto: l'app accetta piccoli errori, accenti mancanti e nomi in inglese o spagnolo."],
 en:["1. Make teams (2 to 4) and enter their names.\n2. The app shows a real ranking with its source: for example \"The 10 most populated cities in Italy\".\n3. The team whose turn it is types an answer and taps \"Answer\".\n4. If it's in the ranking, the app shows its position: 1st place is worth 2 points, the others 1 point. The team keeps answering.\n5. If it's not in the ranking, the team loses 1 point and the turn passes on.\n6. When all 10 items are found (or you tap \"Show the missing ones\") you move on to the next ranking.\nWhoever has the most points at the end wins.","No need to type perfectly: the app accepts small typos, missing accents and names in Italian or Spanish."],
 es:["1. Formad los equipos (de 2 a 4) y escribid sus nombres.\n2. La app muestra una clasificación real con su fuente: por ejemplo «Las 10 ciudades italianas más pobladas».\n3. El equipo al que le toca escribe una respuesta y toca «Responder».\n4. Si está en la clasificación, la app dice en qué puesto está: el 1.º vale 2 puntos, los demás 1 punto. El equipo sigue respondiendo.\n5. Si no está, el equipo pierde 1 punto y le toca al otro.\n6. Cuando salen los 10 puestos (o tocáis «Mostrar los que faltan») se pasa a la siguiente clasificación.\nGana quien tenga más puntos al final.","No hace falta escribir perfecto: la app acepta pequeños errores, tildes que faltan y nombres en italiano o inglés."]
};

var T10=null;
var T10_COL=["#FFBE00","#4F8EF7","#E5484D","#30A46C"];
function t10Strings(){
 if(typeof STRINGS==="undefined"||STRINGS.it.t10Answer)return;
 Object.assign(STRINGS.it,{t10Count:"Classifica {n} di {t}",t10Src:"Secondo {s}",t10Turn:"Tocca a: {n}",t10PH:"Scrivi la risposta",t10Answer:"Rispondi",t10Hit:"«{a}» è al {p}° posto! +{pt}",t10Miss:"«{a}» non è in classifica. −1. Tocca a {n}",t10Dup:"«{a}» è già stata indovinata. Prova un'altra risposta",t10Missing:"Mostra le mancanti",t10Complete:"Classifica completata!",t10Closed:"Ecco le voci mancanti",t10Next:"Prossima classifica",t10Scores:"Punteggi",t10Done:"Avete giocato tutte le classifiche!",t10Back:"Torna alla partita",t10End:"Fine gioco",t10Win:"Vince {n}!",t10Tie:"Parità tra {n}!",t10Pt1:"punto",t10PtN:"punti",t10Played:"Classifiche giocate: {n}",t10Pos:"{p}°"});
 Object.assign(STRINGS.en,{t10Count:"Ranking {n} of {t}",t10Src:"According to {s}",t10Turn:"Turn: {n}",t10PH:"Type your answer",t10Answer:"Answer",t10Hit:"\"{a}\" is number {p}! +{pt}",t10Miss:"\"{a}\" is not in the ranking. −1. {n}'s turn",t10Dup:"\"{a}\" has already been found. Try another answer",t10Missing:"Show the missing ones",t10Complete:"Ranking complete!",t10Closed:"Here are the missing ones",t10Next:"Next ranking",t10Scores:"Scores",t10Done:"You've played all the rankings!",t10Back:"Back to the game",t10End:"End game",t10Win:"{n} wins!",t10Tie:"Tie between {n}!",t10Pt1:"point",t10PtN:"points",t10Played:"Rankings played: {n}",t10Pos:"#{p}"});
 Object.assign(STRINGS.es,{t10Count:"Clasificación {n} de {t}",t10Src:"Según {s}",t10Turn:"Le toca a: {n}",t10PH:"Escribe la respuesta",t10Answer:"Responder",t10Hit:"¡«{a}» está en el puesto {p}! +{pt}",t10Miss:"«{a}» no está en la clasificación. −1. Le toca a {n}",t10Dup:"«{a}» ya se ha adivinado. Prueba otra respuesta",t10Missing:"Mostrar los que faltan",t10Complete:"¡Clasificación completada!",t10Closed:"Estos son los que faltaban",t10Next:"Siguiente clasificación",t10Scores:"Puntuaciones",t10Done:"¡Habéis jugado todas las clasificaciones!",t10Back:"Volver a la partida",t10End:"Fin del juego",t10Win:"¡Gana {n}!",t10Tie:"¡Empate entre {n}!",t10Pt1:"punto",t10PtN:"puntos",t10Played:"Clasificaciones jugadas: {n}",t10Pos:"{p}.º"});
}
function t10T(k,o){t10Strings();var s=T(k);o=o||{};for(var x in o)s=s.split("{"+x+"}").join(o[x]);return s;}
function t10L(){return (typeof LANG!=="undefined"&&(LANG==="en"||LANG==="es"))?LANG:"it";}
function t10Pts(n){return n+" "+(n===1||n===-1?t10T("t10Pt1"):t10T("t10PtN"));}
function t10Shuffle(){var a=TOP10.map(function(_,i){return i;});for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function t10Card(i){
 var c=TOP10[i],L=t10L();if(!c)return null;
 var l=Array.isArray(c.l)?c.l:(c.l[L]||c.l.it);
 var s=c.g?TOP10_GSRC[L]:(c.s[L]||c.s.it);
 return {src:s,title:c.t[L]||c.t.it,items:l};
}
// ── Confronto delle risposte ──
var T10_ART={il:1,lo:1,la:1,i:1,gli:1,le:1,l:1,un:1,uno:1,una:1,the:1,a:1,an:1,el:1,los:1,las:1};
function t10Norm(s){
 s=String(s||"").toLowerCase();
 try{s=s.normalize("NFD").replace(/[̀-ͯ]/g,"");}catch(e){}
 s=s.replace(/&/g," e ").replace(/[^a-z0-9]+/g," ").trim();
 var w=s.split(" ");while(w.length>1&&T10_ART[w[0]])w.shift();
 return w.join(" ");
}
function t10Lev(a,b){
 if(a===b)return 0;var m=a.length,n=b.length;if(!m)return n;if(!n)return m;
 var p=[],c,i,j;for(j=0;j<=n;j++)p[j]=j;
 for(i=1;i<=m;i++){c=[i];for(j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c;}
 return p[n];
}
function t10Close(inp,key){
 if(!key)return false;if(inp===key)return true;
 var n=Math.min(inp.length,key.length);var tol=n>=8?2:(n>=5?1:0);
 return tol>0&&t10Lev(inp,key)<=tol;
}
// Tutti i modi accettati per ogni posizione della classifica i
function t10Keys(ci){
 var c=TOP10[ci],out=[];
 for(var k=0;k<10;k++){
  var set={};
  function add(x){x=t10Norm(x);if(x)set[x]=1;}
  ["it","en","es"].forEach(function(L){
   var v=Array.isArray(c.l)?c.l[k]:c.l[L][k];add(v);
   var b=String(v).split(" (")[0];add(b);
   if(b.indexOf(" – ")>0)add(b.split(" – ")[0]);
  });
  ((TOP10_A[ci]||{})[k]||[]).forEach(add);
  out.push(Object.keys(set));
 }
 return out;
}
var T10_ALL=null;
function t10AllKeys(){
 if(T10_ALL)return T10_ALL;T10_ALL={};
 for(var i=0;i<TOP10.length;i++)t10Keys(i).forEach(function(ks){ks.forEach(function(x){T10_ALL[x]=1;});});
 return T10_ALL;
}
// Ritorna {k:posizione} oppure {dup:posizione} oppure null
function t10Match(ci,text,found){
 var inp=t10Norm(text);if(!inp)return null;
 var keys=t10Keys(ci),exact=[],near=[];
 for(var k=0;k<10;k++){
  if(keys[k].indexOf(inp)>=0)exact.push(k);
  else if(keys[k].some(function(x){return t10Close(inp,x);}))near.push(k);
 }
 // Una parola che è il nome esatto di una voce di un'altra classifica (es. «Irlanda» vs «Islanda») non vale come errore di battitura
 if(!exact.length&&near.length&&t10AllKeys()[inp])return null;
 var hits=exact.length?exact:near;if(!hits.length)return null;
 for(var i=0;i<hits.length;i++)if(found[hits[i]]===undefined)return {k:hits[i]};
 return {dup:hits[0]};
}
// ── Schermate ──
function t10Start(){
 if(!T10)T10={names:[]};
 S.screen="t10_setup";render();
}
function renderT10Setup(){
 clr();t10Strings();
 addBackArrow(goBackToGames);
 var wrap=div("mw-wrap");
 var ed=namesEditor({min:2,max:4,teams:true,get:function(){return T10.names;},set:function(v){T10.names=v;}});
 wrap.appendChild(ed.el);
 wrap.appendChild(nmStart(T("ui_inizia"),function(){
  T10.names=ed.names();T10.scores=T10.names.map(function(){return 0;});
  T10.order=t10Shuffle();T10.pos=0;T10.played=0;T10.starter=0;
  t10NewRound();S.screen="t10_play";render();
 }));
 document.getElementById("root").appendChild(wrap);
}
function t10NewRound(){T10.found={};T10.closed=false;T10.msg=null;T10.turn=T10.starter%T10.names.length;T10.draft="";}
function t10Submit(text){
 if(T10.closed)return;
 var ci=T10.order[T10.pos],c=t10Card(ci);
 var raw=String(text||"").trim();if(!raw)return;
 var r=t10Match(ci,raw,T10.found);
 if(r&&r.k!==undefined){
  var pt=r.k===0?2:1;T10.found[r.k]=T10.turn;T10.scores[T10.turn]+=pt;
  T10.msg={t:"hit",s:t10T("t10Hit",{a:c.items[r.k],p:r.k+1,pt:pt})};
  if(Object.keys(T10.found).length>=10){T10.closed=true;T10.msg={t:"hit",s:T10.msg.s+" — "+t10T("t10Complete")};}
 } else if(r&&r.dup!==undefined){
  T10.msg={t:"dup",s:t10T("t10Dup",{a:c.items[r.dup]})};
 } else {
  T10.scores[T10.turn]-=1;T10.turn=(T10.turn+1)%T10.names.length;
  T10.msg={t:"miss",s:t10T("t10Miss",{a:raw,n:T10.names[T10.turn]})};
 }
 T10.draft="";renderT10Play(true);
}
function renderT10Play(keepFocus){
 clr();t10Strings();
 if(!T10||!T10.order){t10Start();return;}
 addBackArrow(function(){S.screen="t10_setup";render();});
 var ci=T10.order[T10.pos],c=t10Card(ci);
 var wrap=div("sc-wrap t10-wrap");
 wrap.appendChild(div("t10-count",t10T("t10Count",{n:T10.pos+1,t:T10.order.length})));
 wrap.appendChild(div("t10-src",t10T("t10Src",{s:c.src})));
 wrap.appendChild(div("t10-title",c.title));
 // punteggi
 var sc=div("t10-teams");
 T10.names.forEach(function(n,i){
  var ch=div("t10-team"+(!T10.closed&&i===T10.turn?" on":""));
  var dot=document.createElement("span");dot.className="t10-dot";dot.style.background=T10_COL[i];ch.appendChild(dot);
  ch.appendChild(document.createTextNode(n+" "));
  var b=document.createElement("b");b.textContent=String(T10.scores[i]);ch.appendChild(b);
  sc.appendChild(ch);
 });
 wrap.appendChild(sc);
 if(!T10.closed){
  wrap.appendChild(div("t10-turn",t10T("t10Turn",{n:T10.names[T10.turn]})));
  var f=document.createElement("form");f.className="t10-form";f.setAttribute("autocomplete","off");
  var inp=document.createElement("input");inp.type="text";inp.className="t10-in";inp.placeholder=t10T("t10PH");
  inp.setAttribute("autocapitalize","words");inp.setAttribute("autocorrect","off");inp.setAttribute("spellcheck","false");inp.maxLength=60;
  inp.setAttribute("aria-label",t10T("t10PH"));inp.value=T10.draft||"";
  inp.oninput=function(){T10.draft=inp.value;};
  var go=document.createElement("button");go.type="submit";go.className="ebtn t10-go";go.textContent=t10T("t10Answer");
  f.appendChild(inp);f.appendChild(go);
  f.onsubmit=function(e){e.preventDefault();t10Submit(inp.value);};
  wrap.appendChild(f);
 }
 if(T10.msg){var m=div("t10-msg "+T10.msg.t,T10.msg.s);m.setAttribute("role","status");wrap.appendChild(m);}
 else if(T10.closed)wrap.appendChild(div("t10-msg dup",t10T("t10Closed")));
 // tabellone
 var ol=document.createElement("ol");ol.className="t10-list";
 c.items.forEach(function(it,k){
  var who=T10.found[k];
  var li=document.createElement("li");li.className="t10-item"+(who!==undefined?" hit":(T10.closed?" miss":" hid"));
  if(who!==undefined)li.style.boxShadow="inset 4px 0 0 "+T10_COL[who];
  var n=document.createElement("span");n.className="t10-n";n.textContent=String(k+1);
  if(k===0){n.title="2";}
  var tx=document.createElement("span");tx.className="t10-tx";tx.textContent=(who!==undefined||T10.closed)?it:"";
  li.appendChild(n);li.appendChild(tx);
  if(who!==undefined){var tg=document.createElement("span");tg.className="t10-who";tg.textContent=T10.names[who];tg.style.background=T10_COL[who];if(who===0)tg.style.color="#2F2B0E";li.appendChild(tg);}
  ol.appendChild(li);
 });
 wrap.appendChild(ol);
 var bt=div("sc-btns");
 var last=T10.pos>=T10.order.length-1;
 if(!T10.closed){
  bt.appendChild(btn("ebtn out",t10T("t10Missing"),function(){T10.closed=true;T10.msg=null;renderT10Play();}));
 } else {
  if(last)wrap.appendChild(div("t10-done",t10T("t10Done")));
  else bt.appendChild(btn("ebtn",t10T("t10Next"),function(){
   T10.played=Math.max(T10.played,T10.pos+1);T10.pos++;T10.starter++;t10NewRound();renderT10Play();window.scrollTo(0,0);
  }));
  bt.appendChild(btn(last?"ebtn":"ebtn out",t10T("t10Scores"),function(){T10.played=Math.max(T10.played,T10.pos+1);S.screen="t10_rank";render();window.scrollTo(0,0);}));
 }
 wrap.appendChild(bt);
 document.getElementById("root").appendChild(wrap);
 // Dopo una risposta la tastiera resta aperta (la scheda viene spostata dentro il riquadro del gioco, quindi si rimette il cursore subito dopo)
 if(keepFocus===true){var fo=function(){var el=document.querySelector(".t10-in");if(el&&document.activeElement!==el){try{el.focus({preventScroll:true});}catch(e){el.focus();}}};fo();setTimeout(fo,0);setTimeout(fo,60);}
}
function renderT10Rank(){
 clr();t10Strings();
 if(!T10||!T10.scores){t10Start();return;}
 addBackArrow(function(){S.screen="t10_play";render();});
 var wrap=div("sc-wrap");
 wrap.appendChild(div("sc-turn",t10T("t10Scores")));
 var idx=T10.names.map(function(_,i){return i;});
 idx.sort(function(a,b){return T10.scores[b]-T10.scores[a];});
 var best=T10.scores[idx[0]];var top=idx.filter(function(i){return T10.scores[i]===best;});
 var msg=top.length>1?t10T("t10Tie",{n:top.map(function(i){return T10.names[i];}).join(", ")}):t10T("t10Win",{n:T10.names[top[0]]});
 wrap.appendChild(div("sc-win",msg));
 wrap.appendChild(div("sc-turn-sub",t10T("t10Played",{n:T10.played})));
 var list=div("sc-list");
 idx.forEach(function(i,pos){
  var row=div("sc-row"+(top.indexOf(i)>=0?" on":""));
  row.appendChild(div("sc-name",(pos+1)+". "+T10.names[i]));
  row.appendChild(div("sc-val",t10Pts(T10.scores[i])));
  list.appendChild(row);
 });
 wrap.appendChild(list);
 var bt=div("sc-btns");
 bt.appendChild(btn("ebtn",t10T("t10End"),function(){var g=curGame()||{};T10=null;endGame(g.name||"");}));
 bt.appendChild(btn("ebtn out",t10T("t10Back"),function(){S.screen="t10_play";render();}));
 wrap.appendChild(bt);
 document.getElementById("root").appendChild(wrap);
}
