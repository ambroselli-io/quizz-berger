import type {
  Answer,
  CandidateAnswer,
  StaticAnswer,
  UserAnswerWithScore,
  UserAnswerWithScoreLine,
  UserAnswerWithScorePerTheme,
  UserAnswerWithScorePerThemeAndMax,
  QuizzQuestion,
} from '~/types/quizz';

const maxScorePerAnswer = 5;

export const getCandidatesScorePerThemes = (
  userAnswers: Array<Answer>,
  candidatesAnswers: Array<CandidateAnswer>,
  quizzQuestions: Array<QuizzQuestion>,
): Array<UserAnswerWithScorePerThemeAndMax> => {
  const userAnswersWithScoreLines: Array<UserAnswerWithScoreLine> = userAnswers.map(
    addScoreLinesToAnswers(quizzQuestions),
  );

  return candidatesAnswers
    .map((candidate) => {
      const candidateScores = addScoreToCandidateAnswer(userAnswersWithScoreLines, candidate.answers);
      const scorePerThemes = getScorePerTheme(candidateScores).map((theme) => {
        const max = theme.numberOfAnswers * maxScorePerAnswer;
        return {
          themeId: theme.themeId,
          score: theme.score,
          percent: Math.round((theme.score / max) * 100),
          max,
        };
      });
      const total = scorePerThemes.reduce((total, { score }) => total + score, 0);
      const totalMax = scorePerThemes.reduce((totalMax, { max }) => totalMax + max, 0);
      return {
        ...candidate,
        scorePerThemes,
        total,
        totalMax,
      };
    })
    .sort((c1, c2) => (c1.total > c2.total ? -1 : 1));
};

const addScoreLinesToAnswers = (quizzQuestions: Array<QuizzQuestion>) => (answer: Answer) => {
  const question = quizzQuestions.find((q) => q._id === answer.questionId);
  if (!question) return { ...answer, scoreLine: [] };
  const scoreLine = question.scores[answer.answerIndex];
  return { ...answer, scoreLine };
};

const addScoreToCandidateAnswer = (
  userAnswersWithScoreLines: Array<UserAnswerWithScoreLine>,
  candidateAnswers: Array<StaticAnswer>,
): Array<UserAnswerWithScore> => {
  const toReturn: Array<UserAnswerWithScore> = [];
  for (const userAnswer of userAnswersWithScoreLines) {
    const candidateMatchingAnswer = candidateAnswers.find(
      (partyAnswer) => partyAnswer.questionId === userAnswer.questionId,
    );
    const isSameAnswer = candidateMatchingAnswer?.answerIndex === userAnswer.answerIndex;
    const isNotInterestedAnswer = !userAnswer.scoreLine.filter(Boolean).length;
    if (isSameAnswer && isNotInterestedAnswer) continue;
    const politicalPartyMatchingAnswersIndex = candidateMatchingAnswer?.answerIndex;
    toReturn.push({
      ...userAnswer,
      score:
        politicalPartyMatchingAnswersIndex != null && !isNaN(politicalPartyMatchingAnswersIndex)
          ? userAnswer.scoreLine[politicalPartyMatchingAnswersIndex]
          : 0,
    });
  }
  return toReturn;
};

const getScorePerTheme = (
  candidateScores: Array<UserAnswerWithScore>,
): Array<UserAnswerWithScorePerTheme> => {
  return candidateScores.reduce(
    (scoresPerTheme: Array<UserAnswerWithScorePerTheme>, currentAnswer: UserAnswerWithScore) => {
      const existingThemeScore = scoresPerTheme.find(
        (scorePerTheme) => scorePerTheme.themeId === currentAnswer.themeId,
      );

      if (existingThemeScore) {
        return scoresPerTheme.map((themeScore) => {
          if (themeScore.themeId === currentAnswer.themeId) {
            return {
              ...themeScore,
              score: themeScore.score + currentAnswer.score,
              numberOfAnswers: themeScore.numberOfAnswers + 1,
            };
          }
          return themeScore;
        });
      }
      scoresPerTheme.push({
        themeId: currentAnswer.themeId,
        score: currentAnswer.score,
        numberOfAnswers: 1,
      });

      return scoresPerTheme;
    },
    [] as Array<UserAnswerWithScorePerTheme>,
  );
};
