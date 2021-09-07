import React from "react";
import styled from "styled-components";
import "../styles/style.css";

class Signup extends React.Component {
  state = {
    pseudo: "",
    password: "",
    passwordConfirm: "",
    candidat: false,
  };

  onChangeSignup = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  isCandidat = (e) => {
    this.setState({ candidat: e.target.checked });
  };

  signupRequest = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8080/user/signup", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        pseudo: this.state.pseudo,
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm,
        candidat: this.state.candidat,
        theme: "",
      }),
    }).then((res) => res.json());

    if (response.ok) {
      this.props.onLogin(response.data);
    }
  };

  render() {
    return (
      <>
        <SignupSubContainer>
          <span>Inscription</span>
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
              onChange={this.onChangeSignup}
            />
            <FormLabel>Mot de passe</FormLabel>
            <FormInput
              type='text'
              name='password'
              placeholder='Votre mot de passe'
              onChange={this.onChangeSignup}
            />
            <FormLabel>Confirmation du mot de passe</FormLabel>
            <FormInput
              type='text'
              name='passwordConfirm'
              placeholder='Confirmez votre mot de passe'
              onChange={this.onChangeSignup}
            />
            <div>
              <FormLabel>Candidat</FormLabel>
              <input
                type='checkbox'
                name='candidat'
                onChange={this.isCandidat}
              />
            </div>
            <SignupButton type='submit'>S'inscrire !</SignupButton>
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
