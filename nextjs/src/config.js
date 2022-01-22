const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const SENTRY_URL = process.env.NEXT_PUBLIC_SENTRY_URL;
const IMAGE_BASE_URL = "https://quizz-du-berger-pictures.cellar-c2.services.clever-cloud.com/";
const CELLAR_ENDPOINT = process.env.CELLAR_ENDPOINT;
const CELLAR_KEYID = process.env.CELLAR_KEYID;
const CELLAR_KEYSECRET = process.env.CELLAR_KEYSECRET;

export { API_URL, SENTRY_URL, ENVIRONMENT, CELLAR_ENDPOINT, CELLAR_KEYID, CELLAR_KEYSECRET, IMAGE_BASE_URL };
