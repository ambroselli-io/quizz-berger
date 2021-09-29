import React from "react";
import styled from "styled-components";
import { media } from "../styles/mediaQueries";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  state = {
    showModal: true,
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  onOpenModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    return (
      <FooterContainer>
        <Container>
          <LeftContainer>
            <Link to='/home'>
              <HeaderLogo />
            </Link>
            <Link to='/home'>
              <Title>Le Quizz du Berger</Title>
            </Link>
          </LeftContainer>
          <FooterMenu>
            <FooterMenuTab>Home</FooterMenuTab>
            <FooterMenuTab>Candidats</FooterMenuTab>
            <FooterMenuTab>Nous contacter</FooterMenuTab>
            <FooterMenuTab onClick={this.onOpenModal}>
              Mentions légales
            </FooterMenuTab>
          </FooterMenu>
        </Container>
        <LegalModalBackground
          isActive={this.state.showModal}
          onClick={this.onCloseModal}
        >
          <LegalModalContainer></LegalModalContainer>
        </LegalModalBackground>
      </FooterContainer>
    );
  }
}

const FooterContainer = styled.div`
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid green;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid red;
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
`;

const FooterMenuTab = styled.li`
  font-size: 14px;
  color: #4b5563;
  list-style: none;
`;

const LegalModalBackground = styled.div`
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

const LegalModalContainer = styled.div`
  width: 1000px;
  height: 500px;
  background-color: white;
  border-radius: 50px;
`;

export default Footer;
