const maxScorePerAnswer = 5;

export const getCandidatesScorePerThemes = (userAnswers, candidatesAnswers, quizz) => {
  const userAnswersWithScoreLines = addScoreLinesToAnswers(userAnswers, quizz);

  return candidatesAnswers.map((candidate) => {
    const candidateScores = addScoreToCandidateAnswer(userAnswersWithScoreLines, candidate.answers);
    const scorePerThemes = getScorePerTheme(candidateScores);
    const results = scorePerThemes.map((theme) => {
      return {
        themeId: theme.themeId,
        score: (theme.score / (theme.numberOfAnswers * maxScorePerAnswer)) * 100,
        pseudo: candidate.pseudo,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        partyName: candidate.partyName,
        isCandidate: candidate.isCandidate,
      };
    });
    return results;
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
  console.log({ candidateScores });
  return candidateScores.reduce((scoresPerTheme, currentAnswer) => {
    const existingThemeScore = scoresPerTheme.find(
      (scorePerTheme) => scorePerTheme.themeId === currentAnswer.themeId
    );

    console.log({ existingThemeScore });
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
