import React from "react";

import LoginContainer from "./LoginContainer";
import Modal from "./Modal";

const ModalLogin = ({ isActive, onCloseModal, onForceCloseModal, title, subtitle }) => {
  return (
    <Modal title={title} onCloseModal={onCloseModal} isActive={isActive}>
      <LoginContainer showSignup forceSignup onSuccess={onForceCloseModal} />
    </Modal>
  );
};

export default ModalLogin;
