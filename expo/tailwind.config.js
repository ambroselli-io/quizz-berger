/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.tsx',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'quizz-dark': '#111827',
        'quizz-yellow': '#facc15',
      },
      fontFamily: {
        merriweather: ['Merriweather_400Regular'],
        'merriweather-bold': ['Merriweather_700Bold'],
        'merriweather-sans': ['MerriweatherSans_400Regular'],
        'merriweather-sans-bold': ['MerriweatherSans_700Bold'],
        'merriweather-sans-light': ['MerriweatherSans_300Light'],
      },
    },
  },
  plugins: [],
};
