require('dotenv').config();

// path: .ecosystem.config.js"
module.exports = {
  apps: [
    {
      name: 'niki-coach-app-react-router',
      script: 'npm',
      args: 'run start-pm2',
      time: true,
      env: {
        PORT: 6600,
        NODE_ENV: 'production',
      },
    },
  ],
};
