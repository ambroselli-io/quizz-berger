import React from "react";
import styled from "styled-components";

const hello = () => {
  return "helllo";
};

console.log(hello());

const Question = ({ question, answers }) => (
  <Container>
    <span>{question}</span>
    {answers.map((answer, index) => {
      return <AnswerButton key={index}>{answer}</AnswerButton>;
    })}
  </Container>
);

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AnswerButton = styled.button`
  margin-top: 20px;
  width: 100px;
`;

export default Question;
