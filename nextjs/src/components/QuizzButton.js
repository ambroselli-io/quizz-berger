import React from "react";
import styled from "styled-components";

const QuizzButton = ({ children, ...props }) => {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
};

const ButtonStyled = styled.button`
  padding: 10px 25px;
  background-color: #facc15;
  border: none;
  border-radius: 44px;
  color: black;
  cursor: pointer;
`;

export default QuizzButton;
