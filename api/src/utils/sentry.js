const Sentry = require("@sentry/node");
const { ENVIRONMENT, SENTRY_DSN } = require("../config");

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: `api-${ENVIRONMENT}`,
    tracesSampleRate: 0.001,
    enabled: false,
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
