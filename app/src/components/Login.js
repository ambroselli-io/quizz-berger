import React from "react";
import styled from "styled-components";
import API from "../services/api";

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
    console.log(this.props);
    return (
      <>
        <SignupSubContainer>
          <LoginForm id='sign-in-form' action='' onSubmit={this.loginRequest}>
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
  padding: 24px;
  height: auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-top: none;
  border-radius: 0 0px 8px 8px;
`;

const LoginForm = styled.form`
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

const LoginButton = styled.button`
  margin-top: 30px;
  height: 44px;
  font-weight: bold;
  background: #facc15;
  border-radius: 44px;
  border: none;
`;

export default Login;
