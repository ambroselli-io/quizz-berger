import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import useUser from "../hooks/useUser";
import API from "../services/api";

import Button from "./Button";
import InternalLink from "./InternalLink";
import Modal from "./Modal";

const ModalShare = ({ isActive, onCloseModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, mutate } = useUser();
  const [copyButtonCaption, setCopyButtonCaption] = useState("Copier le lien");
  const showPublicMessage = useMemo(() => !!user?.isPublic, [user?.isPublic]);

  const onEnablePublicLink = async () => {
    setIsLoading(true);
    const response = await API.put({ path: "user", body: { isPublic: true } });
    setIsLoading(false);
    if (!response.ok) return alert(response.error);
    mutate(response.data);
  };

  const onDisablePublicLink = async () => {
    setIsLoading(true);
    const response = await API.put({ path: "user", body: { isPublic: false } });
    setIsLoading(false);
    if (!response.ok) return alert(response.error);
    mutate(response.data);
    onCloseModal();
  };

  const publicLink = encodeURI(`https://www.quizz-du-berger.com/result/${user?.pseudo}`);

  const onCopy = async () => {
    await navigator.clipboard.writeText(publicLink);
    setCopyButtonCaption("Copié !");
    navigator.clipboard.writeText(publicLink);
    await new Promise((res) => setTimeout(res, 2500));
    setCopyButtonCaption("Copier le lien");
  };

  return (
    <Modal center isActive={isActive} onCloseModal={onCloseModal} title="Partagez vos résultats">
      {!showPublicMessage ? (
        <>
          <span>En cliquant sur le bouton ci-dessous:</span>
          <ul>
            <li>
              Vos amis pourront se comparer à vous en cliquant sur le bouton
              <b> Se&nbsp;comparer&nbsp;à&nbsp;mes&nbsp;amis</b> et en ajoutant votre pseudo{" "}
              <b dangerouslySetInnerHTML={{ __html: user?.pseudo?.split(" ").join("&nbsp;") }} />
            </li>
            <br />
            <li>nous vous fournirons un lien qui permettra à vos amis de voir vos résultats</li>
          </ul>
          <br />
          <Button onClick={onEnablePublicLink} disabled={isLoading} withLoader isLoading={isLoading}>
            J'ai compris, afficher le lien
          </Button>
        </>
      ) : (
        <>
          <span>Vous pouvez partager vos résultats avec vos amis en leur donnant ce lien:</span>
          <PublicLink href={publicLink} target="_blank">
            {publicLink}
          </PublicLink>
          <Button onClick={onCopy}>{copyButtonCaption}</Button>
          <StopShare
            disabled={isLoading}
            withLoader
            isLoading={isLoading}
            loaderSize="20px"
            onClick={onDisablePublicLink}
          >
            Arrêter le partage
          </StopShare>
          {/* <br />
          <small>
            <i>Toute personne avec ce lien peut désormais accéder à cette page de résultats</i>
          </small> */}
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

export default ModalShare;
