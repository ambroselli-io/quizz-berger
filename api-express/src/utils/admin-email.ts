import { EMAIL_1, TIPIMAIL_API_KEY, TIPIMAIL_API_USER } from "~/config";
import { capture } from "~/utils/sentry";

// Plain-text notification to the site owner. Returns false when Tipimail did not accept it.
export const sendAdminEmail = async (subject: string, text: string) => {
  const response = await fetch("https://api.tipimail.com/v1/messages/send", {
    method: "POST",
    headers: { "X-Tipimail-ApiUser": TIPIMAIL_API_USER!, "X-Tipimail-ApiKey": TIPIMAIL_API_KEY!, "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: TIPIMAIL_API_KEY,
      to: [{ address: EMAIL_1 }],
      msg: { from: { address: "contact@quizz-du-berger.com", personalName: "Le Quizz du Berger" }, subject, text },
      // Click tracking would rewrite the links (validation links must stay intact).
      headers: { "X-TM-TRACKING": { html: { open: 0, click: 0 }, text: { click: 0 } } },
    }),
  }).catch((err) => capture(err, { extra: { subject } }));
  return !!response?.ok;
};
