import bundledQuizzData from '~/shared/quizz-2027.json';
import { normalizeWord } from './diacritics';
import type { QuizzTheme, QuizzQuestion } from '~/types/quizz';

/** Questions shipped with the binary — used until the API answers, and offline. */
export const bundledThemes: QuizzTheme[] = bundledQuizzData as QuizzTheme[];

const colors = [
  '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
  '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9',
  '#ffffff', '#000000',
];

export const enrichThemes = (themes: QuizzTheme[]): QuizzTheme[] =>
  themes.map((theme, index) => ({
    ...theme,
    backgroundColor: colors[index % colors.length],
  }));

// A theme without any question (`theme-et-si-un-autre-gagnait-2027`) is a placeholder:
// the payload may carry it, the UI must never list nor count it.
export const withQuestions = (themes: QuizzTheme[]): QuizzTheme[] =>
  themes.filter((theme) => theme.questions.length > 0);

export const formatQuizzForSearch = (themes: QuizzTheme[]): string[] =>
  themes.map((theme) => {
    const questions = theme.questions.map((q) => q.fr).join(' ');
    const answers = theme.questions.map((q) => q.answers.join(' ')).join(' ');
    return normalizeWord(`${theme.fr} ${questions} ${answers}`.toLocaleLowerCase());
  });

export const flattenQuestions = (themes: QuizzTheme[]): QuizzQuestion[] =>
  themes.reduce<QuizzQuestion[]>((questions, theme) => [...questions, ...theme.questions], []);

// The scoring algorithm indexes question.scores[answerIndex][answerIndex], so a
// non-square matrix would silently produce wrong podiums. Reject the whole
// payload rather than store questions we cannot score.
const isValidQuestion = (question: unknown): question is QuizzQuestion => {
  const q = question as QuizzQuestion;
  if (!q || typeof q._id !== 'string' || typeof q.fr !== 'string') return false;
  if (!Array.isArray(q.answers) || !q.answers.length) return false;
  if (!q.answers.every((answer) => typeof answer === 'string')) return false;
  if (!Array.isArray(q.scores) || q.scores.length !== q.answers.length) return false;
  return q.scores.every(
    (scoreLine) =>
      Array.isArray(scoreLine) &&
      scoreLine.length === q.answers.length &&
      scoreLine.every((score) => typeof score === 'number'),
  );
};

// A theme is allowed to hold no question — `theme-et-si-un-autre-gagnait-2027`
// ships empty on purpose — so only the shape of each question is enforced.
const isValidTheme = (theme: unknown): theme is QuizzTheme => {
  const t = theme as QuizzTheme;
  if (!t || typeof t._id !== 'string' || typeof t.fr !== 'string') return false;
  return Array.isArray(t.questions) && t.questions.every(isValidQuestion);
};

export const isValidQuizz = (data: unknown): data is QuizzTheme[] =>
  Array.isArray(data) && data.length > 0 && data.every(isValidTheme);
