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

// Endpoints

server.get('/', (req, res) => {
    res.send("<h1>Un mensaje de texto</h1>");
});

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

server.use((req, res) => res.status(404).send('Estos no son los androides que buscas'));

// ----- Start server -----

server.listen(port,
    () => console.log(`Server started listening on ${port}`)
);