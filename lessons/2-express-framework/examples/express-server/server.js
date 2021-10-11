// ----- Import libraries -----

const path = require('path');
const express = require('express');
require('dotenv').config();

const characterRoutes = require('./routes/characters');

// ----- Define constants -----

const server = express();
const port = process.env.PORT;

// Folder with my frontend
/*
// With extensions version
const frontFolder = express.static(__dirname + '/front');
server.use(frontFolder);
*/
// Without extensions version
server.use(express.static(path.join(__dirname, 'front'), {extensions:['html']}));

// JSON support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use('/characters', characterRoutes);

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

    setTimeout(() => {
        if (req.query.user) {
            res.send("Hello, " + req.query.user);
        }
        else {
            res.send("Hello, nobody");
        }
    }, 2000);
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
});

server.use((req, res) => res.status(404).send('Estos no son los androides que buscas'));

// ----- Start server -----

server.listen(port,
    () => console.log(`Server started listening on ${port}`)
);