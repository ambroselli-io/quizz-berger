const mongoose = require("mongoose");
const MODELNAME = "User";

const Schema = new mongoose.Schema({
  pseudo: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String },
  candidat: { type: Boolean },
  theme: { type: String },
});

module.exports = mongoose.model(MODELNAME, Schema);
