import dayjs from "dayjs";

const PORT = process.env.PORT || 5179;
const SECRET = process.env.SECRET || "not_so_secret";
const ENVIRONMENT = process.env.NODE_ENV;
const SENTRY_DSN = process.env.SENTRY_DSN;
const WHITE_LIST_DOMAINS = process.env.WHITE_LIST_DOMAINS;
const TIPIMAIL_API_USER = process.env.TIPIMAIL_API_USER;
const TIPIMAIL_API_KEY = process.env.TIPIMAIL_API_KEY;
const EMAIL_1 = process.env.EMAIL_1;
const EMAIL_2 = process.env.EMAIL_2;
const buildId = JSON.stringify(`${dayjs().format("DD-MM-YYYY")} vers ${dayjs().format("HH")}:00`);
const VERSION = buildId;

export { PORT, SECRET, ENVIRONMENT, SENTRY_DSN, WHITE_LIST_DOMAINS, TIPIMAIL_API_USER, TIPIMAIL_API_KEY, EMAIL_1, EMAIL_2, VERSION };
