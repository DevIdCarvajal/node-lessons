const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VerseSchema = new Schema({ text: String, paragraph: Number }, { _id: false, autoIndex: false });
const PoemSchema = new Schema({ _id: Number, title: String, verses: [VerseSchema], idBook: Number, idAuthor: Number }, { versionKey: false });

module.exports = mongoose.model('poems', PoemSchema);