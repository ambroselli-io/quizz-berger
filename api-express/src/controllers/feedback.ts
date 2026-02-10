import express from "express";
const router = express.Router();
import { TIPIMAIL_API_KEY, TIPIMAIL_API_USER, EMAIL_1, EMAIL_2 } from "../config";
import { catchErrors } from "../utils/error";
import { capture } from "../utils/sentry";

router.post(
  "/",
  catchErrors(async (req: express.Request, res: express.Response) => {
    const { text, subject } = req.body;
    const response = await fetch("https://api.tipimail.com/v1/messages/send", {
      method: "POST",
      headers: {
        "X-Tipimail-ApiUser": TIPIMAIL_API_USER,
        "X-Tipimail-ApiKey": TIPIMAIL_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: TIPIMAIL_API_KEY,
        to: [
          {
            address: EMAIL_1,
          },
          {
            address: EMAIL_2,
          },
        ],
        msg: {
          from: {
            address: "contact@quizz-du-berger.com",
            personalName: "Le Quizz du Berger",
          },
          subject,
          text,
        },
      }),
    }).catch((err) => capture(err, { extra: { text, subject } }));
    res.status(200).send({ ok: response?.statusText === "OK" });
  }),
);

export default router;
