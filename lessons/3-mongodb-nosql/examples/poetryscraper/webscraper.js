const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
require('dotenv').config();

const urlDatabase = process.env.DBHOST;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

const Counter = require('./data/models/Counter.js');
const Poem = require('./data/models/Poem.js');

mongoose.connect(urlDatabase, mongoOptions);

function insertNew(model, doc) {
  Counter.findByIdAndUpdate(`id${model}`, { $inc: { 'next': 1 }}, { new: true }, function (err, counter) {
    if (err) throw err;

    const newPoem = new Poem({ _id: counter.next, ...doc });
    newPoem.save().then(() => console.log("Poema insertado"));
  });
}

async function webscraper(url, idBook, idAuthor) {
  if (url) {
    const html = await axios.get(url);
    const $ = await cheerio.load(html.data);

    const title = $('h2.title-poem').text();
    
    let verses = [];
    let p = 1;
    let first = true;
    
    $('#contentfont p')
      .html()
      .split("<br>")
      .map(line => {
        const verse = line.trim();
        
        if (verse !== "") {
          if (first) {
            p = 1;
            first = false;
          }

          verses.push({ text: verse, paragraph: p });
        }
        else
          p++;
      });
    
    insertNew('Poem', { title, verses, idBook, idAuthor });
  }
  else {
    console.log("No se indicó URL a scrapear");
  }
}

const urlPoem = '';
webscraper(urlPoem, 1, 1);