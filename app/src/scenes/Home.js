import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "../styles/mediaQueries";

import Footer from "../components/Footer";

const Home = () => (
  <>
    <BackgroundContainer>
      <Container>
        <Title>QUI est mon candidat idéal ?</Title>
        <SubTitle>
          Répondez de façon <strong>anonyme</strong> au Quizz&nbsp;du&nbsp;Berger pour connaître le
          ou les candidats qui se rapprochent le plus de vos idées, et
          <strong> faites&nbsp;votre&nbsp;choix&nbsp;!</strong>
          {/* Take our Political
              Compass test to find out which political group your best match is */}
        </SubTitle>
        <QuizzButton>Répondre au Quizz</QuizzButton>
        <Link to="/login">
          <LoginLink>
            Vous avez enregistré vos résultats&nbsp;? <strong>Connectez&#8209;vous</strong>
          </LoginLink>
        </Link>
      </Container>
    </BackgroundContainer>
    <Footer />
  </>
);

const BackgroundContainer = styled.div`
  padding: 40px 20px 40px 20px;
  height: calc(100vh - 80px);
  background-color: #111827;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${media.mobile`
  padding: 40px 10px 40px 10px;
  min-height: 570px;
  height: calc(100vh - 60px);
  `}
`;

const Container = styled.div`
  max-width: 770px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.mobile`
`}
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-family: Merriweather;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 150%;
  text-align: center;
  color: #ffffff;
  ${media.mobile`
  font-size: 34px;
`}
`;

const SubTitle = styled.h3`
  margin-bottom: 40px;
  font-family: Merriweather Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 200%;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
`;

const QuizzButton = styled.button`
  width: 240px;
  height: 65px;
  background: #facc15;
  border-radius: 55px;
  border: none;
  font-family: Merriweather Sans;
  font-weight: 600;
  font-size: 16px;
  color: #111827;
  cursor: pointer;
`;

const LoginLink = styled.span`
  display: block;
  margin-top: 20px;
  font-family: Merriweather Sans;
  font-style: normal;
  font-weight: 300;
  line-height: 1.5em;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
`;

export default Home;
