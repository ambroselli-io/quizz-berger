const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const UserObject = require("../models/user");
const { catchErrors } = require("../utils/error");

router.get(
  "/test",
  catchErrors(async (req, res) => {
    // if (!req.params.pseudo) return res.status(200).redirect("https://www.quizz-du-berger.com");
    // const user = await UserObject.findOne({ pseudo: req.params.pseudo });
    // if (!user || !(user.isPublic || user.isCandidate)) {
    //   return res.status(200).redirect("https://www.quizz-du-berger.com");
    // }

    const html = fs.readFileSync(path.resolve("./src/views/result.html"), "utf8");

    const newHtml = html.replace("{{PSEUDO}}", req.params.pseudo);

    res.status(200).set("Content-Type", "text/html").send(Buffer.from(newHtml));
  })
);

module.exports = router;
