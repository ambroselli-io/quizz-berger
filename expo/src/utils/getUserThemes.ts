import { quizz } from './quizz';
import type { Answer } from '~/types/quizz';

const getUserThemes = (userAnswers: Answer[]): string[] =>
  [...userAnswers.reduce((themes: Set<string>, answer) => themes.add(answer.themeId), new Set<string>())].filter(
    (themeId) => quizz.find((t) => t._id === themeId),
  );

export default getUserThemes;
