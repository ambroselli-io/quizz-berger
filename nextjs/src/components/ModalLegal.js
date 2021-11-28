import React from "react";
import styled from "styled-components";

const ModalLegal = ({ isActive, onClose }) => (
  <ModalBackground isActive={isActive} onClick={onClose}>
    <ModalContainer>
      <TitleContainer>
        <SubTitle>
          Informations générales
          <br />
          Mentions Légales
        </SubTitle>
        <CrossButton onClick={onClose} />
      </TitleContainer>
      <Content>
        <p>
          Le Quizz du Berger a été designé par Clint et développé par Roméo Vincent et Arnaud Ambroselli, dans le but
          d'encourager les gens à conforter ou remettre en question leurs idées politiques.
          <br />
          <br />
          Toutes les réponses des utilisateurs sont <strong>anonymes</strong>. Nous enregistrons anonymement
          (c'est-à-dire qu'il est <strong>mathématiquement impossible</strong> de faire un lien quelconque entre vous,
          votre ordinateur et les réponses que vous donnez) en base de donnée votre parcours dans un seul but
          statistique de voir combien de personnes ont participé au quizz : vous pouvez vous y opposer en nous
          contactant via le formulaire de contact disponible sur le site. Vous avez aussi l'option de pouvoir partager
          un lien vers vos résultats, pour en discuter avec vos amis par exemple : un pseudonyme et un mot de passe
          seront alors requis pour que vous puissiez accéder quand vous voulez à votre Quizz. Si vous perdez votre mot
          de passe, n'ayant aucun email ou numéro de téléphone associé à votre compte, il nous sera impossible de vous
          donner accès à votre Quizz.
          <br />
          <br />
          Notre action n'a aucun but lucratif, elle est même une perte financière sèche et assumée.
          <br />
          <br />
          Nous essayons du mieux possible aussi de garder une neutralité vis à vis des candidats, des questions et des
          réponses. Si vous avez une remarque à faire sur un aspect quelconque du Quizz - contenu des questions,
          réponses des candidats, ou même design -, nous serions heureux d'avoir vos retours : n'hésitez pas à nous
          contacter.
          <br />
          <br />
          Si vous êtes vous-même candidat ou un parti politique et que les réponses que nous avons affiché en votre nom
          ne vous conviennent pas, contactez-nous aussi, nous serons heureux de faire les modifications que vous
          souhaitez.
          <br />
          <br />
          Ce projet est open-source, si vous souhaitez y participer, venez{" "}
          <a target="_blank" rel="noreferrer" href="https://github.com/ambroselli-io/quizz-berger">
            le faire sur GitHub :
          </a>
          <br />
          <br />
          Le site, le serveur et la base de donnée en MongoDB sont hébergés chez{" "}
          <a href="https://www.clever-cloud.com/about/" target="_blank" rel="noreferrer">
            Clever-cloud
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
  padding-top: 1em;
  height: auto;
  overflow: auto;
  a {
    text-decoration: underline;
  }
`;

export default ModalLegal;
