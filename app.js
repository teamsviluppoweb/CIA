

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
const get = require('simple-get')


var expiresIn = 3000;
// Instantiating the express app
const app = express();
let domanda = {

	"id": null,

	"idDomanda": null,

	"versione": 0,

	"dataInvio": "2019-06-20T08:19:00.217Z",

	"anagCandidato": {

		"codiceFiscale": "MRCGLC72P20H501T",

		"cognome": "MARCIANO",

		"nome": "GIANLUCA",

		"dataNascita": "1972-09-20T00:00:00",

		"codComuneNascita": "58091",

		"comuneNascita": "ROMA",

		"codprovNascita": "RM",

		"domicilio": "VIA CARLO PIRZIO BIROLI, 111 - 00043 CIAMPINO (RM)",

		"telefono": "0 0",

		"email": "gianluca.marciano@vigilfuoco.it",

		"codQualifica": "263",

		"descQualifica": "COLL TECNICO-INFORMATICO",

		"nomeQualifica": "CTI",

		"codSede": "8L",

		"descSede": "Ufficio per i servizi informatici"

	},

	"titoliStudioPosseduti": [

		{

			"idTipologia": 1,

			"tipologia": "laurea",

			"idTS": "D008",

			"descTS": "prova desc",

			"idIndirizzoTS": "45",

			"indirizzoTS": "fdfdfd dfdfds",

			"dataConseguimento": "1979-12-31T23:00:00Z",

			"istituto": "La Sapienza, Roma",

			"luogo": "via roma 12",

			"durataAnni": "3 anni"

		},

		{

			"idTipologia": 2,

			"tipologia": "laurea",

			"idTS": "D008",

			"descTS": "prova desc",

			"idIndirizzoTS": "45",

			"indirizzoTS": "fdfdfd dfdfds",

			"dataConseguimento": "1979-12-31T23:00:00Z",

			"istituto": "La Sapienza, Roma",

			"luogo": "via roma 12",

			"durataAnni": "3 anni"

		}

	],

	"corsiAggAmm": [

		{

			"idCorso": "Tipologia corso 1",

			"tipologiaCorso": "2 mesi",

			"DescCorso": "",

			"Sorgente": "",

			"GiorniCorso": "",

			"OreCorso": "",

			"dataInizio": "1990-01-05T23:00:00Z",

			"dataFine": "1990-01-07T23:00:00Z",

			"CodiceCorso": "Istituto Formazione, Udine"

		}

	],

	"protocollo":

	{

		"id": "11936",

		"numero": "290",

		"data": "2019-07-19T23:00:00Z"

	}

};


// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

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

/**
 * 
 * GET CORSI
 * 
 */

app.get('/corsi', jwtMW /* Using the express jwt MW here */, (req, res) => {

    let oggetto;

    const opts = {
        url: 'http://webpc.dipvvf.it:6001/Corsi',
        json: true,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsVHlwZSI6WyJVc2VybmFtZVBhc3N3b3JkQ3JlZGVudGlhbCJdLCJhdWQiOiJodHRwOi8vMTcyLjE2LjI2LjcyOjQyMDAvIiwic3ViIjoiQkxMUFJJNjlUMjhMNDgzSyIsImlzRnJvbU5ld0xvZ2luIjpbInRydWUiXSwiYXV0aGVudGljYXRpb25EYXRlIjpbIjIwMTktMDktMDlUMTQ6MTA6MTUuNDg3MDI3WiJdLCJhdXRoZW50aWNhdGlvbk1ldGhvZCI6WyJTdGF0aWMgQ3JlZGVudGlhbHMiXSwic3VjY2Vzc2Z1bEF1dGhlbnRpY2F0aW9uSGFuZGxlcnMiOlsiU3RhdGljIENyZWRlbnRpYWxzIl0sImlzcyI6Imh0dHBzOi8vd2VicGMuZGlwdnZmLml0Ojg0NDMvY2FzIiwibG9uZ1Rlcm1BdXRoZW50aWNhdGlvblJlcXVlc3RUb2tlblVzZWQiOlsiZmFsc2UiXSwiZXhwIjoxNTc2NTcyODQ0LCJpYXQiOjE1NzY1NzI4NDQsImp0aSI6IlNULTEtdG5BWEtTY1JHeU1IOGU1MjkxRUdqTEEzVENFLWpvZWctVmlydHVhbEJveCJ9.CZ6O43c6J1st0IYHh1l3JmNnnh3bebdzNXshJKhFGbcmtxhFtfGpwUE3gGdfDw2_dttIbuvIoytP6J21flIsoQ',
            'Content-Type' :  'application/x-www-form-urlencoded'
          }
      }

    get.concat(opts, function (err, res, data) {
      if (err) throw err
      oggetto = data // `res` is a stream
    })

    setTimeout(function(){
        console.log('dsds');
        res.send(oggetto);
    }, 2000);

    //Sending some response when authenticated
});

