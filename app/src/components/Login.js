import React from "react";
import styled from "styled-components";
import API from "../services/api";

const Login = ({ onLogin, onChange, pseudo, password }) => {
  const loginRequest = async (e) => {
    e.preventDefault();
    const response = await API.post({
      path: "/user/login",
      body: { pseudo, password },
    });
    if (!response.ok) return alert(response.error);
    onLogin(response.data);
  };

  return (
    <>
      <SignupSubContainer>
        <LoginForm onSubmit={loginRequest}>
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
          <LoginButton type="submit">Se connecter</LoginButton>
        </LoginForm>
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
  border-radius: 0 0px 8px 8px;
`;

const LoginForm = styled.form`
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

const LoginButton = styled.button`
  margin-top: 30px;
  height: 44px;
  font-weight: normal;
  font-size: 16px;
  background: #facc15;
  border-radius: 44px;
  border: none;
`;

export default Login;
