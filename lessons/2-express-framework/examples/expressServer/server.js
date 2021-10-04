// ----- Import libraries -----

const express = require('express');

// ----- Define constants -----
//    (Configuración inicial)

const server = express();
const port = 8080;

// Folder with my frontend
const frontFolder = express.static(__dirname + '/front');
server.use(frontFolder);

// JSON support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

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

    res.redirect('/contact.html');

    // 1: Cliente -- POST --> Servidor
    // 2: Servidor recoge los datos
    // 3: Servidor procesa los datos
    // 4: Cliente <-- status code -- Servidor
});

server.use((req, res) => res.status(404).send('Estos no son los androides que buscas'));

// ----- Start server -----

server.listen(port,
    () => console.log(`Server started listening on ${port}`)
);