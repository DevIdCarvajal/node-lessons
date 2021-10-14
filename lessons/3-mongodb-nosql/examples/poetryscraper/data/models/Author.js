const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({ _id: Number, name: String }, { versionKey: false });

module.exports = mongoose.model('authors', AuthorSchema);