const express = require("express");
const router = express.Router();
const passport = require("passport");
const { catchErrors } = require("../utils/error");

router.get(
  "/result",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    console.log(req.user, "Identified user");
    res.status(200).send({ ok: true, data: req.user });
  })
);

module.exports = router;
