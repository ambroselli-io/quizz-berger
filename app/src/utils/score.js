import quizz from "../quizz.json";

export const getCandidatesScorePerThemes = (userAnswers, candidatesAnswers) => {
  const userAnswersWithScoreLines = addScoreLinesToAnswers(userAnswers);

  return candidatesAnswers.map((candidate) => {
    const candidateScores = addScoreToCandidateAnswer(
      userAnswersWithScoreLines,
      candidate.answers
    );
    const scorePerThemes = getScorePerTheme(candidateScores);
    const results = scorePerThemes.map((theme) => {
      return {
        themeId: theme.themeId,
        score: theme.score,
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

const addScoreLinesToAnswers = (userAnswers) =>
  userAnswers.map((answer) => {
    const theme = quizz.find((theme) => theme._id === answer.themeId);
    const { questions } = theme;
    const question = questions.find((q) => {
      return q._id === answer.questionId;
    });

    const scoreLine = question.scores[answer.answerIndex];
    return { ...answer, scoreLine };
  });

const addScoreToCandidateAnswer = (
  userAnswersWithScoreLines,
  candidateAnswers
) =>
  userAnswersWithScoreLines.map((userAnswer) => {
    const candidateMatchingAnswer = candidateAnswers.find(
      (partyAnswer) => partyAnswer.questionId === userAnswer.questionId
    );
    const politicalPartyMatchingAnswersIndex =
      candidateMatchingAnswer.answerIndex;
    return {
      ...userAnswer,
      score: userAnswer.scoreLine[politicalPartyMatchingAnswersIndex],
    };
  });

const getScorePerTheme = (candidateScores) => {
  return candidateScores.reduce((accumulator, currentValue, index) => {
    const existingThemeScore = accumulator.find(
      (child) => child.themeId === currentValue.themeId
    );

    if (existingThemeScore) {
      return accumulator.map((themeScore) => {
        if (themeScore.themeId === currentValue.themeId)
          return {
            ...themeScore,
            score: themeScore.score + currentValue.score,
          };
        return themeScore;
      });
    }
    accumulator.push({
      themeId: currentValue.themeId,
      score: currentValue.score,
    });

    return accumulator;
  }, []);
};
