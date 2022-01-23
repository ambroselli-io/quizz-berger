const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const passport = require("passport");
const fetch = require("node-fetch");
const UserObject = require("../models/user");
const AnswerObject = require("../models/answer");
const { catchErrors } = require("../utils/error");
const user = require("../models/user");
const nodeHtmlToImage = require("node-html-to-image");
const { uploadBuffer } = require("../utils/picture");
const { quizz } = require("quizz-du-berger-shared");
const { getPodium, getCandidatesScorePerThemes } = require("quizz-du-berger-shared");
const { getPicName } = require("quizz-du-berger-shared");
const quizzQuestions = quizz.reduce((questions, theme) => {
  return [...questions, ...theme.questions];
}, []);

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

const getCandidatesAnswers = async () => {
  const candidates = await UserObject.find({ isCandidate: true }).lean();
  const candidatesAnswers = await AnswerObject.find({ user: candidates }).lean();

  return candidates.map((candidate) => {
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
};

router.get(
  "/candidates",
  catchErrors(async (req, res) => {
    res.status(200).send({ ok: true, data: await getCandidatesAnswers() });
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
  catchErrors(async (req, res, next) => {
    const userAnswers = await AnswerObject.find({ user: req.user._id }).lean();

    res.status(200).send({ ok: true, data: userAnswers });

    const candidateAnswers = await getCandidatesAnswers();

    const personsScore = getCandidatesScorePerThemes(userAnswers, candidateAnswers, quizzQuestions).map((c) => ({
      _id: c._id,
      pseudo: c.pseudo,
      picture: c.picture,
      color: c.color,
      total: c.total,
      totalMax: c.totalMax,
    }));

    const podiumData = getPodium(personsScore, true).filter((_, i) => i < 6);

    const picName = getPicName(podiumData);

    const existingPic = await fetch(`https://quizz-du-berger-pictures.cellar-c2.services.clever-cloud.com/${picName}.png`);

    if (existingPic.status < 300) {
      return next();
    }

    const html = fs.readFileSync(path.resolve("./src/views/result.html"), "utf8");

    const newHtml = html.replace(
      "{{RESULTS}}",
      podiumData
        .map(
          ({ pictures, height, percent, colors }, i) =>
            `<div class="step">
                  <div class="stair-container">
                    <div class="stair ${
                      i === 0 ? "gold" : i == 1 ? "silver" : i == 2 ? "bronze" : ""
                    }" style="height: calc(${height}% - 20px); background-color: rgba(205, 127, 50, ${percent / 100});" >
                      <span style="font-size: min(10vw, ${Math.max((percent / 100) * 2.5, 0.75)}em);">${percent}%</span>
                    </div>
                    <div class="avatars" style="bottom: calc(${height}% - 40px);">
                      ${pictures.filter(Boolean).map(
                        (pic, index) =>
                          `<img
                          class="avatar"
                          style="border: 2px solid ${colors[index]}; background-color: ${colors[index]}"
                          alt="${pic}"
                          src="https://quizz-du-berger-pictures.cellar-c2.services.clever-cloud.com/${pic}"
                        />`
                      )}
                    </div>
                  </div>
                </div>`
        )
        .join("")
    );

    const image = await nodeHtmlToImage({
      html: newHtml,
      puppeteerArgs: {
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--headless",
          "--no-zygote",
          "--disable-gpu",
        ],
        headless: true,
        ignoreHTTPSErrors: true,
      },
    });

    const uploaded = await uploadBuffer(image, `${picName}.png`);
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
