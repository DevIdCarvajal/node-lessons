const mongoose = require('mongoose');
const { Schema } = mongoose;

const NeasSchema = new Schema({
  // Campos del NEA
  // ...
});

const model = mongoose.model('Neas', NeasSchema);

module.exports = model;
