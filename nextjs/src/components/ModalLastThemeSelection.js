import React from "react";
import Button from "./Button";
import Modal from "./Modal";

const ModalLastThemeSelection = ({ isActive, onForceCloseModal, onCloseModal }) => (
  <Modal
    title="Choisissez votre troisième thème"
    isActive={isActive}
    onCloseModal={onCloseModal}
    center>
    <p>
      Choisissez un <strong>dernier thème</strong> avant de pouvoir voir vos résultats !
      <br />
      <br />
    </p>
    <div>
      <Button onClick={onForceCloseModal}>Je choisis !</Button>
    </div>
  </Modal>
);

export default ModalLastThemeSelection;
