const MONGO_URL = process.env.MONGODB_ADDON_URI;
const PORT = process.env.PORT || 8080;
const SECRET = process.env.SECRET || "not_so_secret";
const ENVIRONMENT = process.env.NODE_ENV;
const SENTRY_DSN = process.env.SENTRY_DSN;

module.exports = {
  MONGO_URL,
  PORT,
  SECRET,
  ENVIRONMENT,
  SENTRY_DSN,
};
