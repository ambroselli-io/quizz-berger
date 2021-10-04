const mongoose = require("mongoose");
const MODELNAME = "User";

const Schema = new mongoose.Schema({
  pseudo: { type: String, required: true, trim: true, unique: true },
  password: { type: String },
  themes: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  /* to allow sharing answers publicly */
  isPublic: { type: Boolean },

  /* for candidate or pary politic */
  firstName: { type: String },
  lastName: { type: String },
  partyName: { type: String },
  isCandidate: { type: Boolean },
});

Schema.methods.me = function () {
  return {
    _id: this._id,
    pseudo: this.pseudo,
    firstName: this.firstName,
    lastName: this.lastName,
    partyName: this.partyName,
    themes: this.themes,
    isCandidate: this.isCandidate,
    isPublic: this.isPublic,
  };
};

module.exports = mongoose.model(MODELNAME, Schema);
