import quizz from "../quizz.json";
import { styled, createGlobalStyle } from "styled-components";

export const getPartysScores = (
  userResults,
  politicalPartys,
  orderedPoliticalPartysResults
) => {
  return politicalPartys.map((party) => {
    const matchedPartyResults = orderedPoliticalPartysResults.find((result) => {
      return result[0].user === party._id;
    });

    const userScoreLines = getUserResultScoreLines(userResults);
    const politicalPartyScores = getScore(userScoreLines, matchedPartyResults);
    const scorePerTheme = getScorePerTheme(politicalPartyScores);

    const results = scorePerTheme.map((score) => {
      return { ...score, politicalParty: party.pseudo };
    });

    return results;
  });
};

const getUserResultScoreLines = (userResults) =>
  userResults.map((answer) => {
    const theme = quizz.find((theme) => theme._id === answer.themeId);
    const { questions } = theme;
    const question = questions[answer.questionIndex];
    const scoreLine = question.scores[answer.answerIndex];
    return { ...answer, scoreLine };
  });

const getScore = (userScoreLines, matchedPartyResults) => {
  return userScoreLines.map((userAnswer) => {
    const politicalPartyMatchingAnswers = matchedPartyResults.find(
      (partyAnswer) => partyAnswer.question === userAnswer.question
    );
    const politicalPartyMatchingAnswersIndex =
      politicalPartyMatchingAnswers.answerIndex;
    return {
      themeId: userAnswer.themeId,
      questionIndex: userAnswer.questionIndex,
      score: userAnswer.scoreLine[politicalPartyMatchingAnswersIndex],
    };
  });
};

const getScorePerTheme = (politicalPartyScores) => {
  return politicalPartyScores.reduce((accumulator, currentValue, index) => {
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
