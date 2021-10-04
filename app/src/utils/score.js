const maxScorePerAnswer = 5;

export const getCandidatesScorePerThemes = (userAnswers, candidatesAnswers, quizz) => {
  const userAnswersWithScoreLines = addScoreLinesToAnswers(userAnswers, quizz);

  return candidatesAnswers.map((candidate) => {
    const candidateScores = addScoreToCandidateAnswer(userAnswersWithScoreLines, candidate.answers);
    return {
      ...candidate,
      scorePerThemes: getScorePerTheme(candidateScores).map((theme) => ({
        themeId: theme.themeId,
        score: Math.round((theme.score / (theme.numberOfAnswers * maxScorePerAnswer)) * 100),
      })),
    };
  });
};

const addScoreLinesToAnswers = (userAnswers, quizz) =>
  userAnswers.map((answer) => {
    const theme = quizz.find((theme) => theme._id === answer.themeId);
    const { questions } = theme;
    const question = questions.find((q) => {
      return q._id === answer.questionId;
    });

    const scoreLine = question.scores[answer.answerIndex];
    return { ...answer, scoreLine };
  });

const addScoreToCandidateAnswer = (userAnswersWithScoreLines, candidateAnswers) =>
  userAnswersWithScoreLines.map((userAnswer) => {
    const candidateMatchingAnswer = candidateAnswers.find(
      (partyAnswer) => partyAnswer.questionId === userAnswer.questionId
    );
    const politicalPartyMatchingAnswersIndex = candidateMatchingAnswer?.answerIndex;
    return {
      ...userAnswer,
      score: !isNaN(politicalPartyMatchingAnswersIndex)
        ? userAnswer.scoreLine[politicalPartyMatchingAnswersIndex]
        : 0,
    };
  });

const getScorePerTheme = (candidateScores) => {
  return candidateScores.reduce((scoresPerTheme, currentAnswer) => {
    const existingThemeScore = scoresPerTheme.find(
      (scorePerTheme) => scorePerTheme.themeId === currentAnswer.themeId
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
  }, []);
};
