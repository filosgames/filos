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
{s:{it:"Unicode Consortium, dati 2021",en:"Unicode Consortium, 2021 data",es:"Unicode Consortium, datos de 2021"},
 t:{it:"Le 10 emoji più usate al mondo",en:"The 10 most used emoji in the world",es:"Los 10 emojis más usados del mundo"},
 l:{it:["😂 Faccina con lacrime di gioia","❤️ Cuore rosso","🤣 Faccina che si rotola dal ridere","👍 Pollice in su","😭 Faccina che piange forte","🙏 Mani giunte","😘 Faccina che manda un bacio","🥰 Faccina sorridente con cuori","😍 Faccina con occhi a cuore","😊 Faccina con occhi sorridenti"],
    en:["😂 Face with tears of joy","❤️ Red heart","🤣 Rolling on the floor laughing","👍 Thumbs up","😭 Loudly crying face","🙏 Folded hands","😘 Face blowing a kiss","🥰 Smiling face with hearts","😍 Smiling face with heart-eyes","😊 Smiling face with smiling eyes"],
    es:["😂 Cara llorando de risa","❤️ Corazón rojo","🤣 Cara revolviéndose de risa","👍 Pulgar hacia arriba","😭 Cara llorando fuerte","🙏 Manos juntas","😘 Cara lanzando un beso","🥰 Cara sonriendo con corazones","😍 Cara sonriendo con ojos de corazón","😊 Cara feliz con ojos sonrientes"]}},
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
 t:{it:"Le 10 ricette più cercate su Google in Italia",en:"The 10 most searched recipes on Google in Italy",es:"Las 10 recetas más buscadas en Google en Italia"},
 l:{it:["Casatiello napoletano","Colomba pasquale","Uova alla Jova","Chiacchiere","Crumbl cookies","Biscotti di Squid Game","Biscotti di Pasqua","Torta pasqualina","Castagnole","Salame di cioccolato"],
    en:["Neapolitan casatiello (Easter bread)","Colomba (Easter cake)","Uova alla Jova (Jovanotti's eggs)","Chiacchiere (carnival fritters)","Crumbl cookies","Squid Game cookies","Easter biscuits","Torta pasqualina (Easter savoury pie)","Castagnole (carnival doughnuts)","Chocolate salami"],
    es:["Casatiello napolitano (pan de Pascua)","Colomba (bizcocho de Pascua)","Uova alla Jova (huevos de Jovanotti)","Chiacchiere (dulces de carnaval)","Crumbl cookies","Galletas de El juego del calamar","Galletas de Pascua","Torta pasqualina (pastel salado de Pascua)","Castagnole (buñuelos de carnaval)","Salami de chocolate"]}},
{g:1,
 t:{it:"Le 10 domande «Come si fa…?» più cercate su Google in Italia",en:"The 10 most searched \"How do you…?\" questions on Google in Italy",es:"Las 10 preguntas «¿Cómo se hace…?» más buscadas en Google en Italia"},
 l:{it:["Il porridge","La tanatoprassi","Il vacuum addominale","Lo screenshot sul pc","L'action figure","Il caffè freddo","Il dry brushing","Il casatiello napoletano","La zuppa di cozze","La colonscopia"],
    en:["Make porridge","Do thanatopraxy (embalming)","Do a stomach vacuum","Take a screenshot on a PC","Make the action figure","Make iced coffee","Do dry brushing","Make Neapolitan casatiello","Make mussel soup","Have a colonoscopy"],
    es:["El porridge","La tanatopraxia","El vacío abdominal","Una captura de pantalla en el PC","La action figure","El café frío","El cepillado en seco","El casatiello napolitano","La sopa de mejillones","La colonoscopia"]}},
{g:1,
 t:{it:"Le 10 domande «Come vestirsi…?» più cercate su Google in Italia",en:"The 10 most searched \"What to wear…?\" questions on Google in Italy",es:"Las 10 preguntas «¿Cómo vestirse…?» más buscadas en Google en Italia"},
 l:{it:["A Pasqua","A una prima comunione","Per un matrimonio","A Carnevale","Per andare sulla neve","In primavera","A Londra a marzo","A un funerale","A 50 anni per sembrare più giovani","Per la MOC (esame delle ossa)"],
    en:["At Easter","To a first communion","To a wedding","At Carnival","To go to the snow","In spring","In London in March","To a funeral","At 50 to look younger","For a bone density scan"],
    es:["En Pascua","En una primera comunión","Para una boda","En Carnaval","Para ir a la nieve","En primavera","En Londres en marzo","En un funeral","A los 50 para parecer más joven","Para una densitometría ósea"]}},
{g:1,
 t:{it:"Le 10 domande «Cosa significa…?» più cercate su Google in Italia",en:"The 10 most searched \"What does … mean?\" questions on Google in Italy",es:"Las 10 preguntas «¿Qué significa…?» más buscadas en Google en Italia"},
 l:{it:["Parafilia","Separazione delle carriere","Ipovedente","Agostiniano","ACAB","«Si na pret»","Cubiculario","Amarcord","Bed rotting","Dazi Trump"],
    en:["Parafilia (paraphilia)","Separazione delle carriere (separating judges' and prosecutors' careers)","Ipovedente (visually impaired)","Agostiniano (Augustinian)","ACAB","«Si na pret»","Cubiculario","Amarcord","Bed rotting","Dazi Trump (Trump tariffs)"],
    es:["Parafilia","Separazione delle carriere (separación de carreras de jueces y fiscales)","Ipovedente (persona con baja visión)","Agostiniano (agustino)","ACAB","«Si na pret»","Cubiculario","Amarcord","Bed rotting","Dazi Trump (aranceles de Trump)"]}},
{g:1,
 t:{it:"Le 10 domande «Come fare…?» in cucina più cercate su Google in Italia",en:"The 10 most searched \"How to make…?\" cooking questions on Google in Italy",es:"Las 10 preguntas «¿Cómo hacer…?» de cocina más buscadas en Google en Italia"},
 l:{it:["Le chiacchiere","I capperi sotto sale","Il kefir in casa","Il guacamole","Le patate dolci","Il casatiello","La pastiera","La besciamella fatta in casa","Il pollo","La pasta e lenticchie"],
    en:["Chiacchiere (carnival fritters)","Salt-cured capers","Homemade kefir","Guacamole","Sweet potatoes","Casatiello","Pastiera","Homemade béchamel","Chicken","Pasta with lentils"],
    es:["Chiacchiere (dulces de carnaval)","Alcaparras en sal","Kéfir casero","Guacamole","Boniatos","Casatiello","Pastiera","Bechamel casera","Pollo","Pasta con lentejas"]}},
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

