import React from "react";
import styled from "styled-components";
import quizz from "../quizz.json";

import Header from "../components/header";
import Question from "../components/question";

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

    const currentThemeQuestions = currentTheme.questions;

    if (currentQuestionId < currentThemeQuestions.length - 1) {
      console.log("next");
      this.setState({ currentQuestionId: currentQuestionId + 1 });
    } else if (currentThemeId < this.props.user.themes.length - 1) {
      this.setState({
        currentThemeId: currentThemeId + 1,
        currentQuestionId: 0,
      });
    }
  };

  previousQuestion = () => {
    const { currentThemeId, currentQuestionId } = this.state;
    const { user } = this.props;

    const currentThemeQuestions = quizz.find((theme) => {
      return theme._id === user.themes[currentThemeId];
    }).questions;

    if (currentQuestionId > 0) {
      console.log("previous");
      this.setState({ currentQuestionId: currentQuestionId - 1 });
    } else if (currentThemeId > 0) {
      this.setState({
        currentThemeId: currentThemeId - 1,
        currentQuestionId: currentThemeQuestions.length - 1,
      });
    }
  };

  previousTheme = () => {
    const { currentThemeId, currentQuestionId } = this.state;
    const { user } = this.props;

    if (currentThemeId > 0) {
      console.log("previous");
      this.setState({
        currentThemeId: currentThemeId - 1,
        currentQuestionId: 0,
      });
    }
  };

  nextTheme = () => {
    const { currentThemeId, currentQuestionId } = this.state;
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

    const { question, answers } = currentThemeQuestions[currentQuestionId];

    return (
      <>
        <Header isActive={true} />
        <BackgroundContainer>
          <SubContainer>
            <Question
              theme={currentTheme}
              question={question}
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

const Title = styled.h1`
  font-family: Nunito SANS;
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

export default Quizz;
