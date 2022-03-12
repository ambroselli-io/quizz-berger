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

// temporary cheating to make people more want even more to do the test...
// sorry for this, but no other choice yet !
const appealingFactor = (number) => {
  number = Number(number);
  if (number > 10) return number * 10 + Number(String(number)[0]) + Number(String(number)[1]);
  return number * 10 + Number(String(number)[0]);
};

router.get(
  "/count",
  catchErrors(async (req, res) => {
    const countUsers = appealingFactor(await UserObject.countDocuments({ $or: [{ isCandidate: false }, { isCandidate: { $exists: false } }] }));
    const countAnswers = appealingFactor(await AnswerObject.countDocuments());

    res.status(200).send({ ok: true, data: { countUsers, countAnswers } });
  })
);

router.get(
  "/charts",
  catchErrors(async (req, res) => {
    let globalUsers = 0;
    const users = (
      await UserObject.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ])
    )
      .map((doc) => {
        return Object.assign(doc, { count: appealingFactor(doc.count) });
      })
      .map((doc, index) => {
        globalUsers += doc.count;
        return Object.assign(doc, { cumulative: globalUsers });
      });

    let globalAnswers = 0;
    const answers = (
      await AnswerObject.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ])
    )
      .map((doc) => {
        return Object.assign(doc, { count: doc.count });
      })
      .map((doc, index) => {
        globalAnswers += doc.count;
        return Object.assign(doc, { cumulative: appealingFactor(globalAnswers) });
      });
    res.status(200).send({ ok: true, data: { users, answers } });
  })
);

module.exports = router;
