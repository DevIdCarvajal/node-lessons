const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({ _id: Number, title: String, idAuthor: Number }, { versionKey: false });

module.exports = mongoose.model('books', BookSchema);