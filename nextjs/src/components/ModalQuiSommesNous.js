import React from "react";
import styled from "styled-components";

const ModalQuiSommesNous = ({ isActive, onClose }) => (
  <ModalBackground isActive={isActive} onClick={onClose}>
    <ModalContainer>
      <TitleContainer>
        <SubTitle>Qui sommes nous ?</SubTitle>
        <CrossButton onClick={onClose} />
      </TitleContainer>
      <Content>
        <p>
          Le Quizz du Berger a été designé par <b>Clint</b> et développé par <b>Roméo Vincent</b> et{" "}
          <b>Arnaud Ambroselli</b>, dans le but d'encourager les gens à conforter ou remettre en question leurs idées
          politiques.
          <br />
          <br />
          Les questions et réponses ont été soigneusement rédigées par les étudiants d'
          <b>
            <a href="https://interface-juniorconseil.com" target="_blank">
              Interface Junior Conseil, la Junior Entreprise de Science Po Toulouse
            </a>
          </b>
          . Ils ont aussi répondu au quizz "à la place des candidats", en se basant sur leurs programmes respectifs.
          <br />
          Pour atteindre une plus grande neutralité du quizz, il y avait des étudiants de droite et de gauche. Ils ont
          realisé un travail analytique de qualité, que vous pouvez consulter librement en{" "}
          <a href="Analyse_Quizz_du_Berger.pdf" target="_blank">
            cliquant ici
          </a>
          <br />
          <br />
          Ce projet est open-source, si vous souhaitez y participer, venez{" "}
          <a target="_blank" rel="noreferrer" href="https://github.com/ambroselli-io/quizz-berger">
            le faire sur GitHub
          </a>
        </p>
      </Content>
    </ModalContainer>
  </ModalBackground>
);

const SubTitle = styled.h2`
  font-family: Merriweather;
  font-size: 20px;
  font-weight: bold;
`;

const ModalBackground = styled.div`
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
  max-width: 1000px;
  max-height: 80vh;
  height: auto;
  background-color: white;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  color: black;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CrossButton = styled.button`
  height: 15px;
  width: 15px;
  background: url(/cross.svg) no-repeat;
  background-size: cover;
  color: black;
  border: none;
  cursor: pointer;
`;

const Content = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans;
  color: black;
  padding-top: 1em;
  height: auto;
  overflow: auto;
  a {
    text-decoration: underline;
  }
`;

export default ModalQuiSommesNous;
