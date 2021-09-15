import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Header from "../components/Header";

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <BackgroundContainer>
          <Container>
            <Title>Know where you actually take a stand</Title>
            <SubTitle>
              Take our Political Compass test to find out which political group
              your best match is
            </SubTitle>
            <QuizzButton>
              <Link to='/theme'> Take the test now</Link>
            </QuizzButton>
          </Container>
        </BackgroundContainer>
      </>
    );
  }
}

const BackgroundContainer = styled.div`
  height: 100vh;
  background-color: #111827;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 770px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
`;

const SubTitle = styled.h3`
  margin-bottom: 40px;
  font-family: Merriweather Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 200%;
  color: #ffffff;
  opacity: 0.8;
`;

const QuizzButton = styled.button`
  padding: 20px 24px;

  background: #facc15;
  border-radius: 56px;
  border: none;

  font-family: Merriweather Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  color: #111827;

  cursor: pointer;
`;

export default App;
