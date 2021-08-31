import React from "react";
import styled from "styled-components";
import "../styles/style.css";

import ThemesSelector from "../components/themesSelector";

class Theme extends React.Component {
  state = {
    selectedThemes: [],
  };

  getSelectedThemes = async (themeIds) => {
    const response = await fetch("http://127.0.0.1:8080/user", {
      method: "PUT",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        themes: themeIds,
      }),
    }).then((res) => res.json());

    if (response.ok) {
      this.props.history.push("/question");
    }
  };

  render() {
    return (
      <>
        <BackgroundContainer>
          <SubContainer>
            <Title>Selectionnez vos themes</Title>
            <SubTitle>Merci de choisir au moins 3 themes</SubTitle>
            <ThemesSelector sendSelectedThemes={this.getSelectedThemes} />
          </SubContainer>
        </BackgroundContainer>
      </>
    );
  }
}

const BackgroundContainer = styled.div`
  padding: 40px;
  min-height: 100vh;
  width: 100vw;
  background-color: #f7df1e;
`;

const SubContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;
`;

const SubTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

// const SelectThemeButton = styled.button`
//   align-self: center;
//   background-color: transparent;
//   border: 1px solid black;
//   cursor: pointer;
// `;

export default Theme;
