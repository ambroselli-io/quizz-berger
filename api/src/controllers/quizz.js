const express = require("express");
const router = express.Router();
const { catchErrors } = require("../utils/error");
const quizz = require("../../data/quizz.json");

router.get(
  "/",
  catchErrors(async (req, res) => {
    res.status(200).send({ ok: true, data: quizz });
  })
);

module.exports = router;
