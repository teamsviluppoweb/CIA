

/**
 * To get started install
 * express bodyparser jsonwebtoken express-jwt
 * via npm
 * command :-
 * npm install express bodyparser jsonwebtoken express-jwt --save
 */

// Bringing all the dependencies in
const express = require('express');
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

var expiresIn = 3000;
// Instantiating the express app
const app = express();
let domanda = {
    "DomandaConcorso": {
        "IdDomanda": "",
        "Versione": "",
        "Stato": 0,
        "IstanzaJSON": "",
        "DataInvio": "",
        "DataModifica": ""
    },
    "Anagrafica": {
        "CodiceFiscale": "ZHNLNN72T65X210W",
        "Cognome": "Super",
        "Nome": "Mario",
        "ProvinciaNascita": "RM",
        "ComuneNascita": "Roma",
        "DataNascita": "1972-12-25T00:00:00",
        "Sesso": "M",
        "Residenza": "Via Cavour 5 - 00184 Roma",
        "Cellulare": "12345678",
        "Email": "supermario@libero.it",
        "DomicilioDigitale": "supermaio@pec.aruba.it"
    },
    "TitoloDiploma": {
        "TipoDiploma": "",
        "Istituto": "",
        "AnnoConseguimento": "",
        "Provincia": "",
        "Comune": "",
        "Indirizzo": ""
    },
    "Lingua": {
        "Id": "",
        "Descrizione": ""
    },
    "Riserve": [],
    "TitoliPreferenziali": [],
    "NumeroFigli": "",
    "Invalidita": {
        "prcInvalidita": "",
        "enteInvalidita": "",
        "dataInvalidita": "",
        "eszProva": "",
        "ausProva": "",
        "tmpAggiuntivi": ""
    }
};

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// INstantiating the express-jwt middleware
const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
});


// MOCKING DB just for test
let users = [
    {
        id: 1,
        username: 'demo',
        password: 'demo'
    }
];

// LOGIN ROUTE
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Use your DB ORM logic here to find user and compare password
    for (let user of users) { // I am using a simple array users which i made above
        if (username == user.username && password == user.password /* Use your password hash checking logic here !*/) {
            //If all credentials are correct do this
            let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn }); // Sigining the token
            res.json({
                sucess: true,
                err: null,
                token
            });
            break;
        }
        else {
            res.status(401).json({
                sucess: false,
                token: null,
                err: 'Username or password is incorrect'
            });
        }
    }
});

app.get('/whoami', jwtMW /* Using the express jwt MW here */, (req, res) => {
    const expiration = {
        'scadenza': expiresIn
    };

    res.send(expiration); //Sending some response when authenticated
});

app.get('/titolo-studio', jwtMW /* Using the express jwt MW here */, (req, res) => {
    
    const studio = [
        {   
            tipologia: "Diploma di istruzione secondaria superiore",
            titoloDiStudio: "Diploma di istruzione secondaria superiore ad indirizzo tecninco industriale - informatica",
            conseguitoPresso: "ITIS Enrico Fermi",
            luogo: "Roma (RM)",
            periodoConseguimento: "1992",
            dataValidazione: "18/09/2017"
        },
        {   
            tipologia: "Diploma di laurea (vecchio ordinamento)",
            titoloDiStudio: "Matematica",
            conseguitoPresso: "Ateneo la sapienza",
            luogo: "Roma (RM)",
            periodoConseguimento: "1997",
            dataValidazione: "18/09/2017"
        },
        {   
            tipologia: "Titolo post laurea",
            titoloDiStudio: "Master di primo livello - qualità nella pubblica amministrazione",
            conseguitoPresso: "Università degli studi Roma Tre",
            luogo: "Roma (RM)",
            periodoConseguimento: "18/0",
            dataValidazione: "18/09/2017"
        },
    ];


    res.send(studio); //Sending some response when authenticated
});



