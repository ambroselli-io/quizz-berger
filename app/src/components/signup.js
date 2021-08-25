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
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
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
            <label>Pseudo</label>
            <input type='text' name='pseudo' onChange={this.onChangeSignup} />
            <label>Mot de passe</label>
            <input type='text' name='password' onChange={this.onChangeSignup} />
            <label>Confirmation du mot de passe</label>
            <input
              type='text'
              name='passwordConfirm'
              onChange={this.onChangeSignup}
            />
            <div>
              <label>Candidat</label>
              <input
                type='checkbox'
                name='candidat'
                onChange={this.isCandidat}
              />
            </div>
            <button type='submit'>S'inscrire !</button>
          </SignupForm>
        </SignupSubContainer>
      </>
    );
  }
}

const SignupSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 300px;
  width: 350px;
  border: 1px solid black;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  > label {
    margin-top: 10px;
  }
  > div > input {
    margin-top: 10px;
    margin-left: 10px;
  }
  > button {
    margin-top: 10px;
  }
`;

export default Signup;
