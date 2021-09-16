import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import quizz from "../quizz.json";
import API from "../services/api";

import Header from "../components/Header";

import rightArrow from "../images/right-arrow.svg";
import leftArrow from "../images/left-arrow.svg";

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
    // last theme
    const currentThemeIndex = user.themes.findIndex((tId) => tId === themeId);
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

  const goToNextTheme = (e) => {
    const currentThemeIndex = user.themes.findIndex((tId) => tId === themeId);
    let nextThemeId;
    if (currentThemeIndex < user.themes.length - 1) {
      nextThemeId = user.themes[currentThemeIndex + 1];
      const nextThemeFirstQuestionId = quizz.find((t) => t._id === nextThemeId)
        .questions[0]._id;
      return history.push(
        `/question/${nextThemeId}/${nextThemeFirstQuestionId}`
      );
    } else {
      return history.push(`/result`);
    }
  };

  const goToPreviousTheme = () => {
    const currentThemeIndex = user.themes.findIndex((tId) => tId === themeId);
    let previousThemeId;
    if (currentThemeIndex > 0) {
      previousThemeId = user.themes[currentThemeIndex - 1];
      const previousThemeFirstQuestionId = quizz.find(
        (t) => t._id === previousThemeId
      ).questions[0]._id;
      return history.push(
        `/question/${previousThemeId}/${previousThemeFirstQuestionId}`
      );
    } else {
      return history.push(`/theme`);
    }
  };

  const isFirstTheme = () => {
    const currentThemeIndex = user.themes.findIndex((tId) => tId === themeId);
    if (currentThemeIndex === 0) {
      return true;
    }
    return false;
  };

  const isLastTheme = () => {
    const currentThemeIndex = user.themes.findIndex((tId) => tId === themeId);
    if (currentThemeIndex === user.themes.length - 1) {
      return true;
    }
    return false;
  };

  // const sendAnswer = async (e) => {
  //   const response = await API.postWithCreds({
  //     path: "/answer",
  //     body: {
  //       user: user._id,
  //       themeId: currentTheme._id,
  //       questionId: questionId,
  //       answerIndex: e.target.dataset.index,
  //     },
  //   });
  //   if (!response.ok) {
  //     console.log(response.error);
  //   }

  //   if (response.ok) goToNextQuestion();
  // };

  return (
    <>
      <Header user={user} />
      <ThemeHeaderContainer>
        <ThemeNavigationButton onClick={goToPreviousTheme}>
          {isFirstTheme() ? "‹ Retour aux thèmes" : "‹ Thème précédent"}
        </ThemeNavigationButton>
        <ThemeTitle>{currentTheme.fr}</ThemeTitle>
        <ThemeNavigationButton onClick={goToNextTheme}>
          {isLastTheme() ? "Voir les résultats ›" : "Thème suivant ›"}
        </ThemeNavigationButton>
      </ThemeHeaderContainer>

      <BackgroundContainer>
        <QuestionContainer>
          <QuestionTitle>{fr}</QuestionTitle>
          <AnswerContainer>
            {answers.map((answer, index) => {
              return (
                <AnswerButton
                  // onClick={sendAnswer}
                  key={index}
                  data-index={index}
                >
                  {answer}
                </AnswerButton>
              );
            })}
          </AnswerContainer>
        </QuestionContainer>

        <ProgressBarContainer>
          <NavigationButton leftArrow={true} onClick={goToPreviousQuestion} />
          <ProgressBar />
          <ProgressBar />
          <ProgressBar />
          <NavigationButton onClick={goToNextQuestion} />
        </ProgressBarContainer>
      </BackgroundContainer>
    </>
  );
};

const ThemeHeaderContainer = styled.div`
  padding: 80px 150px 0px 150px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7df1e;
`;

const ThemeNavigationButton = styled.button`
  font-size: 14px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ThemeTitle = styled.h2`
  font-family: Merriweather;
  font-weight: bold;
  font-size: 20px;
`;

const BackgroundContainer = styled.div`
  padding: 40px;
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const QuestionContainer = styled.div``;

const QuestionTitle = styled.h2`
  margin-bottom: 40px;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
`;

const AnswerContainer = styled.div`
  display: flex;
`;

const AnswerButton = styled.button`
  margin: 0 10px;
  height: 120px;
  width: 240px;
  font-size: 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  :active {
    background: #111827;
    color: white;
  }
`;

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigationButton = styled.button`
  margin: 0 50px;
  height: 17px;
  width: 19px;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-image: ${(props) =>
    props.leftArrow ? `url(${leftArrow})` : `url(${rightArrow})`};
  background-repeat: no-repeat;
  background-size: cover;
`;

const ProgressBar = styled.div`
  margin: 0 5px;
  width: 315px;
  height: 4px;
  background: #f3f4f6;
  border-radius: 8px;
`;

export default Quizz;
