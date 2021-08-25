const mongoose = require("mongoose");
const MODELNAME = "Result";

const Schema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  question: { type: String, required: true },
});

module.exports = mongoose.model(MODELNAME, Schema);
