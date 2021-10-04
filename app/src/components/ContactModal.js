import React, { useState } from "react";
import styled from "styled-components";
import { media } from "../styles/mediaQueries";

import cross from "../images/cross.svg";
import API from "../services/api";

const ContactModal = ({ isActive, onCloseContactModal, onForceCloseContactModal, user }) => {
  const [{ pseudo, email, message }, setState] = useState({
    pseudo: user?.pseudo || "",
    email: "",
    message: "",
  });

  const onChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const text = `
    De: ${pseudo}
    Email: ${email}
    Message: ${message}
    URL: ${window.location.href}
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
  };

  return (
    <>
      <BackgroundContainer isActive={isActive} onClick={onCloseContactModal}>
        <ModalContainer>
          <TitleContainer>
            <Title>Nous contacter</Title>
            <CrossButton onClick={onCloseContactModal} />
          </TitleContainer>
          <ModalInnerContainer>
            <ContactForm onSubmit={onFormSubmit}>
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
              <SubmitButton type="submit">Envoyer</SubmitButton>
            </ContactForm>
          </ModalInnerContainer>
        </ModalContainer>
      </BackgroundContainer>
    </>
  );
};

const BackgroundContainer = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.isActive ? `flex` : `none`)};
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled.div`
  flex: 1;
  padding: 40px;
  max-width: 700px;
  height: auto;
  background-color: white;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  ${media.mobile`
  max-height: 400px;

`}
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-family: Merriweather;
  font-size: 20px;
  font-weight: bold;
`;

const CrossButton = styled.button`
  height: 15px;
  width: 15px;
  background: url(${cross}) no-repeat;
  background-size: cover;
  color: black;
  border: none;
  cursor: pointer;
`;

const ModalInnerContainer = styled.div`
  margin-top: 25px;
  overflow: visible;
  ${media.mobile`
  overflow: scroll;
`}
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
`;

const FormInput = styled.input`
  margin-bottom: 25px;
  padding: 0 12px;
  height: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  font-size: 16px;
  font-weight: 300;
  &:placeholder {
    color: rgba(17, 24, 39, 0.4);
  }
`;

const FormTextArea = styled.textarea`
  margin-bottom: 25px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  font-size: 16px;
  font-weight: 300;
  resize: none;
  &:placeholder {
    color: rgba(17, 24, 39, 0.4);
  }
`;

const SubmitButton = styled.button`
  height: 44px;
  font-weight: normal;
  font-size: 16px;
  background: #facc15;
  border-radius: 44px;
  border: none;
`;

export default ContactModal;
