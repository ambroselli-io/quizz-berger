import React from "react";
import styled from "styled-components";
import quizz from "../quizz.json";

import Header from "../components/Header";
import Question from "../components/Question";

class Quizz extends React.Component {
  state = {
    currentThemeId: 0,
    currentQuestionId: 0,
  };

  nextQuestion = () => {
    const { currentThemeId, currentQuestionId } = this.state;
    const { user } = this.props;

    const currentTheme = quizz.find((theme) => {
      return theme._id === user.themes[currentThemeId];
    });

    const questionsIds = currentTheme.questions.map((q) => q.questionId);
    const currentQuestionIndex = questionsIds.findIndex((q) => q.questionId === currentQuestionId);

    const currentThemeQuestions = currentTheme.questions;

    if (currentQuestionIndex < currentThemeQuestions.length - 1) {
      this.setState({ currentQuestionId: questionsIds[currentQuestionId + 1] });
    } else if (currentThemeId < user.themes.length - 1) {
      this.setState({
        currentThemeId: currentThemeId + 1,
        currentQuestionId: 0,
      });
    } else if (
      currentQuestionId === currentThemeQuestions.length - 1 &&
      currentThemeId === user.themes.length - 1
    ) {
      this.props.history.push("/result");
      console.log("finish");
    }
  };

  previousQuestion = () => {
    const { currentThemeId, currentQuestionId } = this.state;
    const { user } = this.props;

    const currentThemeQuestions = quizz.find((theme) => {
      return theme._id === user.themes[currentThemeId];
    }).questions;

    if (currentQuestionId > 0) {
      this.setState({ currentQuestionId: currentQuestionId - 1 });
    } else if (currentThemeId > 0) {
      this.setState({
        currentThemeId: currentThemeId - 1,
        currentQuestionId: currentThemeQuestions.length - 1,
      });
    }
  };

  previousTheme = () => {
    const { currentThemeId } = this.state;

    if (currentThemeId > 0) {
      console.log("previous");
      this.setState({
        currentThemeId: currentThemeId - 1,
        currentQuestionId: 0,
      });
    }
  };

  nextTheme = () => {
    const { currentThemeId } = this.state;
    const { user } = this.props;

    if (currentThemeId < user.themes.length - 1) {
      console.log("previous");
      this.setState({
        currentThemeId: currentThemeId + 1,
        currentQuestionId: 0,
      });
    }
  };

  render() {
    const { currentThemeId, currentQuestionId } = this.state;
    const { user } = this.props;

    const currentTheme = quizz.find((theme) => {
      return theme._id === user.themes[currentThemeId];
    });

    const currentThemeQuestions = currentTheme.questions;

    const { fr, answers } = currentThemeQuestions[currentQuestionId];

    return (
      <>
        <Header />
        <BackgroundContainer>
          <SubContainer>
            <Question
              theme={currentTheme}
              question={fr}
              questionId={currentQuestionId}
              answers={answers}
              user={user}
              nextQuestion={this.nextQuestion}
              previousQuestion={this.previousQuestion}
              nextTheme={this.nextTheme}
              previousTheme={this.previousTheme}
            />
          </SubContainer>
        </BackgroundContainer>
      </>
    );
  }
}

const BackgroundContainer = styled.div`
  padding: 40px;
  min-height: 100vh;
  width: 100vw;
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