/**
 * 
 * GET QUALIFICHE
 * 
 */

app.get('/qualifiche', jwtMW /* Using the express jwt MW here */, (req, res) => {

    let oggetto;

    const opts = {
        url: 'http://webpc.dipvvf.it:6001/Qualifiche',
        json: true,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsVHlwZSI6WyJVc2VybmFtZVBhc3N3b3JkQ3JlZGVudGlhbCJdLCJhdWQiOiJodHRwOi8vMTcyLjE2LjI2LjcyOjQyMDAvIiwic3ViIjoiQkxMUFJJNjlUMjhMNDgzSyIsImlzRnJvbU5ld0xvZ2luIjpbInRydWUiXSwiYXV0aGVudGljYXRpb25EYXRlIjpbIjIwMTktMDktMDlUMTQ6MTA6MTUuNDg3MDI3WiJdLCJhdXRoZW50aWNhdGlvbk1ldGhvZCI6WyJTdGF0aWMgQ3JlZGVudGlhbHMiXSwic3VjY2Vzc2Z1bEF1dGhlbnRpY2F0aW9uSGFuZGxlcnMiOlsiU3RhdGljIENyZWRlbnRpYWxzIl0sImlzcyI6Imh0dHBzOi8vd2VicGMuZGlwdnZmLml0Ojg0NDMvY2FzIiwibG9uZ1Rlcm1BdXRoZW50aWNhdGlvblJlcXVlc3RUb2tlblVzZWQiOlsiZmFsc2UiXSwiZXhwIjoxNTc2NTcyODQ0LCJpYXQiOjE1NzY1NzI4NDQsImp0aSI6IlNULTEtdG5BWEtTY1JHeU1IOGU1MjkxRUdqTEEzVENFLWpvZWctVmlydHVhbEJveCJ9.CZ6O43c6J1st0IYHh1l3JmNnnh3bebdzNXshJKhFGbcmtxhFtfGpwUE3gGdfDw2_dttIbuvIoytP6J21flIsoQ',
            'Content-Type' :  'application/x-www-form-urlencoded'
          }
      }

    get.concat(opts, function (err, res, data) {
      if (err) throw err
      oggetto = data // `res` is a stream
    })

    setTimeout(function(){
        res.send(oggetto);
    }, 2000);

    //Sending some response when authenticated
});


/**
 * 
 * GET SEDI
 * 
 */

app.get('/sedi', jwtMW /* Using the express jwt MW here */, (req, res) => {

    let oggetto;

    const opts = {
        url: 'http://webpc.dipvvf.it:6001/sedi',
        json: true,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsVHlwZSI6WyJVc2VybmFtZVBhc3N3b3JkQ3JlZGVudGlhbCJdLCJhdWQiOiJodHRwOi8vMTcyLjE2LjI2LjcyOjQyMDAvIiwic3ViIjoiQkxMUFJJNjlUMjhMNDgzSyIsImlzRnJvbU5ld0xvZ2luIjpbInRydWUiXSwiYXV0aGVudGljYXRpb25EYXRlIjpbIjIwMTktMDktMDlUMTQ6MTA6MTUuNDg3MDI3WiJdLCJhdXRoZW50aWNhdGlvbk1ldGhvZCI6WyJTdGF0aWMgQ3JlZGVudGlhbHMiXSwic3VjY2Vzc2Z1bEF1dGhlbnRpY2F0aW9uSGFuZGxlcnMiOlsiU3RhdGljIENyZWRlbnRpYWxzIl0sImlzcyI6Imh0dHBzOi8vd2VicGMuZGlwdnZmLml0Ojg0NDMvY2FzIiwibG9uZ1Rlcm1BdXRoZW50aWNhdGlvblJlcXVlc3RUb2tlblVzZWQiOlsiZmFsc2UiXSwiZXhwIjoxNTc2NTcyODQ0LCJpYXQiOjE1NzY1NzI4NDQsImp0aSI6IlNULTEtdG5BWEtTY1JHeU1IOGU1MjkxRUdqTEEzVENFLWpvZWctVmlydHVhbEJveCJ9.CZ6O43c6J1st0IYHh1l3JmNnnh3bebdzNXshJKhFGbcmtxhFtfGpwUE3gGdfDw2_dttIbuvIoytP6J21flIsoQ',
            'Content-Type' :  'application/x-www-form-urlencoded'
          }
      }

    get.concat(opts, function (err, res, data) {
      if (err) throw err
      oggetto = data // `res` is a stream
    })

    setTimeout(function(){
        res.send(oggetto);
    }, 2000);

    //Sending some response when authenticated
});

