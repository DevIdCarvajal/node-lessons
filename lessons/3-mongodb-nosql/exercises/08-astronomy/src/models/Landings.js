const mongoose = require('mongoose');
const { Schema } = mongoose;

const LandingsSchema = new Schema({
  // Campos del esquema
  // ...
});

const model = mongoose.model('Landings', LandingsSchema);

module.exports = model;