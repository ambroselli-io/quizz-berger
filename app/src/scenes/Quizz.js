import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import quizz from "../quizz.json";
import { media } from "../styles/mediaQueries";

import rightArrow from "../images/right-arrow.svg";
import leftArrow from "../images/left-arrow.svg";

const Quizz = ({ user, setAnswer, currentAnswerIndex }) => {
  const { themeId, questionId } = useParams();
  const history = useHistory();

  const currentTheme = quizz.find((theme) => {
    return theme._id === themeId;
  });

  const currentThemeQuestions = currentTheme.questions;

  const { fr, answers } = currentThemeQuestions.find((question) => question._id === questionId);

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
    const firstUserThemeIndex = quizz.findIndex((t) => t._id === firstUserTheme);
    // last theme
    if (currentThemeIndex < firstUserThemeIndex) {
      return history.push("/theme");
    }
    // got to next themee
    previousThemeId = user.themes[currentThemeIndex - 1];
    const previousTheme = quizz.find((theme) => theme._id === previousThemeId);
    const previousThemeLastQuestionIndex = previousTheme.questions.length - 1;
    const previousThemeLastQuestionId = previousTheme.questions[previousThemeLastQuestionIndex]._id;
    return history.push(`/question/${previousThemeId}/${previousThemeLastQuestionId}`);
  };

  const goToNextTheme = (e) => {
    const currentThemeIndex = user.themes.findIndex((tId) => tId === themeId);
    let nextThemeId;
    if (currentThemeIndex < user.themes.length - 1) {
      nextThemeId = user.themes[currentThemeIndex + 1];
      const nextThemeFirstQuestionId = quizz.find((t) => t._id === nextThemeId).questions[0]._id;
      return history.push(`/question/${nextThemeId}/${nextThemeFirstQuestionId}`);
    } else {
      return history.push(`/result`);
    }
  };

  const goToPreviousTheme = () => {
    const currentThemeIndex = user.themes.findIndex((tId) => tId === themeId);
    let previousThemeId;
    if (currentThemeIndex > 0) {
      previousThemeId = user.themes[currentThemeIndex - 1];
      const previousThemeFirstQuestionId = quizz.find((t) => t._id === previousThemeId).questions[0]
        ._id;
      return history.push(`/question/${previousThemeId}/${previousThemeFirstQuestionId}`);
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

  const sendAnswer = async (e) => {
    const ok = await setAnswer({
      user: user._id,
      themeId: currentTheme._id,
      questionId: questionId,
      answerIndex: e.target.dataset.index,
    });
    if (ok) {
      window.scrollTo(0, 0);
      goToNextQuestion();
    }
  };

  return (
    <>
      <ThemeHeaderContainer>
        <ThemeNavigationContainer>
          <ThemeNavigationButton onClick={goToPreviousTheme}>
            {isFirstTheme() ? "‹ Retour aux thèmes" : "‹ Thème précédent"}
          </ThemeNavigationButton>
          <ThemeTitle>{currentTheme.fr}</ThemeTitle>
          <ThemeNavigationButton onClick={goToNextTheme}>
            {isLastTheme() ? "Voir les résultats ›" : "Thème suivant ›"}
          </ThemeNavigationButton>
        </ThemeNavigationContainer>
        <MobileThemeTitle>{currentTheme.fr}</MobileThemeTitle>
      </ThemeHeaderContainer>

      <BackgroundContainer>
        {/* <QuestionContainer> */}
        <QuestionTitle>{fr}</QuestionTitle>
        <AnswerContainer>
          {answers.map((answer, index) => {
            return (
              <AnswerButton
                isActive={currentAnswerIndex === index}
                onClick={sendAnswer}
                key={index}
                data-index={index}>
                {answer}
              </AnswerButton>
            );
          })}
        </AnswerContainer>
        {/* </QuestionContainer> */}

        <ProgressBarContainer>
          <NavigationButton leftArrow={true} onClick={goToPreviousQuestion} />
          {user.themes.map((t, index) => {
            const currentThemeIndex = user.themes.findIndex((t) => t === themeId);

            const currentQuestionIndex = currentThemeQuestions.findIndex(
              (q) => q._id === questionId
            );

            const questionsProgress = () => {
              if (currentThemeIndex > index) {
                return "100%";
              }
              if (currentThemeIndex === index) {
                const progressWidth = 100 / currentThemeQuestions.length;
                return `${progressWidth * currentQuestionIndex}%`;
              }
              return "0%";
            };

            return (
              <ProgressBar key={index}>
                <Progress
                  data-index={index}
                  isThemeComplete={currentThemeIndex > index}
                  questionsProgress={questionsProgress()}
                />
              </ProgressBar>
            );
          })}
          <NavigationButton onClick={goToNextQuestion} />
        </ProgressBarContainer>
      </BackgroundContainer>
    </>
  );
};

const ThemeHeaderContainer = styled.div`
  padding: 0 20px 0 20px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7df1e;
  ${media.mobile`
  padding: 0 15px 0 15px;
  justify-content: space-evenly;
  flex-direction: column;
  max-height: 126px; //
  min-height: 90px; //
  height: 110px;
`}
`;

const ThemeNavigationContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  text-align: center;
  ${media.mobile`
  display: none;
`}
`;

const MobileThemeTitle = styled.h2`
  display: none;
  ${media.mobile`
  text-align: center;
  display: block;
  font-family: Merriweather;
  font-weight: bold;
  font-size: 18px;
`}
`;

const BackgroundContainer = styled.div`
  padding: 40px 20px 80px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${media.mobile`
  padding: 40px 10px 100px 10px;
`};
`;

// const QuestionContainer = styled.div`
//   width: 100%;
//   ${media.mobile`
//   padding-bottom: 60px;
// `};
// `;

const QuestionTitle = styled.h2`
  margin-bottom: 40px;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
`;

const AnswerContainer = styled.div`
  max-width: 1020px;
  display: flex;
  grid-gap: 15px;
  flex-direction: column;
  align-items: center;
`;

const AnswerButton = styled.button`
  padding: 10px;
  width: 500px;
  min-height: 60px;
  font-size: 16px;
  background: ${(props) => (props.isActive ? `#111827` : `#ffffff`)};
  color: ${(props) => (props.isActive ? `#ffffff` : `black`)};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  :active {
    background: #111827;
    color: white;
  }
  ${media.mobile`
  width: 300px;
`};
`;

const ProgressBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  height: 80px;
  max-width: 1024px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  ${media.mobile`
  padding: 0 10px;
  max-height: 80px;
  min-height: 50px;
  height: 11vh;
  width: 100%;
  border-top: 1px solid black;
`}
`;

const NavigationButton = styled.button`
  margin: ${(props) => (props.leftArrow ? `0 50px 0 0px` : `0 0px 0 50px`)};
  height: 17px;
  min-width: 19px;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-image: ${(props) => (props.leftArrow ? `url(${leftArrow})` : `url(${rightArrow})`)};
  background-repeat: no-repeat;
  background-size: cover;
  ${media.mobile`
  margin: ${(props) => (props.leftArrow ? `0 10px 0 0px` : `0 0px 0 10px`)};
`}
`;

const ProgressBar = styled.div`
  margin: 0 5px;
  width: 100%;
  height: 4px;
  background: #f3f4f6;
  border-radius: 8px;
  ${media.mobile`
`}
`;

const Progress = styled.div`
  width: ${(props) => props.questionsProgress};
  height: 4px;
  background: #111827;
  border-radius: 8px;
`;

export default Quizz;