/**
 * 
 * GET TITOLI STUDIO / TIPOLOGIE
 * 
 */

app.get('/titoliStudio/tipologie', jwtMW /* Using the express jwt MW here */, (req, res) => {

    let oggetto;

    const opts = {
        url: 'http://webpc.dipvvf.it:6001/titoliStudio/tipologie',
        json: true,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsVHlwZSI6WyJVc2VybmFtZVBhc3N3b3JkQ3JlZGVudGlhbCJdLCJhdWQiOiJodHRwOi8vMTcyLjE2LjI2LjcyOjQyMDAvIiwic3ViIjoiQkxMUFJJNjlUMjhMNDgzSyIsImlzRnJvbU5ld0xvZ2luIjpbInRydWUiXSwiYXV0aGVudGljYXRpb25EYXRlIjpbIjIwMTktMDktMDlUMTQ6MTA6MTUuNDg3MDI3WiJdLCJhdXRoZW50aWNhdGlvbk1ldGhvZCI6WyJTdGF0aWMgQ3JlZGVudGlhbHMiXSwic3VjY2Vzc2Z1bEF1dGhlbnRpY2F0aW9uSGFuZGxlcnMiOlsiU3RhdGljIENyZWRlbnRpYWxzIl0sImlzcyI6Imh0dHBzOi8vd2VicGMuZGlwdnZmLml0Ojg0NDMvY2FzIiwibG9uZ1Rlcm1BdXRoZW50aWNhdGlvblJlcXVlc3RUb2tlblVzZWQiOlsiZmFsc2UiXSwiZXhwIjoxNTc2NTcyODQ0LCJpYXQiOjE1NzY1NzI4NDQsImp0aSI6IlNULTEtdG5BWEtTY1JHeU1IOGU1MjkxRUdqTEEzVENFLWpvZWctVmlydHVhbEJveCJ9.CZ6O43c6J1st0IYHh1l3JmNnnh3bebdzNXshJKhFGbcmtxhFtfGpwUE3gGdfDw2_dttIbuvIoytP6J21flIsoQ',
            'Content-Type' :  'application/x-www-form-urlencoded'
          }
      }

    get.concat(opts, function (err, res, data) {
      if (err) throw err
      oggetto = data // `res` is a stream
    })

    setTimeout(function(){
        res.send(oggetto);
    }, 2000);

    //Sending some response when authenticated
});

/**
 * 
 * GET TITOLI STUDIO / TITOLI / ID
 * 
 */

app.get('/titoliStudio/titoli/:idTitolo', jwtMW /* Using the express jwt MW here */, (req, res) => {

    const idTitolo = req.params['idTitolo'];

    let oggetto;

    const opts = {
        url: 'http://webpc.dipvvf.it:6001/titoliStudio/titoli/' + idTitolo,
        json: true,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsVHlwZSI6WyJVc2VybmFtZVBhc3N3b3JkQ3JlZGVudGlhbCJdLCJhdWQiOiJodHRwOi8vMTcyLjE2LjI2LjcyOjQyMDAvIiwic3ViIjoiQkxMUFJJNjlUMjhMNDgzSyIsImlzRnJvbU5ld0xvZ2luIjpbInRydWUiXSwiYXV0aGVudGljYXRpb25EYXRlIjpbIjIwMTktMDktMDlUMTQ6MTA6MTUuNDg3MDI3WiJdLCJhdXRoZW50aWNhdGlvbk1ldGhvZCI6WyJTdGF0aWMgQ3JlZGVudGlhbHMiXSwic3VjY2Vzc2Z1bEF1dGhlbnRpY2F0aW9uSGFuZGxlcnMiOlsiU3RhdGljIENyZWRlbnRpYWxzIl0sImlzcyI6Imh0dHBzOi8vd2VicGMuZGlwdnZmLml0Ojg0NDMvY2FzIiwibG9uZ1Rlcm1BdXRoZW50aWNhdGlvblJlcXVlc3RUb2tlblVzZWQiOlsiZmFsc2UiXSwiZXhwIjoxNTc2NTcyODQ0LCJpYXQiOjE1NzY1NzI4NDQsImp0aSI6IlNULTEtdG5BWEtTY1JHeU1IOGU1MjkxRUdqTEEzVENFLWpvZWctVmlydHVhbEJveCJ9.CZ6O43c6J1st0IYHh1l3JmNnnh3bebdzNXshJKhFGbcmtxhFtfGpwUE3gGdfDw2_dttIbuvIoytP6J21flIsoQ',
            'Content-Type' :  'application/x-www-form-urlencoded'
          }
      }

    get.concat(opts, function (err, res, data) {
      if (err) throw err
      oggetto = data // `res` is a stream
    })

    setTimeout(function(){
        res.send(oggetto);
    }, 2000);

    //Sending some response when authenticated
});



