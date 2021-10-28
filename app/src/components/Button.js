import React from "react";
import styled from "styled-components";
import Loader from "./Loader";

const Button = ({ children, withLoader, isLoading, ...props }) => {
  if (withLoader && isLoading)
    return (
      <ButtonStyled isLoading={isLoading} {...props}>
        <Loader size="33px" isLoading={isLoading} />
        {children}
      </ButtonStyled>
    );
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
};

const ButtonStyled = styled.button`
  padding: 15px 25px;
  background-color: #facc15;
  color: #111827;
  cursor: pointer;
  border: 1px solid #facc15;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  :disabled {
    opacity: 0.5;
    cursor: auto;
    ${(props) => props.isLoading && "opacity: 1;"}
    ${(props) => props.isLoading && "color: #facc15;"}
    ${(props) => props.isLoading && "cursor: wait;"}
  }
  > :first-child:not(sup) {
    position: absolute;
  }
  border-radius: 56px;
  cursor: pointer;
  line-height: 1em;
`;

export default Button;
