import React, { useContext, useState } from "react";
import UserContext from "../contexts/user";
import API from "../services/api";
import Button from "./Button";
import { FormInput, FormLabel, FormStyled } from "./Form";

const SignUp = ({ pseudo, passwordConfirm, password, onChange, onLogin }) => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const signupRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let response;
    if (user?._id) {
      response = await API.put({
        path: "/user",
        body: { pseudo, password, passwordConfirm },
      });
    } else {
      response = await API.post({
        path: "/user/signup",
        body: { pseudo, password, passwordConfirm },
      });
    }
    if (!response.ok) {
      setIsLoading(false);
      return alert(response.error);
    }
    onLogin(response.data);
  };

  return (
    <FormStyled onSubmit={signupRequest} id="sign-up-form">
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
      <Button type="submit" disabled={isLoading} isLoading={isLoading} withLoader>
        S'inscrire
      </Button>
    </FormStyled>
  );
};

export default SignUp;
