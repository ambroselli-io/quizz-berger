import React, { useContext, useState } from "react";
import styled from "styled-components";
import { media } from "../styles/mediaQueries";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import ModalContact from "./ModalContact";
import ModalLegal from "./ModalLegal";
import UserContext from "../contexts/user";

const Footer = () => {
  const { user } = useContext(UserContext);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const onCloseLegalModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowLegalModal(false);
    document.body.style.overflow = "visible";
  };

  const onOpenLegalModal = (e) => {
    setShowLegalModal(true);
    document.body.style.overflow = "hidden";
  };

  const onCloseContactModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowContactModal(false);
    document.body.style.overflow = "visible";
  };

  const onForceCloseContactModal = (e) => {
    setShowContactModal(false);
    document.body.style.overflow = "visible";
  };

  const onOpenContactModal = () => {
    setShowContactModal(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <FooterContainer>
      <Container>
        <LeftContainer>
          <Link to="/home">
            <HeaderLogo />
          </Link>
          <Link to="/home">
            <Title>Le Quizz du Berger</Title>
          </Link>
        </LeftContainer>
        <FooterMenu>
          <FooterMenuTab onClick={onOpenContactModal}>Nous contacter</FooterMenuTab>
          <FooterMenuTab onClick={onOpenLegalModal}>Mentions légales</FooterMenuTab>
        </FooterMenu>
      </Container>
      {/* -- MODAL -- */}
      <ModalLegal isActive={showLegalModal} onClose={onCloseLegalModal} />
      <ModalContact
        isActive={showContactModal}
        onCloseModal={onCloseContactModal}
        onForceCloseModal={onForceCloseContactModal}
        key={user?._id}
      />
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  padding: 0 40px;
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  ${media.mobile`
  display: none;
`}
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled.div`
  margin-right: 10px;
  height: 32px;
  width: 32px;
  background: url(${logo}) no-repeat;
  background-size: cover;
  border: none;
`;

const Title = styled.h1`
  font-family: Merriweather;
  font-size: 20px;
  font-weight: bold;
  ${media.mobile`
  display: none;
`}
`;

const FooterMenu = styled.ul`
  display: flex;
  grid-gap: 40px;
  align-items: center;
  justify-content: space-evenly;
  ${media.mobile`
  grid-gap: 20px;
`}
`;

const FooterMenuTab = styled.li`
  font-size: 14px;
  color: #4b5563;
  list-style: none;
  cursor: pointer;
`;

export default Footer;
