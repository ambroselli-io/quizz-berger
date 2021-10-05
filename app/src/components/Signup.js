import React, { useState } from "react";
import styled from "styled-components";
import API from "../services/api";

const Signup = ({ pseudo, passwordConfirm, password, onChange, onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const signupRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await API.post({
      path: "/user/signup",
      body: { pseudo, password, passwordConfirm },
    });
    if (!response.ok) {
      setIsLoading(false);
      return alert(response.error);
    }
    onLogin(response.data);
  };

  return (
    <>
      <SignupSubContainer>
        <SignupForm onSubmit={signupRequest} id="sign-up-form">
          <FormLabel>Pseudo</FormLabel>
          <FormInput
            type="text"
            name="pseudo"
            placeholder="Votre pseudo"
            onChange={onChange}
            value={pseudo}
          />
          <FormLabel>Mot de passe</FormLabel>
          <FormInput
            type="password"
            name="password"
            placeholder="Votre mot de passe"
            onChange={onChange}
            value={password}
          />
          <FormLabel>Confirmation du mot de passe</FormLabel>
          <FormInput
            type="password"
            name="passwordConfirm"
            placeholder="Confirmez votre mot de passe"
            onChange={onChange}
            value={passwordConfirm}
          />
          <SignupButton isLoading={isLoading} type="submit">
            {isLoading ? "Chargement..." : "S'inscrire !"}
          </SignupButton>
        </SignupForm>
      </SignupSubContainer>
    </>
  );
};

const SignupSubContainer = styled.div`
  padding: 24px;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-top: none;
  border-radius: 0px 0 8px 8px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-top: 25px;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
`;

const FormInput = styled.input`
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

const SignupButton = styled.button`
  margin-top: 30px;
  height: 44px;
  font-weight: normal;
  font-size: 16px;
  background: ${(props) =>
    props.isLoading ? "rgb(233, 233, 233)" : "#facc15"};
  color: ${(props) => (props.isLoading ? "rgb(17, 24, 39, 0.2)" : "black")};
  border-radius: 44px;
  border: none;
  cursor: ${(props) => (props.isLoading ? "auto" : "pointer")};
`;

export default Signup;
