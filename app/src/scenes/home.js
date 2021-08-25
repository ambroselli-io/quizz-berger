import React from "react";
import styled from "styled-components";
import "../styles/style.css";

class Home extends React.Component {
  state = {
    signup: {
      pseudo: "",
      password: "",
      passwordConfirm: "",
    },
    login: {
      pseudo: "",
      password: "",
    },
  };

  onChangeSignup = (e) => {
    this.setState(
      {
        signup: { ...this.state.signup, [e.target.name]: e.target.value },
      },
      () => {
        console.log(this.state.signup);
      }
    );
  };

  onChangeLogin = (e) => {
    this.setState(
      {
        login: { ...this.state.login, [e.target.name]: e.target.value },
      },
      () => {
        console.log(this.state.login);
      }
    );
  };

  signupRequest = async (e) => {
    e.preventDefault();
    // console.log(
    //   this.state.pseudo,
    //   this.state.password,
    //   this.state.passwordConfirm
    // );

    const response = await fetch("http://127.0.0.1:8080/user/signup", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        pseudo: this.state.signup.pseudo,
        password: this.state.signup.password,
        passwordConfirm: this.state.signup.passwordConfirm,
        candidat: false,
        theme: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
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
        pseudo: this.state.login.pseudo,
        password: this.state.login.password,
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
        <BackGroundContainer>
          <Title>Inscription</Title>
          <SignupContainer>
            <SignupSubContainer>
              <span>Inscription</span>
              <form
                onSubmit={this.signupRequest}
                pseudo={this.state}
                id='sign-up-form'
              >
                <label>Pseudo</label>
                <input
                  type='text'
                  name='pseudo'
                  onChange={this.onChangeSignup}
                />
                <label>Mot de passe</label>
                <input
                  type='text'
                  name='password'
                  onChange={this.onChangeSignup}
                />
                <label>Confirmation du mot de passe</label>
                <input
                  type='text'
                  name='passwordConfirm'
                  onChange={this.onChangeSignup}
                />
                <div>
                  <label>Candidat</label>
                  <input
                    className='candidat-checkbox'
                    type='checkbox'
                    name='scales'
                  />
                </div>
                <button className='' type='submit'>
                  S'inscrire !
                </button>
              </form>
            </SignupSubContainer>
            <SignupSubContainer>
              <span>Connexion</span>
              <form id='sign-in-form' action='' onSubmit={this.loginRequest}>
                <label>Pseudo</label>
                <input
                  type='text'
                  name='pseudo'
                  onChange={this.onChangeLogin}
                />
                <label>Mot de passe</label>
                <input
                  type='text'
                  name='password'
                  onChange={this.onChangeLogin}
                />
                <button className='' type='submit'>
                  Se connecter
                </button>
              </form>
              <LogoutButton
                onClick={this.logoutRequest}
                id='logout-button'
                type='submit'
              >
                Se déconnecter
              </LogoutButton>
            </SignupSubContainer>
            <SignupSubContainer>
              <span>Profil</span>
            </SignupSubContainer>
          </SignupContainer>
        </BackGroundContainer>
      </>
    );
  }
}

const BackGroundContainer = styled.div`
  padding: 40px;
  width: 100vw;
  height: 100vh;
  background-color: #f7df1e;
  border-bottom: 2px solid black;
`;

const Title = styled.h2`
  font-family: Nunito SANS;
  font-size: 50px;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 40px;
`;

const SignupContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
`;

const SignupSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 300px;
  width: 350px;
  border: 1px solid black;
`;

const LogoutButton = styled.button`
  margin-top: 25px;
`;

export default Home;
