import React from "react";
import styled from "styled-components";
import "../styles/style.css";

import Signup from "../components/signup";
import Login from "../components/login";

class Home extends React.Component {
  state = {
    showSignup: false,
    showLogin: true,
  };

  onLogin = (user) => {
    this.props.setUser(user);
    this.props.history.push("/theme");
  };

  displaySignup = (e) => {
    this.setState({ showSignup: true, showLogin: false });
  };

  displayLogin = (e) => {
    this.setState({ showSignup: false, showLogin: true });
  };

  render() {
    return (
      <>
        <BackGroundContainer>
          <Title>Connectez-vous</Title>
          <SignupContainer>
            <SignButtonContainer>
              <SignButton
                isDisplayed={this.state.showLogin}
                onClick={this.displayLogin}
              >
                Connection
              </SignButton>
              <SignButton
                isDisplayed={this.state.showSignup}
                onClick={this.displaySignup}
              >
                S'inscrire
              </SignButton>
            </SignButtonContainer>
            {this.state.showLogin && <Login onLogin={this.onLogin} />}
            {this.state.showSignup && <Signup onLogin={this.onLogin} />}
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
  font-size: 50px;
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
  box-shadow: -15px 15px 0px #000000;
`;

const SignButtonContainer = styled.div`
  display: flex;
`;

const SignButton = styled.button`
  width: 200px;
  height: 30px;
  background-color: ${(props) => (props.isDisplayed ? "white" : "transparent")};
  font-size: 16px;
  border: 1px solid black;
  border-bottom: ${(props) => (props.isDisplayed ? "none" : "")};
  cursor: pointer;
`;

export default Home;
