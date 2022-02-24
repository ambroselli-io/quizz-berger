import React from "react";
import styled from "styled-components";
import { media } from "../styles/mediaQueries";

const Modal = ({ title, isActive, onCloseModal, children, center = false }) => {
  return (
    <>
      <BackgroundContainer className="modal-container" isActive={isActive} onClick={onCloseModal}>
        <ModalContainer>
          <TitleContainer>
            <Title>{title}</Title>
            <CrossButton onClick={onCloseModal} />
          </TitleContainer>
          <ModalInnerContainer center={center}>{children}</ModalInnerContainer>
        </ModalContainer>
      </BackgroundContainer>
    </>
  );
};

const BackgroundContainer = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.isActive ? `flex` : `none`)};
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled.div`
  flex: 1;
  padding: 40px;
  max-width: 700px;
  height: auto;
  background-color: white;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  ${media.mobile`
    max-height: 400px;
  `}
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: Merriweather;
  font-size: 20px;
  font-weight: bold;
  max-width: 80%;
  text-align: center;
`;

const CrossButton = styled.button`
  height: 15px;
  width: 15px;
  background: url(/cross.svg) no-repeat;
  background-size: cover;
  color: black;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0;
`;

const ModalInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif;
  ${(props) => props.center && "align-items: center;"}
  ${(props) => props.center && "text-align: center;"}
  margin-top: 25px;
  * {
    letter-spacing: 0.01rem;
  }
  button {
    font-family: Merriweather Sans;
  }
  > span {
    width: 75%;
    margin-bottom: 25px;
  }
  ${media.mobile`
  overflow: auto;
`}
`;

export default Modal;
