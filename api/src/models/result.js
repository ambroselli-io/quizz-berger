const mongoose = require("mongoose");
const MODELNAME = "Result";

const Schema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  theme: { type: String, required: true }, // theme_1
  question: { type: String, required: true }, // 0
  answer: { type: String, required: true }, // 2
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(MODELNAME, Schema);
