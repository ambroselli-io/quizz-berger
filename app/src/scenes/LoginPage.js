import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

import { media } from "../styles/mediaQueries";

import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Footer from "../components/Footer";
import UserContext from "../contexts/user";

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const [state, setFullState] = useState({
    showSignup: process.env.NODE_ENV !== "development",
    pseudo: "",
    password: "",
    passwordConfirm: "",
    candidate: false,
  });

  const setState = (newState) => setFullState((oldState) => ({ ...oldState, ...newState }));

  const onChange = (e) => setState({ [e.target.name]: e.target.value });

  const onLogin = (user) => {
    setUser(user);
    history.push("/themes");
  };

  const displaySignup = () => setState({ showSignup: true });

  const displayLogin = () => setState({ showSignup: false });

  return (
    <>
      <BackGroundContainer>
        <Title>Connectez-vous</Title>
        <LogContainer>
          <LoginTabs>
            <LoginTab isDisplayed={!state.showSignup} onClick={displayLogin}>
              Se connecter
            </LoginTab>
            <LoginTab isDisplayed={state.showSignup} onClick={displaySignup}>
              S'inscrire
            </LoginTab>
          </LoginTabs>
          {!state.showSignup && (
            <SignIn
              isDisplayed={!state.showSignup}
              onLogin={onLogin}
              onChange={onChange}
              onGoToSignup={displaySignup}
              {...state}
            />
          )}
          {state.showSignup && (
            <SignUp
              isDisplayed={state.showSignup}
              onLogin={onLogin}
              onChange={onChange}
              {...state}
            />
          )}
        </LogContainer>
      </BackGroundContainer>
      <Footer />
    </>
  );
};

const BackGroundContainer = styled.div`
  padding: 40px 20px 40px 20px;
  height: calc(100vh - 80px);
  background-color: #111827;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${media.mobile`
  padding: 40px 10px 40px 10px;
  min-height: auto;
  height: calc(100vh - 60px);
  `}
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
  width: 90vw;
  max-width: 400px;
`;

const LoginTabs = styled.div`
  display: flex;
  width: 100%;
  flex-shrink: 0;
`;

const LoginTab = styled.button`
  flex-basis: 50%;
  flex-shrink: 0;
  flex-grow: 1;
  padding: 15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isDisplayed ? "white" : "#E5E7EB")};
  color: ${(props) => (props.isDisplayed ? "black" : "#6B7280")};
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 8px 8px 0 0;
`;

export default LoginPage;
