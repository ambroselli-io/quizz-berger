const Sentry = require("@sentry/node");
const { ENVIRONMENT, SENTRY_DSN } = require("../config");

if (process.env.NODE_ENV === "production") {
  // Import with `import * as Sentry from "@sentry/node"` if you are using ESM

  Sentry.init({
    dsn: "https://c1e9413d48d056873c3ff7d7e9b9fe3a@o117731.ingest.us.sentry.io/4511240810987520",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    environment: `api-express-${ENVIRONMENT}`,
  });
}

// https://docs.sentry.io/platforms/javascript/enriching-events/context/#example-usages

function capture(err, context = {}) {
  if (typeof context === "string") {
    context = JSON.parse(context);
  } else {
    context = JSON.parse(JSON.stringify(context));
  }
  if (Sentry && err) {
    if (typeof err === "string") {
      if (ENVIRONMENT !== "production") {
        Sentry.captureMessage(`[${ENVIRONMENT}] ${err}`, context);
      } else {
        Sentry.captureMessage(err, context);
      }
    } else {
      if (ENVIRONMENT !== "production") err.message = `[${ENVIRONMENT}] ${err.message}`;
      Sentry.captureException(err, context);
    }
  }
  if (["development", "test"].includes(process.env.NODE_ENV)) {
    if (typeof err === "string") {
      console.log("capture", `[${ENVIRONMENT}] ${err}`, JSON.stringify(context, null, 2));
    } else {
      console.log("capture", err, JSON.stringify(context, null, 2));
    }
  }
}

module.exports = { capture };
