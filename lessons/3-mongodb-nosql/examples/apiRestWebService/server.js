// ----- Import libraries -----

const path = require('path');
const express = require('express');
require('dotenv').config();

const characterRoutes = require('./routes/characters');

// ----- Data -----

// ...

// ----- Define constants -----
//    (Configuración inicial)

const server = express();
const port = process.env.PORT;

// Folder with my frontend
/*
const frontFolder = express.static(__dirname + '/front');
server.use(frontFolder);
*/
server.use(express.static(path.join(__dirname, 'front'), {extensions:['html']}));

// JSON support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use('/characters', characterRoutes);

// ----- Endpoints -----

// ...

server.use((req, res) => res.status(404).send('Estos no son los androides que buscas'));

// ----- Start server -----

server.listen(port,
    () => console.log(`Server started listening on ${port}`)
);