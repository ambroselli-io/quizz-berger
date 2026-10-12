require('dotenv').config();

// path: ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'quizz-du-berger-app-tanstack',
      // Cluster mode (pm2 can only cluster a Node file, not `npm run`). 2 of the VPS's 4 cores:
      // the API process and Postgres run on the same machine and need the other two.
      script: './server.mjs',
      exec_mode: 'cluster',
      instances: 2,
      time: true,
      env: {
        PORT: '5178',
        NODE_ENV: 'production',
        // Serves the IndexNow key file (/<key>.txt) for search-engine
        // verification. Set INDEXNOW_KEY in the VPS .env; unset = feature off.
        INDEXNOW_KEY: process.env.INDEXNOW_KEY,
        // Same value as in api-express/.env: authenticates the crawler hits that
        // server.mjs posts to the API. Unset = crawler traffic is not recorded.
        ANALYTICS_BOT_TOKEN: process.env.ANALYTICS_BOT_TOKEN,
      },
    },
  ],
};
