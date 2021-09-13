const mongoose = require("mongoose");
const MODELNAME = "Result";

const Schema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  theme: { type: String, required: true },
  themeId: { type: String, required: true },
  question: { type: String, required: true },
  questionIndex: { type: Number, required: true },
  answer: { type: String, required: true },
  answerIndex: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(MODELNAME, Schema);
