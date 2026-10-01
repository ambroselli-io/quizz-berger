require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "quizz-du-berger-api-express",
      // Cluster mode needs a node script, not `npm run`: prisma generate + migrate deploy now run in the deploy.
      // 2 instances, as for the app: Postgres and ~20 other apps share the 4 cores.
      // Absolute paths: cluster workers start in the pm2 daemon's directory, where neither tsx nor tsconfig.json
      // (the `~/` alias) would be found.
      script: "./src/index.ts",
      cwd: __dirname,
      interpreter_args: `--import ${require.resolve("tsx")}`,
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
        TSX_TSCONFIG_PATH: `${__dirname}/tsconfig.json`,
      },
    },
  ],
};
