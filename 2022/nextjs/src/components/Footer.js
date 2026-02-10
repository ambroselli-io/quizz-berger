import React, { useState } from "react";
import styled from "styled-components";
import { media } from "../styles/mediaQueries";
import Link from "next/link";
import ModalContact from "./ModalContact";
import ModalLegal from "./ModalLegal";
import Logo from "./Logo";
import useUser from "../hooks/useUser";
import ModalQuiSommesNous from "./ModalQuiSommesNous";

const Footer = () => {
  const { user } = useUser({ from: "Footer" });
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showQuiSommesNousModal, setShowQuiSommesNouslModal] = useState(false);
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

  const onOpenQuiSommesNousModal = (e) => {
    setShowQuiSommesNouslModal(true);
    document.body.style.overflow = "hidden";
  };

  const onCloseQuiSommesNousModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowQuiSommesNouslModal(false);
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
          <Link href="/" passHref>
            <HeaderLogo>
              <Logo />
            </HeaderLogo>
          </Link>
          <Link href="/" passHref>
            <Title>Le Quizz du Berger</Title>
          </Link>
        </LeftContainer>
        <FooterMenu>
          <FooterMenuTab>
            <a target="_blank" rel="noreferrer" href="https://github.com/ambroselli-io/quizz-berger">
              Open-source
            </a>
          </FooterMenuTab>
          <FooterMenuTab onClick={onOpenContactModal}>Nous contacter</FooterMenuTab>
          <FooterMenuTab onClick={onOpenLegalModal}>Mentions légales</FooterMenuTab>
          <FooterMenuTab onClick={onOpenQuiSommesNousModal}>Qui sommes nous ?</FooterMenuTab>
        </FooterMenu>
      </Container>
      {/* -- MODAL -- */}
      <ModalLegal isActive={showLegalModal} onClose={onCloseLegalModal} />
      <ModalQuiSommesNous isActive={showQuiSommesNousModal} onClose={onCloseQuiSommesNousModal} />
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
  background-color: #111827;
  color: #ffffff;
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
  color: rgba(156, 163, 175, 1);
  list-style: none;
  cursor: pointer;
`;

export default Footer;
