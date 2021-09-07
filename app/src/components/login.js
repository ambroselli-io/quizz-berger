import React from "react";
import styled from "styled-components";
import "../styles/style.css";

class Login extends React.Component {
  state = {
    pseudo: "",
    password: "",
  };

  onChangeLogin = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
        pseudo: this.state.pseudo,
        password: this.state.password,
      }),
    }).then((res) => {
      return res.json();
    });
    if (response.ok) {
      this.props.onLogin(response.data);
    }
  };

  // logoutRequest = async () => {
  //   const response = await fetch("http://127.0.0.1:8080/user/logout", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

  render() {
    return (
      <>
        <SignupSubContainer>
          <span>Connexion</span>
          <LoginForm id='sign-in-form' action='' onSubmit={this.loginRequest}>
            <FormLabel>Pseudo</FormLabel>
            <FormInput
              type='text'
              name='pseudo'
              placeholder='Votre pseudo'
              onChange={this.onChangeLogin}
            />
            <FormLabel>Mot de passe</FormLabel>
            <FormInput
              type='text'
              name='password'
              placeholder='Votre mot de passe'
              onChange={this.onChangeLogin}
            />
            <LoginButton className='' type='submit'>
              Se connecter
            </LoginButton>
          </LoginForm>
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
  border-radius: 0 10px 10px 10px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  > div > input {
    margin-top: 10px;
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

const LoginButton = styled.button`
  margin-top: 30px;
  height: 35px;
  font-weight: bold;
  background-color: #f7df1e;
  border: none;
`;

export default Login;
