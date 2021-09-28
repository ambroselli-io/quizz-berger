import React from "react";
import styled from "styled-components";

class App extends React.Component {
  render() {
    return (
      <BackgroundContainer>
        <Title>Mentions Legales</Title>
        <p>Info des mentions legales</p>
      </BackgroundContainer>
    );
  }
}

const BackgroundContainer = styled.div`
  height: 90vh;
  width: 90vw;
  position: fixed;
  top: 0;
  left: 0;
`;

const Title = styled.h2``;

export default App;
