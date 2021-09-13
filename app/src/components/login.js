import React from "react";
import styled from "styled-components";
import API from "../services/api";
import "../styles/style.css";

class Login extends React.Component {
  state = {
    pseudo: "",
    password: "",
  };

  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginRequest = async (e) => {
    e.preventDefault();

    const { pseudo, password } = this.state;
    const { onLogin } = this.props;

    const response = await API.post({
      path: "/user/login",
      body: { pseudo, password },
    });
    if (!response.ok) return alert(response.error);
    onLogin(response.data);
  };

  render() {
    return (
      <>
        <SignupSubContainer>
          <span>Connexion</span>
          <LoginForm id="sign-in-form" action="" onSubmit={this.loginRequest}>
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
            <LoginButton className="" type="submit">
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
