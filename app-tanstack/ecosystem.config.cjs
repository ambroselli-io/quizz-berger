require('dotenv').config();

// path: ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'quizz-du-berger-app-tanstack',
      // Cluster mode: one SSR process per core. pm2 can only cluster a Node file, not `npm run`.
      script: './server.mjs',
      exec_mode: 'cluster',
      instances: 'max',
      time: true,
      env: {
        PORT: '5178',
        NODE_ENV: 'production',
        // Serves the IndexNow key file (/<key>.txt) for search-engine
        // verification. Set INDEXNOW_KEY in the VPS .env; unset = feature off.
        INDEXNOW_KEY: process.env.INDEXNOW_KEY,
        // Signs the DataFast "Bot traffic" calls made from server.mjs. Optional:
        // unset = calls still counted, they just are not authenticated.
        DATAFAST_BOT_TOKEN: process.env.DATAFAST_BOT_TOKEN,
      },
    },
  ],
};
