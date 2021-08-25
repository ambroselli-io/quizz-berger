import React from "react";
import styled from "styled-components";
import "../styles/style.css";

import Signup from "../components/signup";
import Login from "../components/login";

class Home extends React.Component {
  state = {
    signup: {
      pseudo: "",
      password: "",
      passwordConfirm: "",
      candidat: false,
    },
    login: {
      pseudo: "",
      password: "",
    },
  };

  render() {
    return (
      <>
        <BackGroundContainer>
          <Title>Inscription</Title>
          <SignupContainer>
            <Signup />
            <Login />
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
  justify-content: space-around;
  align-items: center;
  max-width: 1200px;
`;

export default Home;
