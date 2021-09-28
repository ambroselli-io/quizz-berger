const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../config");
const UserObject = require("../models/user");
const { catchErrors } = require("../utils/error");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const JWT_MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days in ms

const setCookie = (req, res, user) => {
  const token = jwt.sign({ _id: user._id }, config.SECRET, { expiresIn: JWT_MAX_AGE });

  const tokenConfig = {
    domain: req.headers.origin.includes("fr") ? "quizz-du-berger.fr" : "quizz-du-berger.com",
    maxAge: JWT_MAX_AGE,
    httpOnly: false,
    secure: false,
    sameSite: false,
  };
  console.log("jwt", token, tokenConfig);
  res.cookie("jwt", token, tokenConfig);
};

router.post(
  "/signup",
  catchErrors(async (req, res) => {
    if (!req.body.pseudo) return res.status(400).send({ ok: false, error: "Please provide a pseudo" });
    if (!req.body.password) return res.status(400).send({ ok: false, error: "Please provide a password" });
    if (!req.body.passwordConfirm) return res.status(400).send({ ok: false, error: "Please confirm your password" });

    const checkPseudo = await UserObject.findOne({ pseudo: req.body.pseudo });

    if (checkPseudo !== null) return res.status(400).send({ ok: false, error: "This pseudo already exist" });

    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).send({ ok: false, error: "Passwords not matching" });
    }

    const user = await UserObject.create({
      pseudo: req.body.pseudo,
      password: md5(req.body.password),
      candidat: req.body.candidat,
      themes: req.body.themes,
    });

    setCookie(req, res, user);

    return res.status(200).send({ ok: true, data: user.me() });
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

    setCookie(req, res, user);

    return res.status(200).send({ ok: true, data: user.me() });
  })
);

router.post(
  "/logout",
  catchErrors(async (req, res) => {
    res.clearCookie("jwt", {});
    res.status(200).send({ ok: true, message: "Successfully logged out" });
  })
);

router.put(
  "/",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    const user = req.user;
    const userUpdate = { updatedAt: Date.now() };

    if (req.body.hasOwnProperty("pseudo")) userUpdate.pseudo = req.body.pseudo;
    // not activated automatically, manual change only
    // if (req.body.hasOwnProperty("candidat")) userUpdate.candidat = req.body.candidat;
    if (req.body.hasOwnProperty("public")) userUpdate.public = req.body.public;
    if (req.body.hasOwnProperty("themes")) userUpdate.themes = req.body.themes;
    if (req.body.hasOwnProperty("firstName")) userUpdate.firstName = req.body.firstName;
    if (req.body.hasOwnProperty("lastName")) userUpdate.lastName = req.body.lastName;
    if (req.body.hasOwnProperty("partyName")) userUpdate.partyName = req.body.partyName;

    user.set(userUpdate);
    await user.save();

    res.status(200).send({ ok: true, data: user.me() });
  })
);

router.get(
  "/me",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    res.status(200).send({ ok: true, data: req.user.me() });
  })
);

module.exports = router;
