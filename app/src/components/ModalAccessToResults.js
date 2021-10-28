import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "./Button";
import Modal from "./Modal";

const ModalAccessToResults = ({ isActive, onForceCloseModal, onCloseModal }) => {
  const history = useHistory();
  return (
    <Modal title="Bravo !" isActive={isActive} onCloseModal={onCloseModal} center>
      <p>
        Vous avez répondu à trois thèmes de notre quizz.
        <br />
        <br />
        Vous pouvez déjà voir quel est le candidat le plus proche de vos idées avec ces thèmes, ou
        bien vous pouvez continuer le quizz et accéder à vos résultats plus tard.
        <br />
        <br />
        Pas d'inquiétude, vous pouvez de toutes façons aller et venir entre les résultats et le
        quizz, et changer vos réponses à tout moment.
      </p>
      <ButtonsContainer>
        <Button onClick={onForceCloseModal}>Je continue</Button>
        <Button onClick={() => history.push("/result")}>Voir mes résultats</Button>
      </ButtonsContainer>
    </Modal>
  );
};

const ButtonsContainer = styled.div`
  margin-top: 25px;
  > button:not(:last-of-type) {
    margin-right: 15px;
    margin-bottom: 15px;
  }
`;

export default ModalAccessToResults;
