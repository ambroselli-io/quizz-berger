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

    return res.status(200).send({ ok: true, data: user, message: "Succesfully signed up" });
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
    return res.status(200).send({ ok: true, token: token, message: "Succesfully logged up" });
  })
);

router.get(
  "/logout",
  catchErrors(async (req, res) => {
    // res.cookie("jwt", "token", { maxAge: JWT_MAX_AGE, httpOnly: false, secure: false });

    res.clearCookie("jwt", {});

    res.status(200).send({ message: "Successfully logged out" });
  })
);

module.exports = router;
