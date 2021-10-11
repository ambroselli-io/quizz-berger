const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserObject = require("../models/user");
const AnswerObject = require("../models/answer");
const { catchErrors } = require("../utils/error");
const user = require("../models/user");

router.get(
  "/:userId",
  catchErrors(async (req, res) => {
    const user = await UserObject.findById(req.params.userId);
    if (!user || !user.isPublic || !user.isCandidate) {
      res.status(200).redirect("https://www.quizz-du-berger.com");
    }

    const html = fs.readFileSync(path.resolve("./src/views/result.html"), "utf8");

    const newHtml = html.replace("{{USER_ID}}", req.params.userId);

    res.status(200).set("Content-Type", "text/html").send(Buffer.from(newHtml));
  })
);

module.exports = router;
