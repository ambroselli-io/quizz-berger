import React, { useState } from "react";
import useUser from "../hooks/useUser";
import API from "../services/api";
import Button from "./Button";
import { FormInput, FormLabel, FormStyled } from "./Form";

const SignUp = ({ pseudo, passwordConfirm, password, isPublic, onChange, onSuccess }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const signupRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let response;
    if (user?._id) {
      response = await API.put({
        path: "/user",
        body: { pseudo, password, passwordConfirm, isPublic },
      });
    } else {
      response = await API.post({
        path: "/user/signup",
        body: { pseudo, password, passwordConfirm, isPublic },
      });
    }
    if (!response.ok) {
      setIsLoading(false);
      return alert(response.error);
    }
    onSuccess(response.data);
  };

  return (
    <FormStyled onSubmit={signupRequest} id="sign-up-form">
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
        autoComplete="new-password"
        placeholder="Votre mot de passe"
        onChange={onChange}
        value={password}
      />
      <FormLabel>Confirmation du mot de passe</FormLabel>
      <FormInput
        type="password"
        name="passwordConfirm"
        autoComplete="new-password"
        placeholder="Confirmez votre mot de passe"
        onChange={onChange}
        value={passwordConfirm}
      />
      <div style={{ marginBottom: 10, fontSize: "0.85rem" }}>
        <input type="checkbox" id="isPublic" name="isPublic" onChange={onChange} checked={isPublic} />
        <label style={{ marginLeft: 10 }} htmlFor="isPublic">
          Permettre le partage à mes amis, si je leur transmet mon pseudo
        </label>
      </div>
      <Button type="submit" disabled={isLoading} isLoading={isLoading} withLoader>
        S'inscrire
      </Button>
    </FormStyled>
  );
};

export default SignUp;
