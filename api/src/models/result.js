const mongoose = require("mongoose");
const MODELNAME = "Result";

const Schema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  question: { type: String, required: true }, // 0
  themes: { type: String, required: true }, // theme_1
  answer: { type: String, required: true }, // 2
});

module.exports = mongoose.model(MODELNAME, Schema);
