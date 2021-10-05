import React from "react";
import styled from "styled-components";
import { media } from "../styles/mediaQueries";
import logo from "../images/logo.svg";
import cross from "../images/cross.svg";
import { Link } from "react-router-dom";
import ContactModal from "../components/ContactModal";

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
            <FooterMenuTab onClick={this.onOpenContactModal}>
              Nous contacter
            </FooterMenuTab>
            <FooterMenuTab onClick={this.onOpenLegalModal}>
              Mentions légales
            </FooterMenuTab>
          </FooterMenu>
        </Container>
        {/* -- MODAL -- */}
        <LegalMentionModalBackground
          isActive={showLegalModal}
          onClick={this.onCloseLegalModal}
        >
          <LegalMentionModalContainer>
            <TitleContainer>
              <SubTitle>Mentions Légales</SubTitle>
              <CrossButton onClick={this.onCloseLegalModal} />
            </TitleContainer>
            <LegalMentionModalInnerContainer>
              <p>
                Le Quizz du Berger a été développé par Arnaud Ambroselli et
                Roméo Vincent dans le but d'encourager les gens à conforter ou
                de remettre en question leurs idées politiques.
                <br />
                <br />
                Toutes les réponses des utilisateurs sont anonymes et ne sont
                utilisées à aucun autre usage que celui pour l'utilisateur de
                les consulter. Notre action n'a aucun but lucratif, elle est
                même une perte financière sèche et assumée.
                <br />
                <br />
                Nous essayons aussi de garder une neutralité vis à vis des
                candidats, des questions et des réponses. Si vous avez une
                remarque à faire sur un aspect quelconque du quizz - contenu des
                questions, réponses des candidats, ou même design du quizz -,
                nous serions heureux d'avoir vos retours, n'hésitez pas à nous
                contacter.
                <br />
                <br />
                Si vous êtes vous-même candidat ou un parti politique et que les
                réponses que nous avons affiché en votre nom ne vous conviennent
                pas, contactez-nous aussi, nous serons heureux de faire les
                modifications que vous souhaitez.
                <br />
                <br />
                Ce projet est open-source, si vous souhaitez y participer, venez
                le faire sur github : <br />
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/ambroselli-io/quizz-berger"
                >
                  https://github.com/ambroselli-io/quizz-berger
                </a>
              </p>
            </LegalMentionModalInnerContainer>
          </LegalMentionModalContainer>
        </LegalMentionModalBackground>
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
  height: 80px;
  padding: 0 20px;
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
  flex: 1;
  padding: 40px;
  max-width: 1000px;
  height: auto;
  background-color: white;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  ${media.mobile`
  max-height: 400px;
  height: auto;
`}
`;

const TitleContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CrossButton = styled.button`
  height: 15px;
  width: 15px;
  background: url(${cross}) no-repeat;
  background-size: cover;
  color: black;
  border: none;
  cursor: pointer;
`;

const LegalMentionModalInnerContainer = styled.div`
  height: auto;
  overflow: hidden;
  ${media.mobile`
  overflow: scroll;
`}
`;

export default Footer;
