import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import quizz from "../quizz.json";

import Header from "../components/Header";
import Question from "../components/Question";

const Quizz = ({ user }) => {
  const { themeId, questionId } = useParams();
  const history = useHistory();

  const currentTheme = quizz.find((theme) => {
    return theme._id === themeId;
  });

  const currentThemeQuestions = currentTheme.questions;

  const { fr, answers } = currentThemeQuestions.find(
    (question) => question._id === questionId
  );

  const goToNextQuestion = () => {
    const currentQuestionIndex = currentThemeQuestions.findIndex(
      (question) => question._id === questionId
    );
    let nextThemeId;
    let nextQuestionId;
    // middle question of current theme
    if (currentQuestionIndex < currentThemeQuestions.length - 1) {
      nextThemeId = themeId;
      nextQuestionId = currentThemeQuestions[currentQuestionIndex + 1]._id;
      return history.push(`/question/${nextThemeId}/${nextQuestionId}`);
    }
    // last question of current theme
    const currentThemeIndex = user.themes.findIndex((tId) => tId === themeId);
    // last theme
    if (currentThemeIndex === user.themes.length - 1) {
      return history.push("/result");
    }
    // got to next theme
    nextThemeId = user.themes[currentThemeIndex + 1];
    const nextTheme = quizz.find((theme) => theme._id === nextThemeId);
    nextQuestionId = nextTheme.questions[0]._id;
    return history.push(`/question/${nextThemeId}/${nextQuestionId}`);
  };

  const goToPreviousQuestion = () => {
    const currentQuestionIndex = currentThemeQuestions.findIndex(
      (question) => question._id === questionId
    );
    let previousThemeId;
    let previousQuestionId;
    // // middle question of current theme
    if (currentQuestionIndex > 0) {
      previousThemeId = themeId;
      previousQuestionId = currentTheme.questions[currentQuestionIndex - 1]._id;
      return history.push(`/question/${previousThemeId}/${previousQuestionId}`);
    }
    // // last question of current theme
    const currentThemeIndex = user.themes.findIndex((tId) => tId === themeId);
    const firstUserTheme = user.themes[0];
    const firstUserThemeIndex = quizz.findIndex(
      (t) => t._id === firstUserTheme
    );
    // last theme
    if (currentThemeIndex < firstUserThemeIndex) {
      return history.push("/theme");
    }
    // got to next themee
    previousThemeId = user.themes[currentThemeIndex - 1];
    const previousTheme = quizz.find((theme) => theme._id === previousThemeId);
    const previousThemeLastQuestionIndex = previousTheme.questions.length - 1;
    const previousThemeLastQuestionId =
      previousTheme.questions[previousThemeLastQuestionIndex]._id;
    return history.push(
      `/question/${previousThemeId}/${previousThemeLastQuestionId}`
    );
  };

  const goToNextTheme = () => {
    const currentThemeIndex = user.themes.findIndex((tId) => tId === themeId);
    let nextThemeId;
    if (currentThemeIndex < user.themes.length - 1) {
      nextThemeId = user.themes[currentThemeIndex + 1];
      return history.push(`/question/${nextThemeId}/1`);
    }
  };

  const goToPreviousTheme = () => {
    const currentThemeIndex = user.themes.findIndex((tId) => tId === themeId);
    let previousThemeId;
    if (currentThemeIndex > 0) {
      previousThemeId = user.themes[currentThemeIndex - 1];
      return history.push(`/question/${previousThemeId}/1`);
    }
  };

  return (
    <>
      <Header />
      <BackgroundContainer>
        <SubContainer>
          <Question
            theme={currentTheme}
            question={fr}
            questionId={questionId}
            answers={answers}
            user={user}
            nextQuestion={goToNextQuestion}
            previousQuestion={goToPreviousQuestion}
            nextTheme={goToNextTheme}
            previousTheme={goToPreviousTheme}
          />
        </SubContainer>
      </BackgroundContainer>
    </>
  );
};

const BackgroundContainer = styled.div`
  padding: 40px;
  min-height: 100vh;
  background-color: #f7df1e;
`;

const SubContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Quizz;
