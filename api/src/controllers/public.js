const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const passport = require("passport");
const fetch = require("node-fetch");
const UserObject = require("../models/user");
const AnswerObject = require("../models/answer");
const { catchErrors } = require("../utils/error");
const user = require("../models/user");
const nodeHtmlToImage = require("node-html-to-image");
const { uploadBuffer } = require("../utils/picture");
const { quizz } = require("quizz-du-berger-shared");
const { getPodium, getCandidatesScorePerThemes, getPicName } = require("quizz-du-berger-shared");
const quizzQuestions = quizz.reduce((questions, theme) => {
  return [...questions, ...theme.questions];
}, []);

router.get(
  "/count",
  catchErrors(async (req, res) => {
    const countUsers = await UserObject.countDocuments({ isCandidate: false });
    const countAnswers = await AnswerObject.countDocuments();

    res.status(200).send({ ok: true, data: { countUsers, countAnswers } });
  })
);

module.exports = router;
