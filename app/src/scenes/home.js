import React from "react";
import styled from "styled-components";
import "../styles/style.css";

import Header from "../components/Header";
import Signup from "../components/Signup";
import Login from "../components/Login";

class Home extends React.Component {
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
        <Header isActive={true} />
        <BackGroundContainer>
          <Title>Connectez-vous</Title>
          <SignupContainer>
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
            {!showSignup && <Login onLogin={this.onLogin} />}
            {showSignup && <Signup onLogin={this.onLogin} />}
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
`;

const Title = styled.h2`
  font-family: Nunito SANS;
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 40px;
`;

const SignupContainer = styled.div`
  margin: 0 auto;
  width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;

const SignButtonContainer = styled.div`
  display: flex;
`;

const LoginButton = styled.button`
  width: 200px;
  height: 30px;
  background-color: ${(props) => (props.isDisplayed ? "white" : "transparent")};
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 10px 10px 0 0;
`;

const SignupButton = styled.button`
  width: 200px;
  height: 30px;
  background-color: ${(props) => (props.isDisplayed ? "white" : "transparent")};
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 10px 10px 0 0;
`;

export default Home;