/**
 * 
 * GET TITOLI STUDIO / INDIRIZZI / ID INDIRIZZI
 * 
 */

app.get('/titoliStudio/indirizzi/:idIndirizzi', jwtMW /* Using the express jwt MW here */, (req, res) => {

    const idIndirizzi = req.params['idIndirizzi'];

    let oggetto;

    const opts = {
        url: 'http://webpc.dipvvf.it:6001/titoliStudio/indirizzi/' + idIndirizzi,
        json: true,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsVHlwZSI6WyJVc2VybmFtZVBhc3N3b3JkQ3JlZGVudGlhbCJdLCJhdWQiOiJodHRwOi8vMTcyLjE2LjI2LjcyOjQyMDAvIiwic3ViIjoiQkxMUFJJNjlUMjhMNDgzSyIsImlzRnJvbU5ld0xvZ2luIjpbInRydWUiXSwiYXV0aGVudGljYXRpb25EYXRlIjpbIjIwMTktMDktMDlUMTQ6MTA6MTUuNDg3MDI3WiJdLCJhdXRoZW50aWNhdGlvbk1ldGhvZCI6WyJTdGF0aWMgQ3JlZGVudGlhbHMiXSwic3VjY2Vzc2Z1bEF1dGhlbnRpY2F0aW9uSGFuZGxlcnMiOlsiU3RhdGljIENyZWRlbnRpYWxzIl0sImlzcyI6Imh0dHBzOi8vd2VicGMuZGlwdnZmLml0Ojg0NDMvY2FzIiwibG9uZ1Rlcm1BdXRoZW50aWNhdGlvblJlcXVlc3RUb2tlblVzZWQiOlsiZmFsc2UiXSwiZXhwIjoxNTc2NTcyODQ0LCJpYXQiOjE1NzY1NzI4NDQsImp0aSI6IlNULTEtdG5BWEtTY1JHeU1IOGU1MjkxRUdqTEEzVENFLWpvZWctVmlydHVhbEJveCJ9.CZ6O43c6J1st0IYHh1l3JmNnnh3bebdzNXshJKhFGbcmtxhFtfGpwUE3gGdfDw2_dttIbuvIoytP6J21flIsoQ',
            'Content-Type' :  'application/x-www-form-urlencoded'
          }
      }

    get.concat(opts, function (err, res, data) {
      if (err) throw err
      oggetto = data // `res` is a stream
    })

    setTimeout(function(){
        res.send(oggetto);
    }, 2000);

    //Sending some response when authenticated
});


/**
 * 
 * GET PROVINCE
 * 
 */

