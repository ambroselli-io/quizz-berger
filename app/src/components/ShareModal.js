import React, { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/user";
import API from "../services/api";

import Button from "./Button";
import Modal from "./Modal";

const ShareModal = ({ isActive, onCloseModal }) => {
  const { user, setUser } = useContext(UserContext);

  const onEnablePublicLink = async () => {
    const response = await API.put({ path: "user", body: { isPublic: true } });
    if (!response.ok) return alert(response.error);
    setUser(response.data);
  };

  const onDisablePublicLink = async () => {
    const response = await API.put({ path: "user", body: { isPublic: false } });
    if (!response.ok) return alert(response.error);
    setUser(response.data);
    onCloseModal();
  };

  const publicLink = `https://partage.quizz-du-berger.com/result/${user?.pseudo}`;

  return (
    <Modal center isActive={isActive} onCloseModal={onCloseModal} title="Partagez vos résultats">
      {!user?.isPublic ? (
        <>
          <span>
            Quand vous aurez cliqué sur le bouton ci-dessous, toute personne avec ce lien pourra
            voir ces résultats
          </span>
          <Button onClick={onEnablePublicLink}>J'ai compris, afficher le lien</Button>
        </>
      ) : (
        <>
          <span>Toute personne avec ce lien peut voir ces résultats:</span>
          <PublicLink href={publicLink} target="_blank">
            {publicLink}
          </PublicLink>
          <Button>Copier le lien</Button>
          <StopShare onClick={onDisablePublicLink}>Arrêter le partage</StopShare>
        </>
      )}
    </Modal>
  );
};

const PublicLink = styled.a`
  margin-bottom: 25px;
  font-family: Merriweather Sans;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5em;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const StopShare = styled.button`
  margin-top: 10px;
  font-family: Merriweather Sans;
  font-style: normal;
  font-size: 0.75em;
  font-weight: 500;
  line-height: 1.5em;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

export default ShareModal;
