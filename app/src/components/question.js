import React from "react";
import styled from "styled-components";

const Question = ({
  answers,
  question,
  questionIndex,
  scores,
  user,
  theme,
  nextQuestion,
  previousQuestion,
  nextTheme,
  previousTheme,
}) => {
  const sendAnswer = async (e) => {
    const response = await fetch("http://127.0.0.1:8080/user/answer", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
        theme: theme.fr,
        themeId: theme._id,
        question: question,
        questionIndex: questionIndex,
        answer: e.target.innerHTML,
        answerIndex: e.target.dataset.index,
      }),
    }).then((res) => {
      return res.json();
    });
    if (response.ok) {
      nextQuestion();
    }
  };

  return (
    <Container>
      <ThemeContainer>
        <ThemeTitle>{theme.fr}</ThemeTitle>
      </ThemeContainer>
      <QuestionContainer>
        <QuestionTitle>{question}</QuestionTitle>
      </QuestionContainer>
      <AnswerContainer>
        {answers.map((answer, index) => {
          return (
            <AnswerButton onClick={sendAnswer} key={index} data-index={index}>
              {answer}
            </AnswerButton>
          );
        })}
      </AnswerContainer>
      <NavigationContainer>
        <NavigationButton onClick={previousQuestion}>
          Question précédente
        </NavigationButton>
        <NavigationButton onClick={nextQuestion}>
          Question suivante
        </NavigationButton>
      </NavigationContainer>
      <NavigationContainer>
        <NavigationButton onClick={previousTheme}>
          Theme précédente
        </NavigationButton>
        <NavigationButton onClick={nextTheme}>Theme suivante</NavigationButton>
      </NavigationContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ThemeContainer = styled.div`
  display: flex;
`;

const QuestionContainer = styled.div`
  display: flex;
`;

const ThemeTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 36px;
`;

const QuestionTitle = styled.h2``;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AnswerButton = styled.button`
  margin-top: 20px;
  width: 300px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  font-size: 16px;
`;

// const PreviousNavigationButton = styled.button`
//   border: none;
//   background-color: transparent;
//   cursor: pointer;
//   font-size: 20px;
//   & > img {
//     color: black;
//     height: 20px;
//     width: 20px;
//     transform: rotate(180deg);
//   }
// `;

// const NextNavigationButton = styled.button`
//   height: 100%;
//   border: none;
//   background-color: transparent;
//   cursor: pointer;
//   font-size: 20px;
//   & > img {
//     color: black;
//     height: 20px;
//     width: auto;
//   }
// `;

const NavigationContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 15px;
`;

const NavigationButton = styled.button`
  height: 40px;
  width: 140px;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default Question;
