const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../config");
const UserObject = require("../models/user");
const ResultObject = require("../models/result");
const { catchErrors } = require("../utils/error");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const user = require("../models/user");

const JWT_MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days in ms

router.post(
  "/signup",
  catchErrors(async (req, res) => {
    if (!req.body.pseudo) return res.status(400).send({ ok: false, error: "Please provide a pseudo" });
    if (!req.body.password) return res.status(400).send({ ok: false, error: "Please provide a password" });
    if (!req.body.passwordConfirm) return res.status(400).send({ ok: false, error: "Please confirm your password" });

    const checkPseudo = await UserObject.findOne({ pseudo: req.body.pseudo });

    if (checkPseudo !== null) {
      console.log("This pseudo already exist");
      return res.status(400).send({ ok: false, error: "This pseudo already exist" });
    }

    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).send({ ok: false, error: "Passwords not matching" });
    }

    const user = await UserObject.create({
      pseudo: req.body.pseudo,
      password: md5(req.body.password),
      candidat: req.body.candidat,
      theme: req.body.theme,
    });

    const token = jwt.sign({ _id: user._id }, config.SECRET, { expiresIn: JWT_MAX_AGE });

    res.cookie("jwt", token, { domain: "127.0.0.1", maxAge: JWT_MAX_AGE, httpOnly: false, secure: false });

    return res.status(200).send({ ok: true, data: user });
  })
);

router.post(
  "/login",
  catchErrors(async (req, res) => {
    if (!req.body.pseudo) return res.status(400).send({ ok: false, error: "Please provide a pseudo" });
    if (!req.body.password) return res.status(400).send({ ok: false, error: "Please provide a password" });
    const user = await UserObject.findOne({ pseudo: req.body.pseudo });
    if (!user) return res.status(400).send({ ok: false, error: "User does not exist" });
    if (md5(req.body.password) !== user.password) return res.status(400).send({ ok: false, error: "Authentification is incorrect" });

    // set cookie
    const token = jwt.sign({ _id: user._id }, config.SECRET, { expiresIn: JWT_MAX_AGE });
    res.cookie("jwt", token, { domain: "127.0.0.1", maxAge: JWT_MAX_AGE, httpOnly: false, secure: false });

    console.log(req.cookies, "req.cookies");
    return res.status(200).send({ ok: true, data: user });
  })
);

router.get(
  "/logout",
  catchErrors(async (req, res) => {
    res.clearCookie("jwt", {});
    res.status(200).send({ message: "Successfully logged out" });
  })
);

router.put(
  "/",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    const user = req.user;
    const userUpdate = {};

    if (req.body.hasOwnProperty("themes")) {
      userUpdate.themes = req.body.themes;
    }

    user.set(userUpdate);
    await user.save();

    res.status(200).send({ ok: true, data: user });
  })
);

router.get(
  "/me",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    console.log(req.user.me(), "Identified user");
    res.status(200).send({ ok: true, data: req.user });
  })
);

router.post(
  "/answer",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    const findAnswer = await ResultObject.findOne({ user: req.body.user, theme: req.body.theme, question: req.body.question });
    const newAnswer = {
      user: req.body.user,
      theme: req.body.theme,
      themeId: req.body.themeId,
      question: req.body.question,
      questionIndex: req.body.questionIndex,
      answer: req.body.answer,
      answerIndex: req.body.answerIndex,
    };

    if (!findAnswer) {
      const result = await ResultObject.create(newAnswer);
    } else {
      findAnswer.set(newAnswer);
      await findAnswer.save();
    }

    res.status(200).send({ ok: true, data: newAnswer });
  })
);

router.get(
  "/result",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    const userResults = await ResultObject.find({ user: req.user._id });
    const politicalPartys = await UserObject.find({ candidat: true });
    const politicalPartyResults = await ResultObject.find({ user: politicalPartys });

    const orderedPoliticalPartyResults = politicalPartys.map((party) => {
      return politicalPartyResults.filter((result) => {
        return party._id.equals(result.user);
      });
    });

    res.status(200).send({ ok: true, data: { userResults, politicalPartys, orderedPoliticalPartyResults } });
  })
);

module.exports = router;
