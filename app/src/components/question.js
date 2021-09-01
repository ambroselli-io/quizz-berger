import React from "react";
import styled from "styled-components";

const Question = ({ answers, question, nextQuestion, user, theme }) => {
  const sendAnswer = async (e) => {
    const response = await fetch("http://127.0.0.1:8080/user/answer", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
        theme: theme._id,
        question: question,
        answer: e.target.innerHTML,
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
      <LeftContainer>
        <ThemeTitle>{theme.fr}</ThemeTitle>
        <QuestionTitle>{question}</QuestionTitle>
      </LeftContainer>

      <AnswerContainer>
        {answers.map((answer, index) => {
          return (
            <AnswerButton onClick={sendAnswer} key={index}>
              {answer}
            </AnswerButton>
          );
        })}
      </AnswerContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftContainer = styled.div`
  margin-right: 50px;
`;

const ThemeTitle = styled.h2``;

const QuestionTitle = styled.h2``;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AnswerButton = styled.button`
  margin-top: 20px;
  width: 200px;
`;

export default Question;
