const isDev = __DEV__;

export const API_HOST = isDev
  ? 'http://localhost:5179'
  : 'https://api.quizz-du-berger.com';