app.get('/corsi-formazione', jwtMW /* Using the express jwt MW here */, (req, res) => {

    const corsi = [
        {   
            nomeCorso: "Corso Angular",
            durataCorso: "1 settimana",
            dataDiConseguimento: "12/03/2019",
            istituto: 'Istituto iris',
            luogo: "Roma (RM)",
            periodoConseguimento: "12/04/2019",
        },
    ];


    res.send(corsi); //Sending some response when authenticated
});

app.get('/riserve', jwtMW /* Using the express jwt MW here */, (req, res) => {
    const riserve = [{
        "Id": 1,
        "Descrizione": "10% dei posti al personale volontario del Corpo nazionale dei vigili del fuoco che, alla data di scadenza del termine stabilito nel presente bando per la presentazione della domanda di ammissione, sia iscritto negli appositi elenchi da almeno 7 anni ed abbia effettuato non meno di 200 giorni di servizio, fermi restando gli altri requisiti previsti per l'accesso alla qualifica di Ispettore amministrativo-contabile."
    }, {
        "Id": 2,
        "Descrizione": "2% dei posti agli ufficiali delle forze armate che abbiano terminato senza demerito, alla data di scadenza del termine utile stabilito per la presentazione della domanda di partecipazione, la ferma biennale."
    }];
    res.send(riserve); //Sending some response when authenticated
});

app.get('/lingue', jwtMW /* Using the express jwt MW here */, (req, res) => {
    const lingue = [{ "Id": 1, "Descrizione": "Inglese" }, { "Id": 2, "Descrizione": "Francese" }, { "Id": 3, "Descrizione": "Spagnolo" }, { "Id": 4, "Descrizione": "Tedesco" }];

    res.send(lingue); //Sending some response when authenticated
});

