import React from "react";
import styled from "styled-components";

const Button = ({ children, ...props }) => <ButtonStyled {...props}>{children}</ButtonStyled>;

const ButtonStyled = styled.button`
  padding: 15px 25px;
  background-color: #facc15;
  color: black;
  cursor: pointer;
  :disabled {
    background-color: rgb(233, 233, 233);
    color: rgb(17, 24, 39, 0.2);
    cursor: auto;
  }
  border-radius: 56px;
  border: 1px solid #facc15;
  cursor: pointer;
  line-height: 1em;
`;

export default Button;
