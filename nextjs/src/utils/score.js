const maxScorePerAnswer = 5;

/*

INPUT

answer: {
  user: ObjectId,
  themeId: Sring,
  questionId: Sring,
  answerIndex: Number,
}
userAnswers: [answer]
candidate: {
  answers: [answer],
  isCandidate: Bool, // is `true`
  pseudo: String,
  themes: [String], // should be all available themes
}
candidates: [candidate]

OUTPUT

newCandidate: {
  pseudo: String,
  scorePerThemes: [{ themeId: String, score: Number }],
  total: Number,
  totalPercentage: percent
}
[newCandidate]

*/

export const getCandidatesScorePerThemes = (userAnswers, candidatesAnswers, quizzQuestions) => {
  const userAnswersWithScoreLines = userAnswers.map(addScoreLinesToAnswers(quizzQuestions));

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

const addScoreLinesToAnswers = (quizzQuestions) => (answer) => {
  const question = quizzQuestions.find((q) => q._id === answer.questionId);

  const scoreLine = question.scores[answer.answerIndex];
  return { ...answer, scoreLine };
};

const addScoreToCandidateAnswer = (userAnswersWithScoreLines, candidateAnswers) =>
  userAnswersWithScoreLines
    .map((userAnswer) => {
      const candidateMatchingAnswer = candidateAnswers.find(
        (partyAnswer) => partyAnswer.questionId === userAnswer.questionId
      );
      // if user answer score is 0 and candidate has the same answer, we ignore it
      const isSameAnswer = candidateMatchingAnswer?.answerIndex === userAnswer.answerIndex;
      const isNotInterestedAnswer = !userAnswer.scoreLine.filter(Boolean).length;
      if (isSameAnswer && isNotInterestedAnswer) return null;
      const politicalPartyMatchingAnswersIndex = candidateMatchingAnswer?.answerIndex;
      return {
        ...userAnswer,
        score: !isNaN(politicalPartyMatchingAnswersIndex)
          ? userAnswer.scoreLine[politicalPartyMatchingAnswersIndex]
          : 0,
      };
    })
    .filter(Boolean);

const getScorePerTheme = (candidateScores) => {
  return candidateScores.reduce((scoresPerTheme, currentAnswer) => {
    const existingThemeScore = scoresPerTheme.find((scorePerTheme) => scorePerTheme.themeId === currentAnswer.themeId);

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
