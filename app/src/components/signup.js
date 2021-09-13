import React from "react";
import styled from "styled-components";
import API from "../services/api";
import "../styles/style.css";

class Signup extends React.Component {
  state = {
    pseudo: "",
    password: "",
    passwordConfirm: "",
    candidate: false,
  };

  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  signupRequest = async (e) => {
    e.preventDefault();

    const { pseudo, password, passwordConfirm, candidate } = this.state;
    const { onLogin } = this.props;

    const response = await API.post({
      path: "/user/signup",
      body: { pseudo, password, passwordConfirm, candidate },
    });
    if (!response.ok) return alert(response.error);
    onLogin(response.data);
  };

  render() {
    return (
      <>
        <SignupSubContainer>
          <span>Inscription</span>
          <SignupForm onSubmit={this.signupRequest} pseudo={this.state} id="sign-up-form">
            <FormLabel>Pseudo</FormLabel>
            <FormInput
              type="text"
              name="pseudo"
              placeholder="Votre pseudo"
              onChange={this.onChangeInput}
            />
            <FormLabel>Mot de passe</FormLabel>
            <FormInput
              type="text"
              name="password"
              placeholder="Votre mot de passe"
              onChange={this.onChangeInput}
            />
            <FormLabel>Confirmation du mot de passe</FormLabel>
            <FormInput
              type="text"
              name="passwordConfirm"
              placeholder="Confirmez votre mot de passe"
              onChange={this.onChangeInput}
            />
            <SignupButton type="submit">S'inscrire !</SignupButton>
          </SignupForm>
        </SignupSubContainer>
      </>
    );
  }
}

const SignupSubContainer = styled.div`
  padding: 20px;
  height: auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-top: none;
  border-radius: 10px 0 10px 10px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  > div > input {
    height: 10px;
    width: 10px;
    margin-top: 30px;
    margin-left: 10px;
  }
`;

const FormLabel = styled.label`
  margin-top: 30px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const FormInput = styled.input`
  padding: 15px;
  height: 45px;
  background-color: rgba(245, 245, 244, 1);
  border: none;
`;

const SignupButton = styled.button`
  margin-top: 30px;
  height: 35px;
  font-weight: bold;
  background-color: #f7df1e;
  border: none;
`;

export default Signup;
