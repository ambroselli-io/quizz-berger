import { quizz } from "quizz-du-berger-shared";
import { normalizeWord } from "./diacritics";

const formatQuizzForSearch = (quizz) =>
  quizz.map((theme) => {
    const questions = theme.questions.map((q) => q.fr).join(" ");
    const answers = theme.questions.map((q) => q.answers.join(" ")).join(" ");
    return normalizeWord(`${theme.fr} ${questions} ${answers}`.toLocaleLowerCase());
  });

const formatAnswers = (answers) =>
  answers.map((answer, answerIndex) => `      ${answerIndex + 1}. ${answer}`).join("\n");
const formatQuestions = (themeIndex, questions) =>
  questions
    .map(
      (question, questionIndex) =>
        `  ${"ABCDEFGHIJKLMNOPQRST"[themeIndex]}${questionIndex + 1} - ${question.fr}\n${formatAnswers(
          question.answers
        )}`
    )
    .join("\n\n");

const formatQuizzText = (quizz) =>
  quizz
    .map(
      (theme, index) => `${"ABCDEFGHIJKLMNOPQRST"[index]} - ${theme.fr}\n\n  ${formatQuestions(index, theme.questions)}`
    )
    .join("\n\n\n");

const colors = [
  "#e6194B",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#42d4f4",
  "#f032e6",
  "#bfef45",
  "#fabed4",
  "#469990",
  "#dcbeff",
  "#9A6324",
  "#fffac8",
  "#800000",
  "#aaffc3",
  "#808000",
  "#ffd8b1",
  "#000075",
  "#a9a9a9",
  "#ffffff",
  "#000000",
];

const enrichedQuizz = quizz.map((theme, index) => ({
  ...theme,
  backgroundColor: colors[index],
}));

const quizzForSearch = formatQuizzForSearch(enrichedQuizz);
const quizzDownload = formatQuizzText(quizz);
const quizzQuestions = quizz.reduce((questions, theme) => {
  return [...questions, ...theme.questions];
}, []);

export { enrichedQuizz as quizz, quizzForSearch, quizzDownload, quizzQuestions };
