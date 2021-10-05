// ----- Import libraries -----

const path = require('path');
const express = require('express');
require('dotenv').config();

const characterRoutes = require('./routes/characters');

// ----- Data -----

const credentials = {
    userEmail: 'davidcarvajalg@gmail.com',
    userPass: '1234admin'
};

// ----- Define constants -----
//    (Configuración inicial)

const server = express();
//const port = process.env.PORT;
const port = 8080;

// Folder with my frontend
const frontFolder = express.static(__dirname + '/front');
server.use(frontFolder);

//server.use(express.static(path.join(__dirname, 'front'), {extensions:['html']}));

// JSON support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/*
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
*/




// /characters/ 
// /characters/name
// /characters/Fry/23
// /characters/profile
// /characters/new
// /characters/update
// /characters/delete

// /monsters/ 
// /monsters/name
// /monsters/Fry/23
// /monsters/profile
// /monsters/new
// /monsters/update
// /monsters/delete

server.use('/characters', characterRoutes);
//server.use('/monters', monsterRoutes);

// ----- Endpoints -----

server.get('/myjson', (req, res) => {

    // JSON response
    const respuesta = {
        "nombre": "Espagueti",
        "apellido": "Volador",
        "habilidades": ["Node", "Mongo"],
        "vacaciones": {
            "lugar1": "Benidorm",
            "lugar2": "Groenlandia"
        }
    }

    res.send(respuesta);
});

server.get('/hello', (req, res) => {
    const username = req.query.user;
    const password = req.query.pass;

    res.send("Hello, " + username);
});

server.post('/signup', (req, res) => {
    const name = req.body.firstname;
    const email = req.body.email;
    const country = req.body.country;

    // Business logic
    if(country === "es") {
        console.log("Enviar el email en castellano");
    }
    else
    if(country === "uk") {
        console.log("Send english email");
    }

    res.redirect('/contact');

    // 1: Cliente -- POST --> Servidor
    // 2: Servidor recoge los datos
    // 3: Servidor procesa los datos
    // 4: Cliente <-- status code -- Servidor
});

let token = "6g4abc6801fe6g4abc6801fe6g4abc6801fe";

server.post('/login', (req, res) => {
    if(req.body.email === credentials.userEmail && req.body.password === credentials.userPass) {
        
        // Send "auth token" = 6g4abc6801fe6g4abc6801fe6g4abc6801fe
        res.redirect('/dashboard.html')
    }
    else {
        res.redirect('/login.html')
    }
});

server.all('/auth', (req, res, next) => {
    if(req.body.token === token) {
        next()
    }
    else {
        res.redirect('/login.html');
    }
},
(req, res, next) => {
    // ...
    next();
},
(req, res) => {
    res.redirect('/dashboard.html');
});

server.use((req, res) => res.status(404).send('Estos no son los androides que buscas'));

// ----- Start server -----

server.listen(port,
    () => console.log(`Server started listening on ${port}`)
);