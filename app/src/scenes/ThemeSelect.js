import React from "react";
import styled from "styled-components";
import { media } from "../styles/mediaQueries";

import ThemeButton from "../components/ThemeButton";
import API from "../services/api";
import quizz from "../quizz.json";

class ThemeSelect extends React.Component {
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
      return;
    }
    this.setState({
      selectedThemesIds: [...this.state.selectedThemesIds, e.target.dataset.themeid],
    });
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
      const firstQuestionId = quizz.find((t) => t._id === response.data.themes[0]).questions[0]._id;
      setUser(response.data);
      history.push(`/question/${response.data.themes[0]}/${firstQuestionId}`);
    }
  };

  render() {
    const { selectedThemesIds } = this.state;
    return (
      <>
        <BackgroundContainer>
          <SubContainer>
            <Title>Quizz politique</Title>
            <SubTitle>
              Participez à notre quizz politique pour trouver le candidat qui se rapproche le plus
              de vos idées !
              <br /> <br />
              Mais avant, veuillez choisir au moins 3 thèmes
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
            {/* <Footer> */}
            <ValidateButton
              isDisplayed={selectedThemesIds.length >= 3}
              onClick={this.saveSelectedThemes}>
              Valider mes thèmes
            </ValidateButton>
            {/* </Footer> */}
          </SubContainer>
        </BackgroundContainer>
      </>
    );
  }
}

const BackgroundContainer = styled.div`
  padding: 40px 10px 40px 10px;
  height: calc(100vh - 80px);
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  ${media.mobile`
  padding: 40px 10px 40px 10px;
  height: auto;
  min-height: 900px;
  `}
`;

const SubContainer = styled.div`
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

const SubTitle = styled.h3`
  margin-bottom: 40px;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  color: #111827;
`;

const ThemesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 20px;
  ${media.mobile`
  grid-template-columns: auto;
  margin-bottom: 50px;
`}
`;

const ValidateButton = styled.button`
  margin-top: 40px;
  width: 384px;
  height: 64px;
  background: ${(props) => (props.isDisplayed ? "#facc15" : "rgb(233, 233, 233)")};
  color: ${(props) => (props.isDisplayed ? "black" : "rgb(17, 24, 39, 0.2)")};
  border-radius: 56px;
  border: none;
  cursor: pointer;
  cursor: ${(props) => (props.isDisplayed ? "pointer" : "auto")};
  ${media.mobile`
  width: 100vw;
  position: fixed;
  bottom: 0;
  margin: 0;
  border-radius: 0;
`}
`;

export default ThemeSelect;
