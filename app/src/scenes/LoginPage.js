import React from "react";
import styled from "styled-components";
import { media } from "../styles/mediaQueries";

import Header from "../components/Header";
import Signup from "../components/Signup";
import Login from "../components/Login";

class LoginPage extends React.Component {
  state = { showSignup: false };

  onLogin = (user) => {
    const { setUser, history } = this.props;
    setUser(user);
    history.push("/theme");
  };

  displaySignup = () => this.setState({ showSignup: true });

  displayLogin = () => this.setState({ showSignup: false });

  render() {
    const { showSignup } = this.state;
    return (
      <>
        <Header {...this.props} />
        <BackGroundContainer>
          <Title>Connectez-vous</Title>
          <LogContainer>
            <SignButtonContainer>
              <LoginButton
                isDisplayed={!showSignup}
                onClick={this.displayLogin}
              >
                Se connecter
              </LoginButton>
              <SignupButton
                isDisplayed={showSignup}
                onClick={this.displaySignup}
              >
                S'inscrire
              </SignupButton>
            </SignButtonContainer>
            {!showSignup && (
              <Login
                isDisplayed={!this.state.showSignup}
                onLogin={this.onLogin}
              />
            )}
            {showSignup && (
              <Signup
                isDisplayed={this.state.showSignup}
                onLogin={this.onLogin}
              />
            )}
          </LogContainer>
        </BackGroundContainer>
      </>
    );
  }
}

const BackGroundContainer = styled.div`
  min-height: calc(100vh - 80px);
  background-color: #111827;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  margin-bottom: 40px;
  font-family: Merriweather;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 150%;
  text-align: center;
  color: #ffffff;
`;

const LogContainer = styled.div`
  margin: 0 auto;
  max-width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e5e7eb;
  border-radius: 8px;
`;

const SignButtonContainer = styled.div`
  display: flex;
`;

const LoginButton = styled.button`
  width: 200px;
  height: 45px;
  background-color: ${(props) => (props.isDisplayed ? "white" : "#E5E7EB")};
  color: ${(props) => (props.isDisplayed ? "black" : "#6B7280")};
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 8px 8px 0 0;
  ${media.mobile`
  width: 150px;
`};
`;

const SignupButton = styled.button`
  width: 200px;
  height: 45px;
  background-color: ${(props) => (props.isDisplayed ? "white" : "#E5E7EB")};
  color: ${(props) => (props.isDisplayed ? "black" : "#6B7280")};
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 8px 8px 0 0;
  ${media.mobile`
  width: 150px;
`};
`;

export default LoginPage;