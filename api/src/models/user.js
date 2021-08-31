const mongoose = require("mongoose");
const MODELNAME = "User";

const Schema = new mongoose.Schema({
  pseudo: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String },
  candidat: { type: Boolean },
  theme: { type: Object },
});

Schema.methods.me = function () {
  const toReturn = {
    pseudo: this.pseudo,
    candidat: this.candidat,
    theme: this.theme,
  };
  return toReturn;
};

module.exports = mongoose.model(MODELNAME, Schema);
