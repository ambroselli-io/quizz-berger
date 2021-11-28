const mongoose = require("mongoose");
const MODELNAME = "User";

const Schema = new mongoose.Schema(
  {
    pseudo: { type: String, trim: true, unique: true, sparse: true },
    password: { type: String },
    themes: { type: [String], default: [] },

    /* to allow sharing answers publicly */
    isPublic: { type: Boolean, default: false },

    /* for candidate or pary politic */
    firstName: { type: String },
    lastName: { type: String },
    partyName: { type: String },
    isCandidate: { type: Boolean, default: false, index: true },
    friends: { type: [{ type: mongoose.Types.ObjectId, ref: "User", index: true }], default: [] },
    lastLogineAt: { type: Date },
  },
  { timestamps: true }
);

Schema.methods.me = function () {
  return {
    _id: this._id,
    pseudo: this.pseudo,
    firstName: this.firstName,
    lastName: this.lastName,
    partyName: this.partyName,
    themes: this.themes,
    isCandidate: this.isCandidate,
    friends: this.friends,
    isPublic: this.isCandidate || this.isPublic,
  };
};

module.exports = mongoose.model(MODELNAME, Schema);
