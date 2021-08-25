import React from "react";
import styled from "styled-components";
import "../styles/style.css";

class Login extends React.Component {
  state = {
    pseudo: "",
    password: "",
  };

  onChangeLogin = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  loginRequest = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8080/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        pseudo: this.state.pseudo,
        password: this.state.password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  logoutRequest = async () => {
    const response = await fetch("http://127.0.0.1:8080/user/logout", {
      method: "GET",
      credentials: "include",
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
          <span>Connexion</span>
          <LoginForm id='sign-in-form' action='' onSubmit={this.loginRequest}>
            <label>Pseudo</label>
            <input type='text' name='pseudo' onChange={this.onChangeLogin} />
            <label>Mot de passe</label>
            <input type='text' name='password' onChange={this.onChangeLogin} />
            <button className='' type='submit'>
              Se connecter
            </button>
          </LoginForm>
          <LogoutButton
            onClick={this.logoutRequest}
            id='logout-button'
            type='submit'
          >
            Se déconnecter
          </LogoutButton>
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

const LoginForm = styled.form`
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
    margin-top: 25px;
  }
`;

const LogoutButton = styled.button`
  margin-top: 25px;
`;

export default Login;
