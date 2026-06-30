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
      },
    },
  ],
};
