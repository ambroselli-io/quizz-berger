import type { Answer, QuizzTheme } from '~/types/quizz';

const getUserThemes = (userAnswers: Answer[], themes: QuizzTheme[]): string[] =>
  [...userAnswers.reduce((acc: Set<string>, answer) => acc.add(answer.themeId), new Set<string>())].filter((themeId) =>
    themes.find((t) => t._id === themeId),
  );

export default getUserThemes;
