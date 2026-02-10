import { quizz } from "quizz-du-berger-shared";

const getUserThemes = (userAnswers) =>
  [...userAnswers.reduce((themes, answer) => themes.add(answer.themeId), new Set())].filter((themeId) =>
    quizz.find((t) => t._id === themeId)
  );

export default getUserThemes;
