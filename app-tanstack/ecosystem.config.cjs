require('dotenv').config();

// path: ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'quizz-du-berger-app-tanstack',
      script: 'npm',
      args: 'run start-pm2',
      time: true,
      env: {
        PORT: '5178',
        NODE_ENV: 'production',
        // Serves the IndexNow key file (/<key>.txt) for search-engine
        // verification. Set INDEXNOW_KEY in the VPS .env; unset = feature off.
        INDEXNOW_KEY: process.env.INDEXNOW_KEY,
      },
    },
  ],
};