// Regole (stesso formato di data-regole.js)
if(typeof REGOLE!=="undefined")REGOLE["amici|TOP 10"]={
 f:"top10",p:"1+",
 it:["1. Scegliete se giocare da soli, uno contro l'altro o a squadre, e scrivete i nomi.\n2. L'app mostra una classifica vera, con la sua fonte: per esempio «Le 10 lingue più parlate al mondo».\n3. Ognuno (o ogni squadra) prova a indovinare le voci della classifica, a voce o su un foglio.\n4. Toccate «Mostra la classifica»: 1 punto per ogni voce indovinata. Segnate i punti con + e −.\n5. Toccate «Prossima classifica».\nVince chi ha più punti alla fine.","Non serve indovinare la posizione: basta che la voce sia nella top 10."],
 en:["1. Choose whether to play alone, one against one or in teams, and enter the names.\n2. The app shows a real ranking, with its source: for example \"The 10 most spoken languages in the world\".\n3. Everyone (or every team) tries to guess the items in the ranking, out loud or on paper.\n4. Tap \"Show the ranking\": 1 point for each item guessed. Keep score with + and −.\n5. Tap \"Next ranking\".\nWhoever has the most points at the end wins.","You don't need the exact position: the item just has to be in the top 10."],
 es:["1. Elegid si jugar solos, uno contra otro o por equipos, y escribid los nombres.\n2. La app muestra una clasificación real, con su fuente: por ejemplo «Las 10 lenguas más habladas del mundo».\n3. Cada uno (o cada equipo) intenta adivinar los puestos de la clasificación, en voz alta o en un papel.\n4. Tocad «Mostrar la clasificación»: 1 punto por cada acierto. Apuntad los puntos con + y −.\n5. Tocad «Siguiente clasificación».\nGana quien tenga más puntos al final.","No hace falta acertar la posición: basta con que esté en el top 10."]
};

