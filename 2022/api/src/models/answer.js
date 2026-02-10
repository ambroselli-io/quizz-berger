const mongoose = require("mongoose");
const MODELNAME = "Answer";

const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", index: true },
    themeId: { type: String, required: true },
    questionId: { type: String, required: true },
    answerIndex: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model(MODELNAME, Schema);
