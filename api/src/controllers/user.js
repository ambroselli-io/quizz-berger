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
const JWT_MIN_AGE = 1000 * 60 * 60 * 3; // 3 hours in ms

const setCookie = (req, res, user) => {
  const token = jwt.sign({ _id: user._id }, config.SECRET, { expiresIn: user?.pseudo ? JWT_MAX_AGE : JWT_MIN_AGE });

  const tokenConfig = {
    domain: process.env.NODE_ENV === "development" ? null : req.headers.origin.includes("fr") ? "quizz-du-berger.fr" : "quizz-du-berger.com",
    maxAge: user?.pseudo ? JWT_MAX_AGE : JWT_MIN_AGE,
    httpOnly: process.env.NODE_ENV !== "development",
    secure: process.env.NODE_ENV !== "development",
  };
  res.cookie("jwt", token, tokenConfig);
};

router.post(
  "/signup",
  catchErrors(async (req, res) => {
    if (!req.body.pseudo) return res.status(400).send({ ok: false, error: "Veuillez fournir un pseudo" });
    if (!req.body.password) return res.status(400).send({ ok: false, error: "Veuillez fournir un mot-de-passe" });
    if (!req.body.passwordConfirm) return res.status(400).send({ ok: false, error: "Veuillez confirmer votre mot-de-passe" });

    const checkPseudo = await UserObject.findOne({ pseudo: req.body.pseudo });

    if (checkPseudo !== null) return res.status(400).send({ ok: false, error: "Ce pseudonyme existe déjà" });

    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).send({ ok: false, error: "Les mots-de-passes no sont pas identiques" });
    }

    const user = await UserObject.create({
      pseudo: req.body.pseudo,
      password: md5(req.body.password),
    });

    setCookie(req, res, user);

    return res.status(200).send({ ok: true, data: user.me() });
  })
);

router.post(
  "/login",
  catchErrors(async (req, res) => {
    if (!req.body.pseudo) return res.status(400).send({ ok: false, error: "Veuillez fournir un pseudo" });
    if (!req.body.password) return res.status(400).send({ ok: false, error: "Veuillez fournir un mot-de-passe" });

    const user = await UserObject.findOne({ pseudo: req.body.pseudo });
    if (!user) return res.status(400).send({ ok: false, error: "Ce compte n'existe pas" });

    if (md5(req.body.password) !== user.password)
      return res.status(400).send({ ok: false, error: "Le pseudo et/ou le mot-de-passe sont incorrects" });

    setCookie(req, res, user);

    return res.status(200).send({ ok: true, data: user.me() });
  })
);

router.post(
  "/logout",
  catchErrors(async (req, res) => {
    res.clearCookie("jwt", {});
    res.status(200).send({ ok: true });
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const user = await UserObject.create({});

    console.log("new one", { user });

    setCookie(req, res, user);

    return res.status(200).send({ ok: true, data: user.me() });
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
    // if (req.body.hasOwnProperty("isCandidate")) userUpdate.isCandidate = req.body.isCandidate;
    if (req.body.hasOwnProperty("isPublic")) userUpdate.isPublic = req.body.isPublic;
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

router.get(
  "/:pseudo",
  catchErrors(async (req, res) => {
    if (!req.params.pseudo) return res.status(400).send({ ok: false });
    const user = await UserObject.findOne({ pseudo: req.params.pseudo });
    if (!user || !(user.isPublic || user.isCandidate)) {
      return res.status(400).send({ ok: false });
    }

    res.status(200).send({ ok: true, data: user.me() });
  })
);

module.exports = router;
