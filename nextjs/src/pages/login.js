import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { media } from "../styles/mediaQueries";

import Footer from "../components/Footer";
import LoginContainer from "../components/LoginContainer";

const LoginPage = () => {
  const router = useRouter();

  return (
    <>
      <BackGroundContainer>
        <LoginContainer onSuccess={() => router.push("/themes")} title="Connectez-vous" />
      </BackGroundContainer>
      <Footer />
    </>
  );
};

const BackGroundContainer = styled.div`
  padding: 40px 20px 40px 20px;
  min-height: calc(100vh - 80px);
  background-color: #111827;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${media.mobile`
  padding: 40px 10px 40px 10px;
  min-height: calc(100vh - 60px);
  `}
`;

export default LoginPage;
