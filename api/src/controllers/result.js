const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const UserObject = require("../models/user");
const { catchErrors } = require("../utils/error");

router.get(
  "/:userId",
  catchErrors(async (req, res) => {
    const user = await UserObject.findById(req.params.userId);
    console.log({ user });
    if (!user || !(user.isPublic || user.isCandidate)) {
      return res.status(200).redirect("https://www.quizz-du-berger.com");
    }

    const html = fs.readFileSync(path.resolve("./src/views/result.html"), "utf8");

    const newHtml = html.replace("{{USER_ID}}", req.params.userId);

    res.status(200).set("Content-Type", "text/html").send(Buffer.from(newHtml));
  })
);

module.exports = router;
