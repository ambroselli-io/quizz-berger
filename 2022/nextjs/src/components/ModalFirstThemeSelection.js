import React from "react";
import Button from "./Button";
import Modal from "./Modal";

const ModalFirstThemeSelection = ({ isActive, onForceCloseModal, onCloseModal }) => (
  <Modal title="Choisissez votre premier thème" isActive={isActive} onCloseModal={onCloseModal} center>
    <p>
      Répondez au quizz, thème après thème, en commençant par
      <br />
      <strong>celui&nbsp;qui&nbsp;vous&nbsp;tient le&nbsp;plus&nbsp;à&nbsp;coeur.</strong>
      <br />
      <br />
      <small>
        Libre à vous ensuite de répondre à tous les thèmes, pour avoir plus de détails sur les points communs entre
        votre pensée politique et celle des candidats
      </small>
      <br />
      <br />
      <br />
    </p>
    <div>
      <Button onClick={onForceCloseModal}>Bien compris !</Button>
    </div>
  </Modal>
);

export default ModalFirstThemeSelection;
