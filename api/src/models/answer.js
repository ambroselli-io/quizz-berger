const mongoose = require("mongoose");
const MODELNAME = "Answer";

const Schema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  themeId: { type: String, required: true },
  questionId: { type: String, required: true },
  answerIndex: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(MODELNAME, Schema);