app.get('/province', jwtMW /* Using the express jwt MW here */, (req, res) => {


    let oggetto;

    const opts = {
        url: 'http://webpc.dipvvf.it:6001/province',
        json: true,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsVHlwZSI6WyJVc2VybmFtZVBhc3N3b3JkQ3JlZGVudGlhbCJdLCJhdWQiOiJodHRwOi8vMTcyLjE2LjI2LjcyOjQyMDAvIiwic3ViIjoiQkxMUFJJNjlUMjhMNDgzSyIsImlzRnJvbU5ld0xvZ2luIjpbInRydWUiXSwiYXV0aGVudGljYXRpb25EYXRlIjpbIjIwMTktMDktMDlUMTQ6MTA6MTUuNDg3MDI3WiJdLCJhdXRoZW50aWNhdGlvbk1ldGhvZCI6WyJTdGF0aWMgQ3JlZGVudGlhbHMiXSwic3VjY2Vzc2Z1bEF1dGhlbnRpY2F0aW9uSGFuZGxlcnMiOlsiU3RhdGljIENyZWRlbnRpYWxzIl0sImlzcyI6Imh0dHBzOi8vd2VicGMuZGlwdnZmLml0Ojg0NDMvY2FzIiwibG9uZ1Rlcm1BdXRoZW50aWNhdGlvblJlcXVlc3RUb2tlblVzZWQiOlsiZmFsc2UiXSwiZXhwIjoxNTc2NTcyODQ0LCJpYXQiOjE1NzY1NzI4NDQsImp0aSI6IlNULTEtdG5BWEtTY1JHeU1IOGU1MjkxRUdqTEEzVENFLWpvZWctVmlydHVhbEJveCJ9.CZ6O43c6J1st0IYHh1l3JmNnnh3bebdzNXshJKhFGbcmtxhFtfGpwUE3gGdfDw2_dttIbuvIoytP6J21flIsoQ',
            'Content-Type' :  'application/x-www-form-urlencoded'
          }
      }

    get.concat(opts, function (err, res, data) {
      if (err) throw err
      oggetto = data // `res` is a stream
    })

    setTimeout(function(){
        res.send(oggetto);
    }, 2000);

    //Sending some response when authenticated
});


/**
 * 
 * GET TITOLI STUDIO / INDIRIZZI / ID INDIRIZZI
 * 
 */

app.get('/province/:codProvincia', jwtMW /* Using the express jwt MW here */, (req, res) => {

    const codProvincia = req.params['codProvincia'];

    let oggetto;

    const opts = {
        url: 'http://webpc.dipvvf.it:6001/province/' + codProvincia,
        json: true,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsVHlwZSI6WyJVc2VybmFtZVBhc3N3b3JkQ3JlZGVudGlhbCJdLCJhdWQiOiJodHRwOi8vMTcyLjE2LjI2LjcyOjQyMDAvIiwic3ViIjoiQkxMUFJJNjlUMjhMNDgzSyIsImlzRnJvbU5ld0xvZ2luIjpbInRydWUiXSwiYXV0aGVudGljYXRpb25EYXRlIjpbIjIwMTktMDktMDlUMTQ6MTA6MTUuNDg3MDI3WiJdLCJhdXRoZW50aWNhdGlvbk1ldGhvZCI6WyJTdGF0aWMgQ3JlZGVudGlhbHMiXSwic3VjY2Vzc2Z1bEF1dGhlbnRpY2F0aW9uSGFuZGxlcnMiOlsiU3RhdGljIENyZWRlbnRpYWxzIl0sImlzcyI6Imh0dHBzOi8vd2VicGMuZGlwdnZmLml0Ojg0NDMvY2FzIiwibG9uZ1Rlcm1BdXRoZW50aWNhdGlvblJlcXVlc3RUb2tlblVzZWQiOlsiZmFsc2UiXSwiZXhwIjoxNTc2NTcyODQ0LCJpYXQiOjE1NzY1NzI4NDQsImp0aSI6IlNULTEtdG5BWEtTY1JHeU1IOGU1MjkxRUdqTEEzVENFLWpvZWctVmlydHVhbEJveCJ9.CZ6O43c6J1st0IYHh1l3JmNnnh3bebdzNXshJKhFGbcmtxhFtfGpwUE3gGdfDw2_dttIbuvIoytP6J21flIsoQ',
            'Content-Type' :  'application/x-www-form-urlencoded'
          }
      }

    get.concat(opts, function (err, res, data) {
      if (err) throw err
      oggetto = data // `res` is a stream
    })

    setTimeout(function(){
        res.send(oggetto);
    }, 2000);

    //Sending some response when authenticated
});



/**
 * 
 * GET DOMANDA
 * 
 */


app.get('/domanda', jwtMW /* Using the express jwt MW here */, (req, res) => {

    res.send(domanda);


});


/**
 * 
 * POST DOMANDA
 * 
 */

// LOGIN ROUTE
app.post('/domanda', jwtMW /* Using the express jwt MW here */, (req, res) => {
    // const { username, password } =;
    
    res.send(req.body);

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
