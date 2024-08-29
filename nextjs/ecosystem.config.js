require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "quizz-du-berger-nextjs",
      script: "npm",
      args: "run start-pm2",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
        NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
        PORT: process.env.PORT,
        SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
      },
    },
  ],
};
