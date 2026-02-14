import rawQuizzData from '~/shared/quizz-2027.json';
import { normalizeWord } from './diacritics';
import type { QuizzTheme, QuizzQuestion } from '~/types/quizz';

const rawQuizz: QuizzTheme[] = rawQuizzData as QuizzTheme[];

const formatQuizzForSearch = (quizzData: QuizzTheme[]) =>
  quizzData.map((theme) => {
    const questions = theme.questions.map((q) => q.fr).join(' ');
    const answers = theme.questions.map((q) => q.answers.join(' ')).join(' ');
    return normalizeWord(`${theme.fr} ${questions} ${answers}`.toLocaleLowerCase());
  });

const colors = [
  '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
  '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9',
  '#ffffff', '#000000',
];

const enrichedQuizz: QuizzTheme[] = rawQuizz.map((theme, index) => ({
  ...theme,
  backgroundColor: colors[index],
}));

const quizzForSearch = formatQuizzForSearch(enrichedQuizz);
const quizzQuestions: QuizzQuestion[] = rawQuizz.reduce<QuizzQuestion[]>((questions, theme) => {
  return [...questions, ...theme.questions];
}, []);

export { enrichedQuizz as quizz, quizzForSearch, quizzQuestions };