app.get('/comuni', jwtMW /* Using the express jwt MW here */, (req, res) => {

    const comuni = { "table": [{ "codISTAT": 84001, "codProvincia": "AG", "comune": "AGRIGENTO", "cap": "92100", "codNazionale": "A089", "codCatastale": "U2AA", "flagVariazione": 0 }, { "codISTAT": 84002, "codProvincia": "AG", "comune": "ALESSANDRIA DELLA ROCCA", "cap": "92010", "codNazionale": "A181", "codCatastale": "U2AB", "flagVariazione": 0 }, { "codISTAT": 84003, "codProvincia": "AG", "comune": "ARAGONA", "cap": "92021", "codNazionale": "A351", "codCatastale": "U2AC", "flagVariazione": 0 }, { "codISTAT": 84004, "codProvincia": "AG", "comune": "BIVONA", "cap": "92010", "codNazionale": "A896", "codCatastale": "U2AD", "flagVariazione": 0 }, { "codISTAT": 84005, "codProvincia": "AG", "comune": "BURGIO", "cap": "92010", "codNazionale": "B275", "codCatastale": "U2AE", "flagVariazione": 0 }, { "codISTAT": 84006, "codProvincia": "AG", "comune": "CALAMONACI", "cap": "92010", "codNazionale": "B377", "codCatastale": "U2AF", "flagVariazione": 0 }, { "codISTAT": 84007, "codProvincia": "AG", "comune": "CALTABELLOTTA", "cap": "92010", "codNazionale": "B427", "codCatastale": "U2AG", "flagVariazione": 0 }, { "codISTAT": 84008, "codProvincia": "AG", "comune": "CAMASTRA", "cap": "92020", "codNazionale": "B460", "codCatastale": "U2AH", "flagVariazione": 0 }, { "codISTAT": 84009, "codProvincia": "AG", "comune": "CAMMARATA", "cap": "92022", "codNazionale": "B486", "codCatastale": "U2AI", "flagVariazione": 0 }, { "codISTAT": 84010, "codProvincia": "AG", "comune": "CAMPOBELLO DI LICATA", "cap": "92023", "codNazionale": "B520", "codCatastale": "U2AJ", "flagVariazione": 0 }, { "codISTAT": 84011, "codProvincia": "AG", "comune": "CANICATTI'", "cap": "92024", "codNazionale": "B602", "codCatastale": "U2AK", "flagVariazione": 0 }, { "codISTAT": 84012, "codProvincia": "AG", "comune": "CASTELTERMINI", "cap": "92025", "codNazionale": "C275", "codCatastale": "U2AL", "flagVariazione": 0 }, { "codISTAT": 84013, "codProvincia": "AG", "comune": "CASTROFILIPPO", "cap": "92020", "codNazionale": "C341", "codCatastale": "U2AM", "flagVariazione": 0 }, { "codISTAT": 84014, "codProvincia": "AG", "comune": "CATTOLICA ERACLEA", "cap": "92011", "codNazionale": "C356", "codCatastale": "U2AN", "flagVariazione": 0 }, { "codISTAT": 84015, "codProvincia": "AG", "comune": "CIANCIANA", "cap": "92012", "codNazionale": "C668", "codCatastale": "U2AP", "flagVariazione": 0 }, { "codISTAT": 84016, "codProvincia": "AG", "comune": "COMITINI", "cap": "92020", "codNazionale": "C928", "codCatastale": "U2AQ", "flagVariazione": 0 }, { "codISTAT": 84017, "codProvincia": "AG", "comune": "FAVARA", "cap": "92026", "codNazionale": "D514", "codCatastale": "U2AR", "flagVariazione": 0 }, { "codISTAT": 84018, "codProvincia": "AG", "comune": "GROTTE", "cap": "92020", "codNazionale": "E209", "codCatastale": "U2AS", "flagVariazione": 0 }, { "codISTAT": 84019, "codProvincia": "AG", "comune": "JOPPOLO GIANCAXIO", "cap": "92010", "codNazionale": "E390", "codCatastale": "U2AT", "flagVariazione": 0 }, { "codISTAT": 84020, "codProvincia": "AG", "comune": "LAMPEDUSA E LINOSA", "cap": "92010", "codNazionale": "E431", "codCatastale": "U2AU", "flagVariazione": 0 }, { "codISTAT": 84021, "codProvincia": "AG", "comune": "LICATA", "cap": "92027", "codNazionale": "E573", "codCatastale": "U2AV", "flagVariazione": 0 }, { "codISTAT": 84022, "codProvincia": "AG", "comune": "LUCCA SICULA", "cap": "92010", "codNazionale": "E714", "codCatastale": "U2AW", "flagVariazione": 0 }, { "codISTAT": 84023, "codProvincia": "AG", "comune": "MENFI", "cap": "92013", "codNazionale": "F126", "codCatastale": "U2AX", "flagVariazione": 0 }, { "codISTAT": 84024, "codProvincia": "AG", "comune": "MONTALLEGRO", "cap": "92010", "codNazionale": "F414", "codCatastale": "U2AZ", "flagVariazione": 0 }, { "codISTAT": 84025, "codProvincia": "AG", "comune": "MONTEVAGO", "cap": "92010", "codNazionale": "F655", "codCatastale": "U2BA", "flagVariazione": 0 }, { "codISTAT": 84026, "codProvincia": "AG", "comune": "NARO", "cap": "92028", "codNazionale": "F845", "codCatastale": "U2BB", "flagVariazione": 0 }, { "codISTAT": 84027, "codProvincia": "AG", "comune": "PALMA DI MONTECHIARO", "cap": "92020", "codNazionale": "G282", "codCatastale": "U2BC", "flagVariazione": 0 }, { "codISTAT": 84028, "codProvincia": "AG", "comune": "PORTO EMPEDOCLE", "cap": "92014", "codNazionale": "F299", "codCatastale": "U2AY", "flagVariazione": 0 }, { "codISTAT": 84029, "codProvincia": "AG", "comune": "RACALMUTO", "cap": "92020", "codNazionale": "H148", "codCatastale": "U2BD", "flagVariazione": 0 }, { "codISTAT": 84030, "codProvincia": "AG", "comune": "RAFFADALI", "cap": "92015", "codNazionale": "H159", "codCatastale": "U2BE", "flagVariazione": 0 }, { "codISTAT": 84031, "codProvincia": "AG", "comune": "RAVANUSA", "cap": "92029", "codNazionale": "H194", "codCatastale": "U2BF", "flagVariazione": 0 }, { "codISTAT": 84032, "codProvincia": "AG", "comune": "REALMONTE", "cap": "92010", "codNazionale": "H205", "codCatastale": "U2BG", "flagVariazione": 0 }, { "codISTAT": 84033, "codProvincia": "AG", "comune": "RIBERA", "cap": "92016", "codNazionale": "H269", "codCatastale": "U2BH", "flagVariazione": 0 }, { "codISTAT": 84034, "codProvincia": "AG", "comune": "SAMBUCA DI SICILIA", "cap": "92017", "codNazionale": "H743", "codCatastale": "U2BI", "flagVariazione": 0 }, { "codISTAT": 84035, "codProvincia": "AG", "comune": "SAN BIAGIO PLATANI", "cap": "92020", "codNazionale": "H778", "codCatastale": "U2BJ", "flagVariazione": 0 }, { "codISTAT": 84036, "codProvincia": "AG", "comune": "SAN GIOVANNI GEMINI", "cap": "92020", "codNazionale": "H914", "codCatastale": "U2BK", "flagVariazione": 0 }, { "codISTAT": 84037, "codProvincia": "AG", "comune": "SANTA ELISABETTA", "cap": "92020", "codNazionale": "I185", "codCatastale": "U2BL", "flagVariazione": 0 }, { "codISTAT": 84038, "codProvincia": "AG", "comune": "SANTA MARGHERITA DI BELICE", "cap": "92018", "codNazionale": "I224", "codCatastale": "U2BM", "flagVariazione": 0 }, { "codISTAT": 84039, "codProvincia": "AG", "comune": "SANT'ANGELO MUXARO", "cap": "92020", "codNazionale": "I290", "codCatastale": "U2BN", "flagVariazione": 0 }, { "codISTAT": 84040, "codProvincia": "AG", "comune": "SANTO STEFANO QUISQUINA", "cap": "92020", "codNazionale": "I356", "codCatastale": "U2BP", "flagVariazione": 0 }, { "codISTAT": 84041, "codProvincia": "AG", "comune": "SCIACCA", "cap": "92019", "codNazionale": "I533", "codCatastale": "U2BQ", "flagVariazione": 0 }, { "codISTAT": 84042, "codProvincia": "AG", "comune": "SICULIANA", "cap": "92010", "codNazionale": "I723", "codCatastale": "U2BR", "flagVariazione": 0 }, { "codISTAT": 84043, "codProvincia": "AG", "comune": "VILLAFRANCA SICULA", "cap": "92020", "codNazionale": "L944", "codCatastale": "U2BS", "flagVariazione": 0 }] };
    res.send(comuni); //Sending some response when authenticated
});

