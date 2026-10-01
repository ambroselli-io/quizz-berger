require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "quizz-du-berger-api-express",
      // Cluster mode needs a plain JS file: pm2 6 runs a .ts script through ts-node or bun whatever the interpreter,
      // so the deploy bundles src/ into dist/ (`npm run build`), after prisma generate + migrate deploy.
      // 2 instances, as for the app: Postgres and ~20 other apps share the 4 cores.
      script: "./dist/index.js",
      // The API reads .env and ./public relative to the working directory.
      cwd: __dirname,
      node_args: "--enable-source-maps",
      exec_mode: "cluster",
      instances: 2,
      time: true,
      env: {
        NODE_ENV: "production",
        MONGODB_ADDON_URI: process.env.MONGODB_ADDON_URI,
        EMAIL_1: process.env.EMAIL_1,
        EMAIL_2: process.env.EMAIL_2,
        SECRET: process.env.SECRET,
        SENTRY_DSN: process.env.SENTRY_DSN,
        TIPIMAIL_API_KEY: process.env.TIPIMAIL_API_KEY,
        TIPIMAIL_API_USER: process.env.TIPIMAIL_API_USER,
        WHITE_LIST_DOMAINS: process.env.WHITE_LIST_DOMAINS,
        PORT: "5179",
      },
    },
  ],
};
