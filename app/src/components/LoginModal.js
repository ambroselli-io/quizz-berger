import React from "react";

import LoginContainer from "./LoginContainer";
import Modal from "./Modal";

const LoginModal = ({ isActive, onCloseModal, onForceCloseModal }) => {
  return (
    <Modal title="Connectez-vous" onCloseModal={onCloseModal} isActive={isActive}>
      <LoginContainer showSignup forceSignup onSuccess={onForceCloseModal} />
    </Modal>
  );
};

export default LoginModal;
