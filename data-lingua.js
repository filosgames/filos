/*!
 * Filòs — © 2026 i titolari del progetto Filòs. Tutti i diritti riservati.
 * Codice e contenuti (giochi, regole, domande, testi, traduzioni) sono opere protette
 * dalla legge sul diritto d'autore (L. 633/1941). È vietata qualsiasi copia, riproduzione,
 * modifica, ridistribuzione o estrazione automatica, anche parziale, e l'uso per addestrare
 * sistemi di intelligenza artificiale, senza autorizzazione scritta dei titolari.
 */
// ══════════════════════════════════════════
// CHE LINGUA È? — dati
// 200 frasi scritte nella loro lingua: si indovina la lingua tra 4; nella soluzione si vedono
// il paese d'origine (con la bandiera) e il significato.
// Le frasi sono in ordine di livello: le prime 66 facili, poi 66 medie, poi 68 difficili
// (stessi terzi degli altri quiz). Italiano, inglese e spagnolo non sono mai la frase da indovinare
// (sono le lingue dell'app), ma possono comparire tra le risposte sbagliate.
// ══════════════════════════════════════════
var LINGUA_QUIZ="CHE LINGUA È?";
// id: [italiano, inglese, spagnolo, bandiera, paese IT, paese EN, paese ES, lingue che le somigliano]
var LG_LANGS={
 fr:["Francese","French","Francés","fr","Francia","France","Francia",["it","es","pt","ca","ro","gl"]],
 de:["Tedesco","German","Alemán","de","Germania","Germany","Alemania",["nl","af","da","sv","no"]],
 pt:["Portoghese","Portuguese","Portugués","pt","Portogallo","Portugal","Portugal",["es","gl","it","ca","ro"]],
 ru:["Russo","Russian","Ruso","ru","Russia","Russia","Rusia",["uk","bg","sr","pl","cs"]],
 ja:["Giapponese","Japanese","Japonés","jp","Giappone","Japan","Japón",["zh","ko","th","vi"]],
 zh:["Cinese","Chinese","Chino","cn","Cina","China","China",["ja","ko","vi","th"]],
 ar:["Arabo","Arabic","Árabe","sa","Arabia Saudita","Saudi Arabia","Arabia Saudí",["fa","he","tr","hi"]],
 el:["Greco","Greek","Griego","gr","Grecia","Greece","Grecia",["ru","bg","ka","hy"]],
 ko:["Coreano","Korean","Coreano","kr","Corea del Sud","South Korea","Corea del Sur",["ja","zh","th","vi"]],
 hi:["Hindi","Hindi","Hindi","in","India","India","India",["bn","th","fa","ka"]],
 nl:["Olandese","Dutch","Neerlandés","nl","Paesi Bassi","Netherlands","Países Bajos",["af","de","da","sv","no"]],
 tr:["Turco","Turkish","Turco","tr","Turchia","Turkey","Turquía",["hu","fi","et","ro"]],
 he:["Ebraico","Hebrew","Hebreo","il","Israele","Israel","Israel",["ar","fa","el","hy"]],
 th:["Thailandese","Thai","Tailandés","th","Thailandia","Thailand","Tailandia",["hi","bn","ka","ko"]],
 pl:["Polacco","Polish","Polaco","pl","Polonia","Poland","Polonia",["cs","sk","hr","sl","uk"]],
 sv:["Svedese","Swedish","Sueco","se","Svezia","Sweden","Suecia",["no","da","is","de","nl"]],
 ro:["Rumeno","Romanian","Rumano","ro","Romania","Romania","Rumanía",["it","pt","es","ca","fr"]],
 cs:["Ceco","Czech","Checo","cz","Repubblica Ceca","Czech Republic","República Checa",["sk","pl","sl","hr"]],
 hu:["Ungherese","Hungarian","Húngaro","hu","Ungheria","Hungary","Hungría",["fi","et","tr","ro"]],
 fi:["Finlandese","Finnish","Finés","fi","Finlandia","Finland","Finlandia",["et","hu","sv","lv"]],
 uk:["Ucraino","Ukrainian","Ucraniano","ua","Ucraina","Ukraine","Ucrania",["ru","bg","sr","pl"]],
 vi:["Vietnamita","Vietnamese","Vietnamita","vn","Vietnam","Vietnam","Vietnam",["tl","id","ms","th"]],
 id:["Indonesiano","Indonesian","Indonesio","id","Indonesia","Indonesia","Indonesia",["ms","tl","vi","sw"]],
 fa:["Persiano","Persian","Persa","ir","Iran","Iran","Irán",["ar","he","hi","tr"]],
 sw:["Swahili","Swahili","Suajili","tz","Tanzania e Kenya","Tanzania and Kenya","Tanzania y Kenia",["id","ms","tl","af"]],
 ca:["Catalano","Catalan","Catalán","es","Spagna (Catalogna)","Spain (Catalonia)","España (Cataluña)",["es","gl","pt","fr","it"]],
 hr:["Croato","Croatian","Croata","hr","Croazia","Croatia","Croacia",["sl","sk","cs","pl"]],
 bn:["Bengalese","Bengali","Bengalí","bd","Bangladesh","Bangladesh","Bangladés",["hi","th","ka","fa"]],
 no:["Norvegese","Norwegian","Noruego","no","Norvegia","Norway","Noruega",["da","sv","is","de"]],
 da:["Danese","Danish","Danés","dk","Danimarca","Denmark","Dinamarca",["no","sv","is","nl"]],
 sk:["Slovacco","Slovak","Eslovaco","sk","Slovacchia","Slovakia","Eslovaquia",["cs","pl","sl","hr"]],
 sl:["Sloveno","Slovenian","Esloveno","si","Slovenia","Slovenia","Eslovenia",["hr","sk","cs","pl"]],
 sr:["Serbo","Serbian","Serbio","rs","Serbia","Serbia","Serbia",["bg","ru","uk","el"]],
 bg:["Bulgaro","Bulgarian","Búlgaro","bg","Bulgaria","Bulgaria","Bulgaria",["sr","ru","uk","el"]],
 et:["Estone","Estonian","Estonio","ee","Estonia","Estonia","Estonia",["fi","lv","lt","hu"]],
 lv:["Lettone","Latvian","Letón","lv","Lettonia","Latvia","Letonia",["lt","et","fi","pl"]],
 lt:["Lituano","Lithuanian","Lituano","lt","Lituania","Lithuania","Lituania",["lv","et","pl","fi"]],
 is:["Islandese","Icelandic","Islandés","is","Islanda","Iceland","Islandia",["no","da","sv","de"]],
 gl:["Galiziano","Galician","Gallego","es","Spagna (Galizia)","Spain (Galicia)","España (Galicia)",["pt","es","ca","it"]],
 ms:["Malese","Malay","Malayo","my","Malesia","Malaysia","Malasia",["id","tl","sw","vi"]],
 tl:["Tagalog","Tagalog","Tagalo","ph","Filippine","Philippines","Filipinas",["ms","id","vi","sw"]],
 ka:["Georgiano","Georgian","Georgiano","ge","Georgia","Georgia","Georgia",["hy","el","th","hi"]],
 hy:["Armeno","Armenian","Armenio","am","Armenia","Armenia","Armenia",["ka","el","ru","he"]],
 af:["Afrikaans","Afrikaans","Afrikáans","za","Sudafrica","South Africa","Sudáfrica",["nl","de","da","no"]],
 eu:["Basco","Basque","Euskera","es","Spagna (Paesi Baschi)","Spain (Basque Country)","España (País Vasco)",["ca","gl","es","et"]],
 it:["Italiano","Italian","Italiano","it","Italia","Italy","Italia",["es","pt","ro","fr"]],
 en:["Inglese","English","Inglés","gb","Regno Unito","United Kingdom","Reino Unido",["nl","de","da","sv"]],
 es:["Spagnolo","Spanish","Español","es","Spagna","Spain","España",["pt","gl","ca","it"]]
};
// Ordine fisso delle lingue: le risposte si salvano come numero (uguale su tutti i telefoni)
var LG_IDS=["fr","de","pt","ru","ja","zh","ar","el","ko","hi","nl","tr","he","th","pl","sv","ro","cs","hu","fi","uk","vi","id","fa","sw","ca","hr","bn","no","da","sk","sl","sr","bg","et","lv","lt","is","gl","ms","tl","ka","hy","af","eu","it","en","es"];
// Significato delle frasi (italiano, inglese, spagnolo)
var LG_MEAN={
 0:["Buongiorno, come stai?","Good morning, how are you?","Buenos días, ¿cómo estás?"],
 1:["Grazie mille per l'aiuto.","Thank you very much for the help.","Muchas gracias por la ayuda."],
 2:["Dov'è la stazione dei treni?","Where is the train station?","¿Dónde está la estación de tren?"],
 3:["Vorrei un caffè, per favore.","I'd like a coffee, please.","Quisiera un café, por favor."],
 4:["Oggi fa molto caldo.","It's very hot today.","Hoy hace mucho calor."],
 5:["Mi piace molto viaggiare.","I really like travelling.","Me gusta mucho viajar."],
 6:["Quanto costa questo?","How much does this cost?","¿Cuánto cuesta esto?"],
 10:["Ho fame, andiamo a mangiare.","I'm hungry, let's go and eat.","Tengo hambre, vamos a comer."],
 11:["Il libro è sul tavolo.","The book is on the table.","El libro está sobre la mesa."],
 12:["Piove da tre giorni.","It has been raining for three days.","Llueve desde hace tres días."],
 13:["Come ti chiami?","What's your name?","¿Cómo te llamas?"],
 15:["Il gatto dorme sul divano.","The cat is sleeping on the sofa.","El gato duerme en el sofá."],
 16:["Domani andiamo al mare.","Tomorrow we're going to the seaside.","Mañana vamos a la playa."],
 17:["La cena è pronta.","Dinner is ready.","La cena está lista."],
 19:["Buon compleanno!","Happy birthday!","¡Feliz cumpleaños!"],
 21:["Che ore sono?","What time is it?","¿Qué hora es?"],
 22:["L'acqua è fredda.","The water is cold.","El agua está fría."],
 24:["Benvenuti a casa nostra.","Welcome to our home.","Bienvenidos a nuestra casa."],
 25:["Scusa, sono in ritardo.","Sorry, I'm late.","Perdón, llego tarde."],
 26:["La musica è molto bella.","The music is very beautiful.","La música es muy bonita."],
 27:["Ci vediamo stasera.","See you tonight.","Nos vemos esta noche."],
 28:["Il treno parte alle otto.","The train leaves at eight.","El tren sale a las ocho."],
 29:["Mi piace leggere libri.","I like reading books.","Me gusta leer libros."],
 30:["Ciao, come stai?","Hello, how are you?","Hola, ¿cómo estás?"]
};
// Le 200 frasi: [lingua, significato, testo]
var LG_PH=[
 // ── FACILE (0–65) ──
 ["fr",0,"Bonjour, comment ça va ?"],["fr",2,"Où est la gare, s'il vous plaît ?"],["fr",4,"Il fait très chaud aujourd'hui."],["fr",11,"Le livre est sur la table."],["fr",16,"Demain, nous allons à la mer."],
 ["de",1,"Vielen Dank für deine Hilfe."],["de",3,"Ich hätte gern einen Kaffee, bitte."],["de",12,"Es regnet seit drei Tagen."],["de",15,"Die Katze schläft auf dem Sofa."],["de",21,"Wie spät ist es?"],
 ["pt",0,"Bom dia, tudo bem?"],["pt",5,"Eu gosto muito de viajar."],["pt",10,"Estou com fome, vamos comer."],["pt",17,"O jantar está pronto."],["pt",22,"A água está fria."],
 ["ru",30,"Здравствуйте, как дела?"],["ru",1,"Большое спасибо за помощь."],["ru",6,"Сколько это стоит?"],["ru",13,"Как тебя зовут?"],["ru",28,"Поезд отправляется в восемь."],
 ["ja",0,"おはようございます。お元気ですか？"],["ja",2,"駅はどこですか？"],["ja",3,"コーヒーを一杯ください。"],["ja",13,"お名前は何ですか？"],["ja",19,"お誕生日おめでとう！"],
 ["zh",1,"非常感谢你的帮助。"],["zh",6,"这个多少钱？"],["zh",21,"现在几点了？"],["zh",15,"猫在沙发上睡觉。"],["zh",27,"我们今晚见。"],
 ["ar",0,"صباح الخير، كيف حالك؟"],["ar",1,"شكرا جزيلا على مساعدتك."],["ar",2,"أين محطة القطار؟"],["ar",13,"ما اسمك؟"],["ar",24,"أهلا وسهلا في بيتنا."],
 ["el",0,"Καλημέρα, τι κάνεις;"],["el",1,"Ευχαριστώ πολύ για τη βοήθεια."],["el",4,"Σήμερα κάνει πολύ ζέστη."],["el",6,"Πόσο κοστίζει αυτό;"],["el",26,"Η μουσική είναι πολύ ωραία."],
 ["ko",30,"안녕하세요, 잘 지내세요?"],["ko",1,"도와주셔서 정말 감사합니다."],["ko",3,"커피 한 잔 주세요."],["ko",13,"이름이 뭐예요?"],["ko",19,"생일 축하해요!"],
 ["hi",30,"नमस्ते, आप कैसे हैं?"],["hi",2,"रेलवे स्टेशन कहाँ है?"],["hi",6,"यह कितने का है?"],["hi",13,"आपका नाम क्या है?"],["hi",10,"मुझे भूख लगी है, चलो खाना खाते हैं।"],
 ["nl",1,"Hartelijk bedankt voor je hulp."],["nl",4,"Het is vandaag erg warm."],["nl",15,"De kat slaapt op de bank."],["nl",29,"Ik lees graag boeken."],
 ["tr",0,"Günaydın, nasılsın?"],["tr",6,"Bu ne kadar?"],["tr",12,"Üç gündür yağmur yağıyor."],["tr",17,"Akşam yemeği hazır."],
 ["he",0,"בוקר טוב, מה שלומך?"],["he",1,"תודה רבה על העזרה."],["he",13,"איך קוראים לך?"],["he",22,"המים קרים."],
 ["th",30,"สวัสดีครับ สบายดีไหม"],["th",1,"ขอบคุณมากสำหรับความช่วยเหลือ"],["th",6,"อันนี้ราคาเท่าไหร่"],["th",3,"ขอกาแฟหนึ่งแก้วครับ"],
 // ── MEDIA (66–131) ──
 ["pl",0,"Dzień dobry, jak się masz?"],["pl",1,"Dziękuję bardzo za pomoc."],["pl",2,"Gdzie jest dworzec kolejowy?"],["pl",12,"Pada deszcz od trzech dni."],["pl",15,"Kot śpi na kanapie."],
 ["sv",0,"God morgon, hur mår du?"],["sv",4,"Det är väldigt varmt i dag."],["sv",10,"Jag är hungrig, vi går och äter."],["sv",16,"I morgon åker vi till havet."],["sv",21,"Vad är klockan?"],
 ["ro",0,"Bună dimineața, ce mai faci?"],["ro",1,"Mulțumesc mult pentru ajutor."],["ro",6,"Cât costă asta?"],["ro",11,"Cartea este pe masă."],["ro",25,"Scuze, am întârziat."],
 ["cs",0,"Dobrý den, jak se máš?"],["cs",3,"Dal bych si kávu, prosím."],["cs",13,"Jak se jmenuješ?"],["cs",17,"Večeře je hotová."],["cs",28,"Vlak odjíždí v osm."],
 ["hu",0,"Jó reggelt, hogy vagy?"],["hu",1,"Köszönöm szépen a segítséget."],["hu",6,"Mennyibe kerül ez?"],["hu",13,"Hogy hívnak?"],["hu",22,"A víz hideg."],
 ["fi",0,"Hyvää huomenta, mitä kuuluu?"],["fi",1,"Kiitos paljon avusta."],["fi",5,"Pidän kovasti matkustamisesta."],["fi",15,"Kissa nukkuu sohvalla."],["fi",21,"Paljonko kello on?"],
 ["uk",0,"Доброго ранку, як справи?"],["uk",1,"Щиро дякую за допомогу."],["uk",2,"Де залізничний вокзал?"],["uk",13,"Як тебе звати?"],["uk",26,"Музика дуже гарна."],
 ["vi",30,"Xin chào, bạn có khỏe không?"],["vi",1,"Cảm ơn bạn rất nhiều vì đã giúp đỡ."],["vi",6,"Cái này bao nhiêu tiền?"],["vi",13,"Bạn tên là gì?"],["vi",10,"Tôi đói rồi, đi ăn thôi."],
 ["id",0,"Selamat pagi, apa kabar?"],["id",2,"Di mana stasiun kereta api?"],["id",3,"Saya mau secangkir kopi, tolong."],["id",13,"Siapa nama kamu?"],["id",16,"Besok kita pergi ke pantai."],
 ["fa",0,"صبح بخیر، حال شما چطور است؟"],["fa",1,"خیلی ممنون از کمک شما."],["fa",6,"قیمت این چند است؟"],["fa",13,"اسم شما چیست؟"],["fa",17,"شام آماده است."],
 ["sw",0,"Habari ya asubuhi, hujambo?"],["sw",1,"Asante sana kwa msaada wako."],["sw",6,"Hii ni bei gani?"],["sw",13,"Jina lako ni nani?"],
 ["ca",0,"Bon dia, com estàs?"],["ca",4,"Avui fa molta calor."],["ca",10,"Tinc gana, anem a menjar."],["ca",27,"Ens veiem aquest vespre."],
 ["hr",0,"Dobro jutro, kako si?"],["hr",1,"Hvala puno na pomoći."],["hr",11,"Knjiga je na stolu."],["hr",22,"Voda je hladna."],
 ["bn",0,"শুভ সকাল, কেমন আছেন?"],["bn",1,"সাহায্যের জন্য অনেক ধন্যবাদ।"],["bn",13,"আপনার নাম কী?"],["bn",6,"এটার দাম কত?"],
 // ── DIFFICILE (132–199) ──
 ["no",0,"God morgen, hvordan har du det?"],["no",4,"Det er veldig varmt i dag."],["no",15,"Katten sover på sofaen."],["no",21,"Hva er klokka?"],
 ["da",0,"Godmorgen, hvordan har du det?"],["da",10,"Jeg er sulten, lad os spise."],["da",12,"Det har regnet i tre dage."],["da",29,"Jeg kan godt lide at læse bøger."],
 ["sk",0,"Dobré ráno, ako sa máš?"],["sk",1,"Ďakujem veľmi pekne za pomoc."],["sk",13,"Ako sa voláš?"],["sk",22,"Voda je studená."],
 ["sl",0,"Dober dan, kako ste?"],["sl",1,"Najlepša hvala za pomoč."],["sl",11,"Knjiga je na mizi."],["sl",28,"Vlak odpelje ob osmih."],
 ["sr",0,"Добро јутро, како си?"],["sr",6,"Колико ово кошта?"],["sr",13,"Како се зовеш?"],["sr",17,"Вечера је спремна."],
 ["bg",0,"Добро утро, как си?"],["bg",1,"Много благодаря за помощта."],["bg",13,"Как се казваш?"],["bg",22,"Водата е студена."],
 ["et",0,"Tere hommikust, kuidas läheb?"],["et",1,"Suur aitäh abi eest."],["et",15,"Kass magab diivanil."],["et",21,"Mis kell on?"],
 ["lv",0,"Labrīt, kā tev iet?"],["lv",1,"Liels paldies par palīdzību."],["lv",6,"Cik tas maksā?"],["lv",13,"Kā tevi sauc?"],
 ["lt",0,"Labas rytas, kaip sekasi?"],["lt",1,"Labai ačiū už pagalbą."],["lt",6,"Kiek tai kainuoja?"],["lt",13,"Kuo tu vardu?"],
 ["is",0,"Góðan daginn, hvernig hefur þú það?"],["is",1,"Kærar þakkir fyrir hjálpina."],["is",13,"Hvað heitir þú?"],["is",22,"Vatnið er kalt."],
 ["gl",0,"Bos días, como estás?"],["gl",5,"Gústame moito viaxar."],["gl",10,"Teño fame, imos comer."],["gl",17,"A cea está lista."],
 ["ms",0,"Selamat pagi, apa khabar?"],["ms",1,"Terima kasih banyak atas bantuan anda."],["ms",21,"Pukul berapa sekarang?"],["ms",25,"Maaf, saya terlambat."],
 ["tl",0,"Magandang umaga, kumusta ka?"],["tl",1,"Maraming salamat sa tulong mo."],["tl",6,"Magkano ito?"],["tl",13,"Ano ang pangalan mo?"],
 ["ka",0,"დილა მშვიდობისა, როგორ ხარ?"],["ka",1,"დიდი მადლობა დახმარებისთვის."],["ka",13,"რა გქვია?"],["ka",6,"რა ღირს ეს?"],
 ["hy",0,"Բարի լույս, ինչպե՞ս ես։"],["hy",1,"Շատ շնորհակալ եմ օգնության համար։"],["hy",13,"Անունդ ի՞նչ է։"],["hy",22,"Ջուրը սառն է։"],
 ["af",0,"Goeiemôre, hoe gaan dit?"],["af",1,"Baie dankie vir jou hulp."],["af",15,"Die kat slaap op die bank."],["af",21,"Hoe laat is dit?"],
 ["eu",0,"Egun on, zer moduz?"],["eu",1,"Eskerrik asko laguntzagatik."],["eu",13,"Zein da zure izena?"],["eu",22,"Ura hotza dago."]
];
var LG_RTL={ar:1,he:1,fa:1};
function lgLi(){return (typeof LANG!=="undefined"&&LANG==="en")?1:(typeof LANG!=="undefined"&&LANG==="es")?2:0;}
// Nome della lingua (numero = posizione in LG_IDS) nella lingua dell'app
function lgLangName(n){var L=LG_LANGS[LG_IDS[n]];return L?L[lgLi()]:"";}
function lgCountry(n){var L=LG_LANGS[LG_IDS[n]];return L?L[4+lgLi()]:"";}
function lgFlag(n){var L=LG_LANGS[LG_IDS[n]];return L?"flags/"+L[3]+".svg":"";}
function lgAnswer(qi){var p=LG_PH[qi];return p?LG_IDS.indexOf(p[0]):-1;}
function lgMeaning(qi){var p=LG_PH[qi];var m=p&&LG_MEAN[p[1]];return m?m[lgLi()]:"";}
function lgTier(qi){var n=LG_PH.length,t=Math.floor(n/3);return qi<t?0:qi<2*t?1:2;}
function lgShuf(a){a=a.slice();for(var j=a.length-1;j>0;j--){var k=Math.floor(Math.random()*(j+1));var t=a[j];a[j]=a[k];a[k]=t;}return a;}
// 4 lingue tra cui scegliere (numeri), quella giusta compresa, in ordine casuale.
// Facile: lingue lontane tra loro; media: una lingua che le somiglia; difficile: tre lingue che le somigliano.
function lgOpts(qi){
 var id=LG_PH[qi][0];var tier=lgTier(qi);var sim=LG_LANGS[id][7].slice();
 var pool=[];var t=Math.floor(LG_PH.length/3);
 LG_PH.forEach(function(p,i){var lv=i<t?0:i<2*t?1:2;if(lv<=Math.max(tier,0)&&pool.indexOf(p[0])<0)pool.push(p[0]);});
 var others=[];
 if(tier===2)others=lgShuf(sim.slice(0,4)).slice(0,3);
 else if(tier===1)others=lgShuf(sim.slice(0,3)).slice(0,1);
 var far=lgShuf(pool.filter(function(x){return x!==id&&sim.indexOf(x)<0;}));
 for(var i=0;others.length<3&&i<far.length;i++)if(others.indexOf(far[i])<0)others.push(far[i]);
 for(var j=0;others.length<3&&j<sim.length;j++)if(others.indexOf(sim[j])<0)others.push(sim[j]);
 return lgShuf([id].concat(others)).map(function(x){return LG_IDS.indexOf(x);});
}
// La frase, scritta nella sua lingua (direzione giusta per arabo, ebraico e persiano)
function lgPhraseEl(qi,cls){
 var p=LG_PH[qi];var e=document.createElement("div");e.className=cls||"lg-phrase";
 if(p){e.textContent=p[2];e.setAttribute("lang",p[0]);e.setAttribute("dir",LG_RTL[p[0]]?"rtl":"ltr");}
 return e;
}
// Soluzione: paese d'origine con la bandiera e significato della frase
function lgSolutionEl(qi){
 if(typeof lgrStrings==="function")lgrStrings();
 var a=lgAnswer(qi);var box=document.createElement("div");box.className="lg-sol";
 var c=document.createElement("div");c.className="lg-country";
 var im=document.createElement("img");im.src=lgFlag(a);im.alt="";c.appendChild(im);
 var s=document.createElement("span");s.textContent=lgCountry(a);c.appendChild(s);
 box.appendChild(c);
 var m=document.createElement("div");m.className="lg-mean";m.textContent=T("lgMeans").replace("{m}",lgMeaning(qi));box.appendChild(m);
 return box;
}
// Il quiz al tavolo usa lo stesso motore degli altri quiz: una voce per lingua dell'app
(function(){
 var hint=["In che lingua è scritta questa frase?","Which language is this sentence written in?","¿En qué idioma está escrita esta frase?"];
 [typeof QUIZ_DATA!=="undefined"?QUIZ_DATA:null,typeof QUIZ_DATA_EN!=="undefined"?QUIZ_DATA_EN:null,typeof QUIZ_DATA_ES!=="undefined"?QUIZ_DATA_ES:null].forEach(function(D,li){
  if(!D)return;
  D[LINGUA_QUIZ]={bg:"linear-gradient(135deg,#2E7D6B,#1F5C4F)",hint:hint[li],questions:LG_PH.map(function(p){var L=LG_LANGS[p[0]];var m=LG_MEAN[p[1]];return {q:p[2],a:L[li],extra:L[4+li]+" · "+m[li]};})};
 });
})();
