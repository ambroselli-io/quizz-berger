import React from "react";
import styled from "styled-components";
import "../styles/style.css";

import Header from "../components/header";
import ThemesSelector from "../components/themesSelector";

class Theme extends React.Component {
  state = {};

  sendSelectedThemes = async (themeIds) => {
    const response = await fetch("http://127.0.0.1:8080/user", {
      method: "PUT",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        themes: themeIds,
      }),
    }).then((res) => res.json());

    if (response.ok) {
      this.props.setTheme(response.data);
      this.props.history.push("/question");
    }
  };

  render() {
    return (
      <>
        <Header isActive />
        <BackgroundContainer>
          <SubContainer>
            <Title>Selectionnez vos themes</Title>
            <SubTitle>Merci de choisir au moins 3 themes</SubTitle>
            <ThemesSelector
              userThemes={this.props.user.themes}
              sendSelectedThemes={this.sendSelectedThemes}
            />
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
  font-family: Nunito SANS;
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

export default Theme;
