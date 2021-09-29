const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserObject = require("../models/user");
const AnswerObject = require("../models/answer");
const { catchErrors } = require("../utils/error");
const user = require("../models/user");

router.post(
  "/",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    if (!req.body.themeId) return res.status(409).send({ ok: false, error: "themeId is not provided" });
    if (!req.body.hasOwnProperty("questionId")) return res.status(409).send({ ok: false, error: "questionId is not provided" });
    // if (!req.body.questionId) return res.status(409).send({ ok: false, error: "questionId is not provided" });
    if (!req.body.answerIndex) return res.status(409).send({ ok: false, error: "answerIndex is not provided" });

    const answerContent = {
      user: req.body.user,
      themeId: req.body.themeId,
      questionId: req.body.questionId,
    };

    const answer = await AnswerObject.findOne(answerContent);

    if (!answer) {
      const newAnswer = await AnswerObject.create({
        ...answerContent,
        answerIndex: req.body.answerIndex,
      });
      res.status(200).send({ ok: true, data: newAnswer });
    }

    answer.set({ answerIndex: req.body.answerIndex });
    await answer.save();
    res.status(200).send({ ok: true, data: answer });
  })
);

router.get(
  "/candidates",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    const candidates = await UserObject.find({ isCandidate: true });
    const candidatesAnswers = await AnswerObject.find({ user: candidates });

    const populatedCandidatesAnswers = candidates.map((candidate) => {
      return {
        pseudo: candidate.pseudo,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        partyName: candidate.partyName,
        isCandidate: candidate.isCandidate,
        themes: candidate.themes,
        answers: candidatesAnswers.filter((answers) => candidate._id.equals(answers.user)),
      };
    });

    res.status(200).send({ ok: true, data: populatedCandidatesAnswers });
  })
);

router.get(
  "/",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    const userAnswers = await AnswerObject.find({ user: req.user._id });

    res.status(200).send({ ok: true, data: userAnswers });
  })
);

module.exports = router;
