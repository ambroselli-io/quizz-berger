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
    if (!req.body.hasOwnProperty("themeId")) return res.status(409).send({ ok: false, error: "questionId is not provided" });
    if (!req.body.hasOwnProperty("questionId")) return res.status(409).send({ ok: false, error: "questionId is not provided" });
    if (!req.body.hasOwnProperty("answerIndex")) return res.status(409).send({ ok: false, error: "answer index is not provided" });

    const answerContent = {
      user: req.body.user,
      themeId: req.body.themeId,
      questionId: req.body.questionId,
    };

    let answer = await AnswerObject.findOne(answerContent);

    if (!answer) answer = await AnswerObject.create({ ...answerContent, answerIndex: req.body.answerIndex });

    answer.set({ answerIndex: req.body.answerIndex });
    await answer.save();

    const { user } = req;
    if (!user.themes.includes(req.body.themeId)) {
      user.themes.push(req.body.themeId);
      await user.save();
    }

    res.status(200).send({ ok: true, data: answer });
  })
);

router.get(
  "/candidates",
  catchErrors(async (req, res) => {
    const candidates = await UserObject.find({ isCandidate: true });
    const candidatesAnswers = await AnswerObject.find({ user: candidates });

    const populatedCandidatesAnswers = candidates.map((candidate) => {
      return {
        _id: candidate._id,
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
