import React, { useState } from "react";
import useUser from "../hooks/useUser";
import API from "../services/api";
import Button from "./Button";
import { FormInput, FormLabel, FormStyled } from "./Form";
import InternalLink from "./InternalLink";

const SignIn = ({ onSuccess, onChange, onGoToSignup, pseudo, password }) => {
  const { mutate } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const loginRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await API.post({
      path: "/user/login",
      body: { pseudo, password },
    });
    if (!response?.ok) {
      setIsLoading(false);
      return alert(response.error);
    }
    mutate(response.data);
    setIsLoading(false);
    onSuccess(response.data);
  };

  return (
    <FormStyled onSubmit={loginRequest}>
      <FormLabel>Pseudo</FormLabel>
      <FormInput
        type="text"
        name="pseudo"
        autoComplete="username"
        placeholder="Votre pseudo"
        onChange={onChange}
        value={pseudo}
      />
      <FormLabel>Mot de passe</FormLabel>
      <FormInput
        type="password"
        name="password"
        autoComplete="password"
        placeholder="Votre mot de passe"
        onChange={onChange}
        value={password}
      />
      <Button type="submit" disabled={isLoading} isLoading={isLoading} withLoader>
        Se connecter
      </Button>
      <InternalLink onClick={onGoToSignup}>Pas encore de mot de passe ?</InternalLink>
    </FormStyled>
  );
};

export default SignIn;
