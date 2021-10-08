// ----- Import libraries -----

const path = require('path');
const express = require('express');
require('dotenv').config();

//const characterRoutes = require('./routes/characters');

// ----- Database -----

const MongoClient = require('mongodb').MongoClient;
const urlDatabase = "mongodb://localhost:27017/";

// ----- Define constants -----
//    (Configuración inicial)

const server = express();
const port = process.env.PORT;

// Folder with my frontend
server.use(express.static(path.join(__dirname, 'front'), {extensions:['html']}));

// JSON support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//server.use('/characters', characterRoutes);

// ----- Endpoints -----
server.post('/newMonster', (request, response) => {

    const monster = { name: "Candyman", year: 1993 };

    MongoClient.connect(urlDatabase, function(err, db) {
        if (err) throw err;
        var dbo = db.db("halloweendb");
        
        dbo.collection("monsters").insertOne(monster, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
    });

    response.send("Ok");
});

server.get('/monsters', (request, response) => {
    try {
        MongoClient.connect(urlDatabase, (error, database) => {
            const dbo = database.db("halloweendb"); // use halloweendb

            try {
                dbo
                    .collection("monsters")
                    .find({}, { projection: { _id: 0, name: 1, year: 1 }})
                    .toArray((error2, result) => {
                        response.send(result);
                        database.close();
                    });
            }
            catch(error2) {
                console.log(error2);
                database.close();
            }
        });
    }
    catch(error) {
        console.log(error);
    }
});

server.use((req, res) => res.status(404).send('Estos no son los androides que buscas'));

// ----- Start server -----

server.listen(port,
    () => console.log(`Server started listening on ${port}`)
);