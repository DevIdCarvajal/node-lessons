const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CounterSchema = new Schema({ _id: String, next: Number }, { versionKey: false });

module.exports = mongoose.model('counters', CounterSchema);