app.get('/qualifica-sede', jwtMW /* Using the express jwt MW here */, (req, res) => {
    const data = {
        "qualifica": "caposquadra",
        "sede": "Via cavour nr.5"
    }
    res.send(data); //Sending some response when authenticated
});

app.get('/province', jwtMW /* Using the express jwt MW here */, (req, res) => {
    const province = { "table": [{ "codProvincia": "AG", "provincia": "AGRIGENTO", "codRegione": 19, "regione": "SICILIA" }, { "codProvincia": "AL", "provincia": "ALESSANDRIA", "codRegione": 1, "regione": "PIEMONTE" }, { "codProvincia": "AN", "provincia": "ANCONA", "codRegione": 11, "regione": "MARCHE" }, { "codProvincia": "AO", "provincia": "AOSTA", "codRegione": 2, "regione": "VALLE D'AOSTA" }, { "codProvincia": "AR", "provincia": "AREZZO", "codRegione": 9, "regione": "TOSCANA" }, { "codProvincia": "AP", "provincia": "ASCOLI PICENO", "codRegione": 11, "regione": "MARCHE" }, { "codProvincia": "AT", "provincia": "ASTI", "codRegione": 1, "regione": "PIEMONTE" }, { "codProvincia": "AV", "provincia": "AVELLINO", "codRegione": 15, "regione": "CAMPANIA" }, { "codProvincia": "BA", "provincia": "BARI", "codRegione": 16, "regione": "PUGLIA" }, { "codProvincia": "BT", "provincia": "BARLETTA-ANDRIA-TRANI", "codRegione": 16, "regione": "PUGLIA" }, { "codProvincia": "BL", "provincia": "BELLUNO", "codRegione": 5, "regione": "VENETO" }, { "codProvincia": "BN", "provincia": "BENEVENTO", "codRegione": 15, "regione": "CAMPANIA" }, { "codProvincia": "BG", "provincia": "BERGAMO", "codRegione": 3, "regione": "LOMBARDIA" }, { "codProvincia": "BI", "provincia": "BIELLA", "codRegione": 1, "regione": "PIEMONTE" }, { "codProvincia": "BO", "provincia": "BOLOGNA", "codRegione": 8, "regione": "EMILIA ROMAGNA" }, { "codProvincia": "BZ", "provincia": "BOLZANO", "codRegione": 4, "regione": "TRENTINO ALTO ADIGE" }, { "codProvincia": "BS", "provincia": "BRESCIA", "codRegione": 3, "regione": "LOMBARDIA" }, { "codProvincia": "BR", "provincia": "BRINDISI", "codRegione": 16, "regione": "PUGLIA" }, { "codProvincia": "CA", "provincia": "CAGLIARI", "codRegione": 20, "regione": "SARDEGNA" }, { "codProvincia": "CL", "provincia": "CALTANISSETTA", "codRegione": 19, "regione": "SICILIA" }, { "codProvincia": "CB", "provincia": "CAMPOBASSO", "codRegione": 14, "regione": "MOLISE" }, { "codProvincia": "CE", "provincia": "CASERTA", "codRegione": 15, "regione": "CAMPANIA" }, { "codProvincia": "CT", "provincia": "CATANIA", "codRegione": 19, "regione": "SICILIA" }, { "codProvincia": "CZ", "provincia": "CATANZARO", "codRegione": 18, "regione": "CALABRIA" }, { "codProvincia": "CH", "provincia": "CHIETI", "codRegione": 13, "regione": "ABRUZZO" }, { "codProvincia": "CO", "provincia": "COMO", "codRegione": 3, "regione": "LOMBARDIA" }, { "codProvincia": "CS", "provincia": "COSENZA", "codRegione": 18, "regione": "CALABRIA" }, { "codProvincia": "CR", "provincia": "CREMONA", "codRegione": 3, "regione": "LOMBARDIA" }, { "codProvincia": "KR", "provincia": "CROTONE", "codRegione": 18, "regione": "CALABRIA" }, { "codProvincia": "CN", "provincia": "CUNEO", "codRegione": 1, "regione": "PIEMONTE" }, { "codProvincia": "EN", "provincia": "ENNA", "codRegione": 19, "regione": "SICILIA" }, { "codProvincia": "FM", "provincia": "FERMO", "codRegione": 11, "regione": "MARCHE" }, { "codProvincia": "FE", "provincia": "FERRARA", "codRegione": 8, "regione": "EMILIA ROMAGNA" }, { "codProvincia": "FI", "provincia": "FIRENZE", "codRegione": 9, "regione": "TOSCANA" }, { "codProvincia": "FG", "provincia": "FOGGIA", "codRegione": 16, "regione": "PUGLIA" }, { "codProvincia": "FC", "provincia": "FORLI'-CESENA", "codRegione": 8, "regione": "EMILIA ROMAGNA" }, { "codProvincia": "FR", "provincia": "FROSINONE", "codRegione": 12, "regione": "LAZIO" }, { "codProvincia": "GE", "provincia": "GENOVA", "codRegione": 7, "regione": "LIGURIA" }, { "codProvincia": "GO", "provincia": "GORIZIA", "codRegione": 6, "regione": "FRIULI VENEZIA GIULIA" }, { "codProvincia": "GR", "provincia": "GROSSETO", "codRegione": 9, "regione": "TOSCANA" }, { "codProvincia": "IM", "provincia": "IMPERIA", "codRegione": 7, "regione": "LIGURIA" }, { "codProvincia": "IS", "provincia": "ISERNIA", "codRegione": 14, "regione": "MOLISE" }, { "codProvincia": "SP", "provincia": "LA SPEZIA", "codRegione": 7, "regione": "LIGURIA" }, { "codProvincia": "AQ", "provincia": "L'AQUILA", "codRegione": 13, "regione": "ABRUZZO" }, { "codProvincia": "LT", "provincia": "LATINA", "codRegione": 12, "regione": "LAZIO" }, { "codProvincia": "LE", "provincia": "LECCE", "codRegione": 16, "regione": "PUGLIA" }, { "codProvincia": "LC", "provincia": "LECCO", "codRegione": 3, "regione": "LOMBARDIA" }, { "codProvincia": "LI", "provincia": "LIVORNO", "codRegione": 9, "regione": "TOSCANA" }, { "codProvincia": "LO", "provincia": "LODI", "codRegione": 3, "regione": "LOMBARDIA" }, { "codProvincia": "LU", "provincia": "LUCCA", "codRegione": 9, "regione": "TOSCANA" }, { "codProvincia": "MC", "provincia": "MACERATA", "codRegione": 11, "regione": "MARCHE" }, { "codProvincia": "MN", "provincia": "MANTOVA", "codRegione": 3, "regione": "LOMBARDIA" }, { "codProvincia": "MS", "provincia": "MASSA", "codRegione": 9, "regione": "TOSCANA" }, { "codProvincia": "MT", "provincia": "MATERA", "codRegione": 17, "regione": "BASILICATA" }, { "codProvincia": "ME", "provincia": "MESSINA", "codRegione": 19, "regione": "SICILIA" }, { "codProvincia": "MI", "provincia": "MILANO", "codRegione": 3, "regione": "LOMBARDIA" }, { "codProvincia": "MO", "provincia": "MODENA", "codRegione": 8, "regione": "EMILIA ROMAGNA" }, { "codProvincia": "MB", "provincia": "MONZA E DELLA BRIANZA", "codRegione": 3, "regione": "LOMBARDIA" }, { "codProvincia": "NA", "provincia": "NAPOLI", "codRegione": 15, "regione": "CAMPANIA" }, { "codProvincia": "NO", "provincia": "NOVARA", "codRegione": 1, "regione": "PIEMONTE" }, { "codProvincia": "NU", "provincia": "NUORO", "codRegione": 20, "regione": "SARDEGNA" }, { "codProvincia": "OR", "provincia": "ORISTANO", "codRegione": 20, "regione": "SARDEGNA" }, { "codProvincia": "PD", "provincia": "PADOVA", "codRegione": 5, "regione": "VENETO" }, { "codProvincia": "PA", "provincia": "PALERMO", "codRegione": 19, "regione": "SICILIA" }, { "codProvincia": "PR", "provincia": "PARMA", "codRegione": 8, "regione": "EMILIA ROMAGNA" }, { "codProvincia": "PV", "provincia": "PAVIA", "codRegione": 3, "regione": "LOMBARDIA" }, { "codProvincia": "PG", "provincia": "PERUGIA", "codRegione": 10, "regione": "UMBRIA" }, { "codProvincia": "PU", "provincia": "PESARO-URBINO", "codRegione": 11, "regione": "MARCHE" }, { "codProvincia": "PE", "provincia": "PESCARA", "codRegione": 13, "regione": "ABRUZZO" }, { "codProvincia": "PC", "provincia": "PIACENZA", "codRegione": 8, "regione": "EMILIA ROMAGNA" }, { "codProvincia": "PI", "provincia": "PISA", "codRegione": 9, "regione": "TOSCANA" }, { "codProvincia": "PT", "provincia": "PISTOIA", "codRegione": 9, "regione": "TOSCANA" }, { "codProvincia": "PN", "provincia": "PORDENONE", "codRegione": 6, "regione": "FRIULI VENEZIA GIULIA" }, { "codProvincia": "PZ", "provincia": "POTENZA", "codRegione": 17, "regione": "BASILICATA" }, { "codProvincia": "PO", "provincia": "PRATO", "codRegione": 9, "regione": "TOSCANA" }, { "codProvincia": "SU", "provincia": "PROVINCIA DEL SUD SARDEGNA", "codRegione": 20, "regione": "SARDEGNA" }, { "codProvincia": "RG", "provincia": "RAGUSA", "codRegione": 19, "regione": "SICILIA" }, { "codProvincia": "RA", "provincia": "RAVENNA", "codRegione": 8, "regione": "EMILIA ROMAGNA" }, { "codProvincia": "RC", "provincia": "REGGIO CALABRIA", "codRegione": 18, "regione": "CALABRIA" }, { "codProvincia": "RE", "provincia": "REGGIO EMILIA", "codRegione": 8, "regione": "EMILIA ROMAGNA" }, { "codProvincia": "RI", "provincia": "RIETI", "codRegione": 12, "regione": "LAZIO" }, { "codProvincia": "RN", "provincia": "RIMINI", "codRegione": 8, "regione": "EMILIA ROMAGNA" }, { "codProvincia": "RM", "provincia": "ROMA", "codRegione": 12, "regione": "LAZIO" }, { "codProvincia": "RO", "provincia": "ROVIGO", "codRegione": 5, "regione": "VENETO" }, { "codProvincia": "SA", "provincia": "SALERNO", "codRegione": 15, "regione": "CAMPANIA" }, { "codProvincia": "SS", "provincia": "SASSARI", "codRegione": 20, "regione": "SARDEGNA" }, { "codProvincia": "SV", "provincia": "SAVONA", "codRegione": 7, "regione": "LIGURIA" }, { "codProvincia": "SI", "provincia": "SIENA", "codRegione": 9, "regione": "TOSCANA" }, { "codProvincia": "SR", "provincia": "SIRACUSA", "codRegione": 19, "regione": "SICILIA" }, { "codProvincia": "SO", "provincia": "SONDRIO", "codRegione": 3, "regione": "LOMBARDIA" }, { "codProvincia": "TA", "provincia": "TARANTO", "codRegione": 16, "regione": "PUGLIA" }, { "codProvincia": "TE", "provincia": "TERAMO", "codRegione": 13, "regione": "ABRUZZO" }, { "codProvincia": "TR", "provincia": "TERNI", "codRegione": 10, "regione": "UMBRIA" }, { "codProvincia": "TO", "provincia": "TORINO", "codRegione": 1, "regione": "PIEMONTE" }, { "codProvincia": "TP", "provincia": "TRAPANI", "codRegione": 19, "regione": "SICILIA" }, { "codProvincia": "TN", "provincia": "TRENTO", "codRegione": 4, "regione": "TRENTINO ALTO ADIGE" }, { "codProvincia": "TV", "provincia": "TREVISO", "codRegione": 5, "regione": "VENETO" }, { "codProvincia": "TS", "provincia": "TRIESTE", "codRegione": 6, "regione": "FRIULI VENEZIA GIULIA" }, { "codProvincia": "UD", "provincia": "UDINE", "codRegione": 6, "regione": "FRIULI VENEZIA GIULIA" }, { "codProvincia": "VA", "provincia": "VARESE", "codRegione": 3, "regione": "LOMBARDIA" }, { "codProvincia": "VE", "provincia": "VENEZIA", "codRegione": 5, "regione": "VENETO" }, { "codProvincia": "VB", "provincia": "VERBANO-CUSIO-OSSOLA", "codRegione": 1, "regione": "PIEMONTE" }, { "codProvincia": "VC", "provincia": "VERCELLI", "codRegione": 1, "regione": "PIEMONTE" }, { "codProvincia": "VR", "provincia": "VERONA", "codRegione": 5, "regione": "VENETO" }, { "codProvincia": "VV", "provincia": "VIBO VALENTIA", "codRegione": 18, "regione": "CALABRIA" }, { "codProvincia": "VI", "provincia": "VICENZA", "codRegione": 5, "regione": "VENETO" }, { "codProvincia": "VT", "provincia": "VITERBO", "codRegione": 12, "regione": "LAZIO" }] };

    res.send(province); //Sending some response when authenticated
});

