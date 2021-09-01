import React from "react";
import styled from "styled-components";
import quizz from "../quizz.json";

import Question from "../components/question";

class Quizz extends React.Component {
  state = {
    currentTheme: 0,
    currentQuestion: 0,
  };

  nextQuestion = () => {
    const themeQuestions =
      quizz[this.props.user.themes[this.state.currentTheme]].questions;
    const { currentTheme, currentQuestion } = this.state;

    if (currentQuestion < themeQuestions.length - 1) {
      this.setState({ currentQuestion: currentQuestion + 1 });
    } else if (currentTheme < this.props.user.themes.length - 1) {
      this.setState({
        currentTheme: currentTheme + 1,
        currentQuestion: 0,
      });
    }
  };

  render() {
    const themeQuestions =
      quizz[this.props.user.themes[this.state.currentTheme]].questions;
    const { question, answers } = themeQuestions[this.state.currentQuestion];
    const CurrentTheme = quizz[this.props.user.themes[this.state.currentTheme]];

    return (
      <BackgroundContainer>
        <SubContainer>
          <Title>Répondez aux questions</Title>
          <Question
            theme={CurrentTheme}
            question={question}
            answers={answers}
            user={this.props.user}
            nextQuestion={this.nextQuestion}
          />
        </SubContainer>
      </BackgroundContainer>
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
  margin-bottom: 20px;
  text-align: center;
`;

export default Quizz;
