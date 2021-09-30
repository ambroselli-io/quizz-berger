import React from "react";
import styled from "styled-components";
import { media } from "../styles/mediaQueries";
import logo from "../images/logo.svg";
import cross from "../images/cross.svg";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  state = {
    showModal: true,
  };

  onCloseModal = (e) => {
    if (e.target !== e.currentTarget) return;
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
            <FooterMenuTab>Candidats</FooterMenuTab>
            <FooterMenuTab>Nous contacter</FooterMenuTab>
            <FooterMenuTab onClick={this.onOpenModal}>
              Mentions légales
            </FooterMenuTab>
          </FooterMenu>
        </Container>
        {/* -- MODAL -- */}
        <LegalMentionModalBackground
          isActive={this.state.showModal}
          onClick={this.onCloseModal}
        >
          <LegalMentionModalContainer>
            <TitleContainer>
              <SubTitle>Mentions Légales</SubTitle>
              <CrossIcon onClick={this.onCloseModal} />
            </TitleContainer>

            <p>
              Le Quiz du Berger a été développé par l'entreprise Ambroselli.io
              dans le but d'encourager les gens à remettre en question leurs
              idées politiques et n'a aucun but lucratif. <br />
              <br />
              Toutes les réponses des utilisateurs sont anonymes et nous nous
              engageons à ne jamais les revendre. Nous essayons aussi de garder
              une neutralité vis à vis des candidats, des questions et des
              réponses. <br />
              <br />
              Si certains contenus sur notre site ne vous semblent pas respecter
              ce principe, merci de bien vouloir nous contacter.
            </p>
          </LegalMentionModalContainer>
        </LegalMentionModalBackground>
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

const TitleContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CrossIcon = styled.div`
  height: 15px;
  width: 15px;
  background: url(${cross}) no-repeat;
  background-size: cover;
  color: black;
`;

const Title = styled.h1`
  font-family: Merriweather;
  font-size: 20px;
  font-weight: bold;
  ${media.mobile`
  display: none;
`}
`;

const SubTitle = styled.h2`
  font-family: Merriweather;
  font-size: 20px;
  font-weight: bold;
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
  cursor: pointer;
`;

const LegalMentionModalBackground = styled.div`
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

const LegalMentionModalContainer = styled.div`
  padding: 40px;
  width: 1000px;
  height: 500px;
  background-color: white;
  border-radius: 50px;
  overflow: scroll;
  ${media.mobile`
  max-height: 400px;
  height: auto;
`}
`;

export default Footer;