app.get('/titoli', jwtMW /* Using the express jwt MW here */, (req, res) => {
    const titoli = [
        { "Id": 1, "Descrizione": "Aver prestato lodevole servizio nelle amministrazioni pubbliche" },
        { "Id": 2, "Descrizione": "Orfano di guerra" },
        { "Id": 3, "Descrizione": "Orfano di caduti per fatto di guerra" },
        { "Id": 4, "Descrizione": "Orfano di caduti per servizio nel settore pubblico e privato" },
        { "Id": 5, "Descrizione": "Ferito in combattimento" },
        { "Id": 6, "Descrizione": "Insignito di croce di guerra o di altra attestazione speciale di merito di guerra nonchè capo di famiglia numerosa" },
        { "Id": 7, "Descrizione": "Figlio di mutilati ed invalidi di guerra ex combattenti" },
        { "Id": 8, "Descrizione": "Figlio di mutilati ed invalidi per fatto di guerra" },
        { "Id": 9, "Descrizione": "Figlio di mutilati ed invalidi per servizio nel settore pubblico e privato" },
        { "Id": 10, "Descrizione": "Genitore vedovo non risposato, coniuge non risposato e le sorelle ed i fratelli vedovi o non sposati dei caduti per fatto di guerra" },
        { "Id": 11, "Descrizione": "Genitore vedovo non risposato, coniuge non risposato e le sorelle ed i fratelli vedovi o non sposati dei caduti di guerra" },
        { "Id": 12, "Descrizione": "Genitore vedovo non risposato, coniuge non risposato e le sorelle ed i fratelli vedovi o non sposati dei caduti per servizio nel settore pubblico o privato" },
        { "Id": 13, "Descrizione": "Aver prestato servizio militare come combattente" },
        { "Id": 14, "Descrizione": "Aver prestato lodevole servizio a qualunque titolo, per non meno di un anno, nell'amministrazione che ha indetto il concorso" },
        { "Id": 15, "Descrizione": "Insignito di medaglia al valor militare" },
        { "Id": 16, "Descrizione": "Militare volontario delle forze armate congedato senza demerito al termine della ferma o rafferma" },
        { "Id": 17, "Descrizione": "Coniugato e non coniugato con riguardo al numero di figli a carico"}
    ];
    res.send(titoli); //Sending some response when authenticated
});


app.get('/domanda', jwtMW /* Using the express jwt MW here */, (req, res) => {

    res.send(domanda); //Sending some response when authenticated
});

app.put('/domanda', jwtMW /* Using the express jwt MW here */, (req, res) => {
    domanda = req.body;
    res.send(domanda); //Sending some response when authenticated
});



// Error handling
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});

// Starting the app on PORT 3000
const PORT = 8080;
app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`Magic happens on port ${PORT}`);
});
