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
        picture: candidate.picture,
        color: candidate.color,
        isCandidate: candidate.isCandidate,
        themes: candidate.themes,
        answers: candidatesAnswers.filter((answers) => candidate._id.equals(answers.user)),
      };
    });

    res.status(200).send({ ok: true, data: populatedCandidatesAnswers });
  })
);

router.get(
  "/friends",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    const friends = await UserObject.find({ _id: req.user?.friends });
    const friendsAnswers = await AnswerObject.find({ user: friends });

    const populatedFriendsAnswers = friends.map((friend) => {
      return {
        _id: friend._id,
        pseudo: friend.pseudo,
        isCandidate: false,
        themes: friend.themes,
        answers: friendsAnswers.filter((answers) => friend._id.equals(answers.user)),
      };
    });

    res.status(200).send({ ok: true, data: populatedFriendsAnswers });
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

router.get(
  "/:pseudo",
  catchErrors(async (req, res) => {
    if (!req.params.pseudo) return res.status(400).send({ ok: false });
    const user = await UserObject.findOne({ pseudo: req.params.pseudo });
    if (!user || !(user.isPublic || user.isCandidate)) {
      return res.status(400).send({ ok: false });
    }
    const userAnswers = await AnswerObject.find({ user: user._id });

    res.status(200).send({ ok: true, data: userAnswers });
  })
);

module.exports = router;