var T10=null;
function t10Strings(){
 if(typeof STRINGS==="undefined"||STRINGS.it.t10Show)return;
 Object.assign(STRINGS.it,{t10Mode:"Come giocate?",t10Players:"Giocatori",t10Teams:"Squadre",t10ModeSubP:"Da soli o uno contro l'altro: ognuno ha i suoi punti.",t10ModeSubT:"A squadre: ogni squadra ha i suoi punti.",t10Count:"Classifica {n} di {t}",t10Src:"Secondo {s}",t10Hint:"Provate a indovinare le voci della classifica, a voce o su un foglio. Poi scopritela.",t10Show:"Mostra la classifica",t10PtsHint:"1 punto per ogni voce indovinata",t10Next:"Prossima classifica",t10Scores:"Punteggi",t10Done:"Avete giocato tutte le classifiche!",t10Back:"Torna alla partita",t10End:"Fine gioco",t10Win:"Vince {n}!",t10Tie:"Parità tra {n}!",t10Solo:"Hai fatto {n}!",t10Pt1:"punto",t10PtN:"punti",t10Played:"Classifiche giocate: {n}"});
 Object.assign(STRINGS.en,{t10Mode:"How are you playing?",t10Players:"Players",t10Teams:"Teams",t10ModeSubP:"Alone or one against one: everyone scores for themselves.",t10ModeSubT:"In teams: each team scores together.",t10Count:"Ranking {n} of {t}",t10Src:"According to {s}",t10Hint:"Try to guess the items in the ranking, out loud or on paper. Then reveal it.",t10Show:"Show the ranking",t10PtsHint:"1 point for each item guessed",t10Next:"Next ranking",t10Scores:"Scores",t10Done:"You've played all the rankings!",t10Back:"Back to the game",t10End:"End game",t10Win:"{n} wins!",t10Tie:"Tie between {n}!",t10Solo:"You scored {n}!",t10Pt1:"point",t10PtN:"points",t10Played:"Rankings played: {n}"});
 Object.assign(STRINGS.es,{t10Mode:"¿Cómo jugáis?",t10Players:"Jugadores",t10Teams:"Equipos",t10ModeSubP:"Solos o uno contra otro: cada uno suma sus puntos.",t10ModeSubT:"Por equipos: cada equipo suma sus puntos.",t10Count:"Clasificación {n} de {t}",t10Src:"Según {s}",t10Hint:"Intentad adivinar los puestos de la clasificación, en voz alta o en un papel. Luego descubridla.",t10Show:"Mostrar la clasificación",t10PtsHint:"1 punto por cada acierto",t10Next:"Siguiente clasificación",t10Scores:"Puntuaciones",t10Done:"¡Habéis jugado todas las clasificaciones!",t10Back:"Volver a la partida",t10End:"Fin del juego",t10Win:"¡Gana {n}!",t10Tie:"¡Empate entre {n}!",t10Solo:"¡Has hecho {n}!",t10Pt1:"punto",t10PtN:"puntos",t10Played:"Clasificaciones jugadas: {n}"});
}
function t10T(k,o){t10Strings();var s=T(k);o=o||{};for(var x in o)s=s.split("{"+x+"}").join(o[x]);return s;}
function t10L(){return (typeof LANG!=="undefined"&&(LANG==="en"||LANG==="es"))?LANG:"it";}
function t10Pts(n){return n+" "+(n===1?t10T("t10Pt1"):t10T("t10PtN"));}
function t10Shuffle(){var a=TOP10.map(function(_,i){return i;});for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function t10Card(i){
 var c=TOP10[i],L=t10L();if(!c)return null;
 var l=Array.isArray(c.l)?c.l:(c.l[L]||c.l.it);
 var s=c.g?TOP10_GSRC[L]:(c.s[L]||c.s.it);
 return {src:s,title:c.t[L]||c.t.it,items:l};
}
function t10Start(){
 if(!T10)T10={teams:false,names:[]};
 S.screen="t10_setup";render();
}
function renderT10Setup(){
 clr();t10Strings();
 addBackArrow(goBackToGames);
 var wrap=div("mw-wrap");
 var box=div("mw-hint-box");box.appendChild(div("mw-hint-title",t10T("t10Mode")));
 var seg=div("mw-hint-seg");
 [[false,t10T("t10Players")],[true,t10T("t10Teams")]].forEach(function(o){
  var b=document.createElement("button");b.type="button";b.className="mw-hint-opt"+(T10.teams===o[0]?" on":"");b.textContent=o[1];
  b.onclick=function(){if(T10.teams===o[0])return;T10.teams=o[0];T10.names=[];renderT10Setup();};seg.appendChild(b);
 });
 box.appendChild(seg);box.appendChild(div("mw-hint-sub",T10.teams?t10T("t10ModeSubT"):t10T("t10ModeSubP")));
 wrap.appendChild(box);
 var ed=namesEditor({min:1,max:20,teams:T10.teams,get:function(){return T10.names;},set:function(v){T10.names=v;}});
 wrap.appendChild(ed.el);
 wrap.appendChild(nmStart(T("ui_inizia"),function(){
  T10.names=ed.names();T10.scores=T10.names.map(function(){return 0;});
  T10.order=t10Shuffle();T10.pos=0;T10.shown=false;T10.played=0;T10.done=false;
  S.screen="t10_play";render();
 }));
 document.getElementById("root").appendChild(wrap);
}
function t10ScoreRows(wrap){
 var list=div("sc-list");
 T10.names.forEach(function(n,i){
  var row=div("sc-row");row.appendChild(div("sc-name",n));
  var ctl=div("sc-ctl");
  var m=document.createElement("button");m.type="button";m.className="sc-btn";m.textContent="−";m.disabled=T10.scores[i]<=0;
  m.setAttribute("aria-label","− "+n);
  m.onclick=function(){if(T10.scores[i]>0){T10.scores[i]--;renderT10Play();}};
  var v=div("sc-val",String(T10.scores[i]));
  var p=document.createElement("button");p.type="button";p.className="sc-btn plus";p.textContent="+";p.setAttribute("aria-label","+ "+n);
  p.onclick=function(){T10.scores[i]++;renderT10Play();};
  ctl.appendChild(m);ctl.appendChild(v);ctl.appendChild(p);row.appendChild(ctl);list.appendChild(row);
 });
 wrap.appendChild(list);
}
function renderT10Play(){
 clr();t10Strings();
 if(!T10||!T10.order){t10Start();return;}
 var y=window.scrollY||0;
 addBackArrow(function(){S.screen="t10_setup";render();});
 var wrap=div("sc-wrap t10-wrap");
 var c=t10Card(T10.order[T10.pos]);
 wrap.appendChild(div("t10-count",t10T("t10Count",{n:T10.pos+1,t:T10.order.length})));
 wrap.appendChild(div("t10-src",t10T("t10Src",{s:c.src})));
 wrap.appendChild(div("t10-title",c.title));
 if(!T10.shown){
  wrap.appendChild(div("sc-turn-sub",t10T("t10Hint")));
  var b1=div("sc-btns");
  b1.appendChild(btn("ebtn",t10T("t10Show"),function(){T10.shown=true;renderT10Play();}));
  wrap.appendChild(b1);
 } else {
  var ol=document.createElement("ol");ol.className="t10-list";
  c.items.forEach(function(it,i){
   var li=document.createElement("li");li.className="t10-item";
   var n=document.createElement("span");n.className="t10-n";n.textContent=String(i+1);
   var tx=document.createElement("span");tx.className="t10-tx";tx.textContent=it;
   li.appendChild(n);li.appendChild(tx);ol.appendChild(li);
  });
  wrap.appendChild(ol);
  wrap.appendChild(div("t10-pts",t10T("t10PtsHint")));
  t10ScoreRows(wrap);
  var b2=div("sc-btns");
  var last=T10.pos>=T10.order.length-1;
  if(last)wrap.appendChild(div("t10-done",t10T("t10Done")));
  else b2.appendChild(btn("ebtn",t10T("t10Next"),function(){
   T10.played=Math.max(T10.played,T10.pos+1);T10.pos++;T10.shown=false;renderT10Play();window.scrollTo(0,0);
  }));
  b2.appendChild(btn(last?"ebtn":"ebtn out",t10T("t10Scores"),function(){T10.played=Math.max(T10.played,T10.pos+1);S.screen="t10_rank";render();window.scrollTo(0,0);}));
  wrap.appendChild(b2);
 }
 document.getElementById("root").appendChild(wrap);
 if(T10.shown&&y)window.scrollTo(0,y);
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
 var msg=T10.names.length===1?t10T("t10Solo",{n:t10Pts(best)}):(top.length>1?t10T("t10Tie",{n:top.map(function(i){return T10.names[i];}).join(", ")}):t10T("t10Win",{n:T10.names[top[0]]}));
 wrap.appendChild(div("sc-win",msg));
 wrap.appendChild(div("sc-turn-sub",t10T("t10Played",{n:T10.played})));
 var list=div("sc-list");
 idx.forEach(function(i,pos){
  var row=div("sc-row"+(top.indexOf(i)>=0&&T10.names.length>1?" on":""));
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
