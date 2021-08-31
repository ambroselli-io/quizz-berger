import React from "react";
import styled from "styled-components";
import quizz from "../quizz.json";

import Question from "../components/question";

class Quizz extends React.Component {
  state = {
    currentTheme: this.props.user.themes[0],
    currentQuestion: 0,
  };

  render() {
    console.log(quizz, "quizz");

    const themeQuestions = quizz[this.state.currentTheme];
    const { question, answers } = themeQuestions[this.state.currentQuestion];

    console.log(question, answers);

    return (
      <BackgroundContainer>
        <SubContainer>
          <Title>Répondez aux questions</Title>
          <Question question={question} answers={answers} />
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
