import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

import { media } from "../styles/mediaQueries";

import Footer from "../components/Footer";
import LoginContainer from "../components/LoginContainer";

const LoginPage = () => {
  const history = useHistory();

  return (
    <>
      <BackGroundContainer>
        <LoginContainer onSuccess={() => history.push("/themes")} title="Connectez-vous" />
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

export default LoginPage;
