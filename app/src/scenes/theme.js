import React from "react";
import styled from "styled-components";

import Header from "../components/Header";
import ThemesSelector from "../components/ThemesSelector";
import API from "../services/api";

class Theme extends React.Component {
  saveSelectedThemes = async (themeIds) => {
    const response = await API.putWithCreds({ path: "/user", body: { themes: themeIds } });
    if (response.ok) {
      const { setUser, history } = this.props;
      setUser(response.data);
      history.push("/question");
    }
  };

  render() {
    const { user } = this.props;
    return (
      <>
        <Header isActive />
        <BackgroundContainer>
          <SubContainer>
            <Title>Selectionnez vos themes</Title>
            <SubTitle>Merci de choisir au moins 3 themes</SubTitle>
            <ThemesSelector user={user.themes} saveSelectedThemes={this.saveSelectedThemes} />
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
