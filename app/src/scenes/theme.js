import React from "react";
import styled from "styled-components";

import Header from "../components/Header";
import ThemeButton from "../components/ThemeButton";
import API from "../services/api";
import quizz from "../quizz.json";

class Theme extends React.Component {
  state = {
    selectedThemesIds: this.props.user.themes,
  };

  onSelectTheme = (e) => {
    const { selectedThemesIds } = this.state;
    // if the theme is already selected, delete it from the state
    if (!!selectedThemesIds.find((t) => t === e.target.dataset.themeid)) {
      const filteredSelectedTheme = selectedThemesIds.filter(
        (id) => id !== e.target.dataset.themeid
      );
      this.setState({ selectedThemesIds: filteredSelectedTheme });
      console.log("deleted");
      return;
    }
    this.setState({
      selectedThemesIds: [
        ...this.state.selectedThemesIds,
        e.target.dataset.themeid,
      ],
    });
    console.log("added");
  };

  saveSelectedThemes = async (themeIds) => {
    const { selectedThemesIds } = this.state;
    if (selectedThemesIds.length < 3) {
      alert("please select atleast 3 themes");
      return;
    }

    const response = await API.putWithCreds({
      path: "/user",
      body: { themes: selectedThemesIds },
    });
    if (response.ok) {
      const { setUser, history } = this.props;
      const firstQuestionId = quizz.find(
        (t) => t._id === response.data.themes[0]
      ).questions[0]._id;
      setUser(response.data);
      history.push(`/question/${response.data.themes[0]}/${firstQuestionId}`);
    }
  };

  render() {
    const { selectedThemesIds } = this.state;
    return (
      <>
        <Header user={this.props.user} />
        <BackgroundContainer>
          <SubContainer>
            <Title>Political Compass Test</Title>
            <SubTitle>
              Take our Political Compass test to identify your political group
              and know which candidates to vote for the upcoming elections.
              <br /> <br />
              But first, please choose at least 3 themes
            </SubTitle>
            <ThemesContainer>
              {quizz.map((t) => {
                return (
                  <ThemeButton
                    theme={t.fr}
                    themeId={t._id}
                    isActive={!!selectedThemesIds.find((id) => id === t._id)}
                    selectedThemesIds={selectedThemesIds}
                    key={t._id}
                    onSelect={this.onSelectTheme}
                  />
                );
              })}
            </ThemesContainer>
            <ValidateButton
              isDisplayed={selectedThemesIds.length >= 3}
              onClick={this.saveSelectedThemes}
            >
              Valider mes thèmes
            </ValidateButton>
          </SubContainer>
        </BackgroundContainer>
      </>
    );
  }
}

const BackgroundContainer = styled.div`
  padding-top: 80px;
  height: 100vh;
`;

const SubContainer = styled.div`
  margin: 0 auto;
  height: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-family: Merriweather;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #111827;
`;

const ThemesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 20px;
`;

const SubTitle = styled.h3`
  margin-bottom: 20px;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  color: #111827;
`;

const ValidateButton = styled.button`
  margin-top: 40px;
  width: 384px;
  height: 64px;
  background: ${(props) =>
    props.isDisplayed ? "#facc15" : "rgba(156, 163, 175, 0.2)"};
  color: ${(props) => (props.isDisplayed ? "black" : "rgba(17, 24, 39, 0.2)")};
  border-radius: 56px;
  border: none;
  cursor: pointer;
  cursor: ${(props) => (props.isDisplayed ? "pointer" : "auto")};
`;

export default Theme;
