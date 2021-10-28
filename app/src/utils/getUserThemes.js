const getUserThemes = (userAnswers) => [
  ...userAnswers.reduce((themes, answer) => themes.add(answer.themeId), new Set()),
];

export default getUserThemes;
