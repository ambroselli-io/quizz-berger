import { useState } from "react";
import styled from "styled-components";
import ModalContact from "./ModalContact";

const Banner = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const onCloseModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowContactModal(false);
    document.body.style.overflow = "visible";
  };

  const onForceCloseContactModal = (e) => {
    setShowContactModal(false);
    document.body.style.overflow = "visible";
  };

  const onOpenContactModal = () => {
    setShowContactModal(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <ModalContact
        title="Envie d'aider ?"
        isActive={showContactModal}
        onCloseModal={onCloseModal}
        onForceCloseModal={onForceCloseContactModal}
      >
        Les thèmes, les questions et les réponses des candidats sont encore en cours de perfection, nous avons besoin
        d'aide !
        <br />
        <br />
        <ul>
          <li>Certaines questions sont probablement mal posées, il faut les reformuler</li>
          <li>D'autres sont probablement absentes, il faut les créer !</li>
          <li>Certaines réponses demandent aussi probablement une reformulation</li>
          <li>
            Nous avons répondu approximativement à la place des candidats, il faudrait refaire une passe pour avoir plus
            de précisions sur les résultats
          </li>
        </ul>
        <br />
        Comme vous le voyez, nous avons besoin d'aide et de soutien. Si le coeur vous en dit, contactez-nous !
        <br />
        <br />
        <br />
      </ModalContact>
      {!showContactModal && (
        <BannerStyled onClick={onOpenContactModal}>
          <b>🚨 En construction 🚨</b>
          <br />
          <i>
            <small>Cliquez ici pour plus d'infos</small>
          </i>
        </BannerStyled>
      )}
    </>
  );
};

const BannerStyled = styled.button`
  position: fixed;
  left: 0;
  top: 0;
  background-color: #facc15;
  display: ${process.env.NODE_ENV === "production" ? "block" : "none"};
  padding: 4px 120px;
  text-align: center;
  transform: rotate(-45deg) translateX(-30%);
  transform-origin: center;
  border: none;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 99999;
  cursor: pointer;
`;

export default Banner;
