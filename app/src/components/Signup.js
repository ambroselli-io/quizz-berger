import React from "react";
import styled from "styled-components";
import API from "../services/api";

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
          <SignupForm
            onSubmit={this.signupRequest}
            pseudo={this.state}
            id='sign-up-form'
          >
            <FormLabel>Pseudo</FormLabel>
            <FormInput
              type='text'
              name='pseudo'
              placeholder='Votre pseudo'
              onChange={this.onChangeInput}
            />
            <FormLabel>Mot de passe</FormLabel>
            <FormInput
              type='password'
              name='password'
              placeholder='Votre mot de passe'
              onChange={this.onChangeInput}
            />
            <FormLabel>Confirmation du mot de passe</FormLabel>
            <FormInput
              type='password'
              name='passwordConfirm'
              placeholder='Confirmez votre mot de passe'
              onChange={this.onChangeInput}
            />
            <SignupButton type='submit'>S'inscrire !</SignupButton>
          </SignupForm>
        </SignupSubContainer>
      </>
    );
  }
}

const SignupSubContainer = styled.div`
  padding: 24px;
  height: auto;
  width: 400px;
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
  font-size: 12px;
  font-weight: 600;
`;

const FormInput = styled.input`
  padding: 0 12px;
  height: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 300;
  color: rgba(17, 24, 39, 0.4);
`;

const SignupButton = styled.button`
  margin-top: 30px;
  height: 44px;
  font-weight: normal;
  font-size: 14px;
  background: #facc15;
  border-radius: 44px;
  border: none;
`;

export default Signup;
