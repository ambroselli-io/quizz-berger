/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styled from "styled-components";
import InternalLink from "../components/InternalLink";
import Modal from "../components/Modal";

const Filter = ({ toggle, isActive, children, title, hideTitle }) => {
  return (
    <>
      {!hideTitle && (
        <InternalLinkStyled onClick={() => toggle((show) => !show)}>{title}</InternalLinkStyled>
      )}
      <Modal
        title={title}
        isActive={isActive}
        onForceCloseModal={(e) => {
          toggle(false);
          document.body.style.overflow = "visible";
        }}
        onCloseModal={(e) => {
          if (e.target !== e.currentTarget) return;
          toggle(false);
          document.body.style.overflow = "visible";
        }}
        center>
        <ButtonsContainer isActive={isActive}>{children}</ButtonsContainer>
      </Modal>
    </>
  );
};

const InternalLinkStyled = styled(InternalLink)`
  margin-right: 15px;
`;

const ButtonsContainer = styled.div`
  max-width: 500px;
  width: auto;
  margin-bottom: 20px;
  display: ${(props) => (props.isActive ? "flex" : "none")};
  grid-template-columns: auto auto auto;
  flex-flow: row wrap;
  grid-gap: 12px;
`;

export default Filter;
