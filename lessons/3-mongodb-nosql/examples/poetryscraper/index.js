const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const urlDatabase = process.env.DBHOST;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

const Author = require('./data/models/Author.js');
const Book = require('./data/models/Book.js');
const Poem = require('./data/models/Poem.js');

mongoose.connect(urlDatabase, mongoOptions);

const server = express();
const port = process.env.PORT || 8080;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(cors());

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get("/", function(req, res) {
  res.status(200).json({ error: "Endpoint without data" });
});

server.get("/authors", function(req, res) {
  Author.find({}, function (err, docs) {
    if (err) {
      res.status(200).json({ error: "Database error" });
    }
    else {
      res.status(200).json(docs);
    }
  });
});

server.get("/books/:idAuthor", function(req, res) {
  Book.find({ idAuthor: req.params.idAuthor }, function (err, docs) {
    if (err) {
      res.status(200).json({ error: "Database error" });
    }
    else {
      res.status(200).json(docs);
    }
  });
});

server.get("/poems/:idBook", function(req, res) {
  Poem.find({ idBook: req.params.idBook }, function (err, docs) {
    if (err) {
      res.status(200).json({ error: "Database error" });
    }
    else {
      res.status(200).json(docs);
    }
  });
});

server.listen(port, () => `Listening on ${port}`);