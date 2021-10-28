import React, { useContext, useState } from "react";
import styled from "styled-components";

import API from "../services/api";
import UserContext from "../contexts/user";
import { FormInput, FormLabel, FormStyled, FormTextArea } from "./Form";
import Button from "./Button";
import Modal from "./Modal";

const ModalContact = ({ isActive, onCloseModal, onForceCloseContactModal }) => {
  const { user } = useContext(UserContext);

  const [{ pseudo, email, message }, setState] = useState({
    pseudo: user?.pseudo || "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const text = `
    De: ${pseudo}
    Email: ${email}
    Message: ${message}
    URL: ${window.location.pathname}
    user: ${JSON.stringify(user, null, 2)}
    `;

    const response = await API.post({
      path: "/feedback",
      body: { text, subject: `Une requête du Quizz du Berger par ${pseudo}` },
    });
    if (!response.ok) return alert(response.error);
    if (response.ok) {
      alert("Message envoyé !");
      onForceCloseContactModal();
    }

    setIsLoading(false);
  };

  return (
    <Modal title="Nous contacter" isActive={isActive} onCloseModal={onCloseModal}>
      <FormStyled noPadding onSubmit={onFormSubmit}>
        <FormLabel>Nom/pseudo *</FormLabel>
        <FormInput
          type="text"
          name="pseudo"
          autocomplete="name"
          placeholder="Votre nom / pseudo"
          onChange={onChange}
          value={pseudo}
          required
        />
        <FormLabel>Email</FormLabel>
        <FormInput
          type="email"
          name="email"
          autocomplete="email"
          placeholder="Votre email"
          onChange={onChange}
          value={email}
        />
        <FormLabel>Votre message *</FormLabel>
        <FormTextArea
          name="message"
          rows="10"
          onChange={onChange}
          value={message}
          placeholder="Un commentaire ? Une suggestion ?"
        />
        <ButtonContainer>
          <Button disabled={isLoading} withLoader isLoading={isLoading} type="submit">
            Envoyer
          </Button>
        </ButtonContainer>
      </FormStyled>
    </Modal>
  );
};

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default ModalContact;
