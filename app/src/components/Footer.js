import React from "react";
import styled from "styled-components";
import { media } from "../styles/mediaQueries";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import ContactModal from "../components/ContactModal";
import Legal from "./Legal";

class Footer extends React.Component {
  state = {
    showLegalModal: false,
    showContactModal: false,
  };

  onCloseLegalModal = (e) => {
    if (e.target !== e.currentTarget) return;
    this.setState({ showLegalModal: false });
    document.body.style.overflow = "visible";
  };

  onOpenLegalModal = (e) => {
    this.setState({ showLegalModal: true });
    document.body.style.overflow = "hidden";
  };

  onCloseContactModal = (e) => {
    if (e.target !== e.currentTarget) return;
    this.setState({ showContactModal: false });
    document.body.style.overflow = "visible";
  };

  onOpenContactModal = () => {
    this.setState({ showContactModal: true });
    document.body.style.overflow = "hidden";
  };

  render() {
    const { showContactModal, showLegalModal } = this.state;
    const { user } = this.props;
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
            <FooterMenuTab onClick={this.onOpenContactModal}>Nous contacter</FooterMenuTab>
            <FooterMenuTab onClick={this.onOpenLegalModal}>Mentions légales</FooterMenuTab>
          </FooterMenu>
        </Container>
        {/* -- MODAL -- */}
        <Legal isActive={showLegalModal} onClose={this.onCloseLegalModal} />
        <ContactModal
          isActive={showContactModal}
          onCloseContactModal={this.onCloseContactModal}
          user={user}
        />
      </FooterContainer>
    );
  }
}

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
