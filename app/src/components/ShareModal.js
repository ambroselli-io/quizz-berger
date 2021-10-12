import React, { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/user";
import API from "../services/api";

import Button from "./Button";
import InternalLink from "./InternalLink";
import Modal from "./Modal";

const ShareModal = ({ isActive, onCloseModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [copyButtonCaption, setCopyButtonCaption] = useState("Copier le lien");
  const { user, setUser } = useContext(UserContext);

  const onEnablePublicLink = async () => {
    setIsLoading(true);
    const response = await API.put({ path: "user", body: { isPublic: true } });
    setIsLoading(false);
    if (!response.ok) return alert(response.error);
    setUser(response.data);
  };

  const onDisablePublicLink = async () => {
    setIsLoading(true);
    const response = await API.put({ path: "user", body: { isPublic: false } });
    setIsLoading(false);
    if (!response.ok) return alert(response.error);
    setUser(response.data);
    onCloseModal();
  };

  const publicLink = `https://partage.quizz-du-berger.com/result/${user?.pseudo}`;

  const onCopy = async () => {
    await navigator.clipboard.writeText(publicLink);
    setCopyButtonCaption("Copié !");
    await new Promise((res) => setTimeout(res, 2500));
    setCopyButtonCaption("Copier le lien");
    navigator.clipboard.writeText(publicLink).then(console.log);
  };

  return (
    <Modal center isActive={isActive} onCloseModal={onCloseModal} title="Partagez vos résultats">
      {!user?.isPublic ? (
        <>
          <span>
            Quand vous aurez cliqué sur le bouton ci-dessous, toute personne avec ce lien pourra
            voir ces résultats
          </span>
          <Button
            onClick={onEnablePublicLink}
            disabled={isLoading}
            withLoader
            isLoading={isLoading}>
            J'ai compris, afficher le lien
          </Button>
        </>
      ) : (
        <>
          <span>Toute personne avec ce lien peut voir ces résultats:</span>
          <PublicLink href={publicLink} target="_blank">
            {publicLink}
          </PublicLink>
          <Button onClick={onCopy}>{copyButtonCaption}</Button>
          <StopShare
            disabled={isLoading}
            withLoader
            isLoading={isLoading}
            loaderSize="20px"
            onClick={onDisablePublicLink}>
            Arrêter le partage
          </StopShare>
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

const StopShare = styled(InternalLink)`
  margin-top: 10px;
  font-size: 0.75em;
  line-height: 1.5em;
`;

export default ShareModal;
