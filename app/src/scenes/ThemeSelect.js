import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { media } from "../styles/mediaQueries";

import API from "../services/api";
import UserContext from "../contexts/user";
import DataContext from "../contexts/data";

import ThemeButton from "../components/ThemeButton";

const ThemeSelect = () => {
  const { user, setUser } = useContext(UserContext);
  const { quizz } = useContext(DataContext);
  const history = useHistory();
  const [selectedThemesIds, setSelectedThemeIds] = useState(user.themes);

  const onSelectTheme = (e) => {
    // if the theme is already selected, delete it from the state
    const newThemeId = e.target.dataset.themeid;
    if (!!selectedThemesIds.find((t) => t === newThemeId)) {
      setSelectedThemeIds(selectedThemesIds.filter((id) => id !== newThemeId));
      return;
    }
    setSelectedThemeIds([...selectedThemesIds, newThemeId]);
  };

  const saveSelectedThemes = async () => {
    if (selectedThemesIds.length < 3) {
      alert("Veuillez sélectionner au moins 3 thèmes");
      return;
    }
    const availableThemeIds = quizz.map((theme) => theme._id);
    const response = await API.putWithCreds({
      path: "/user",
      body: { themes: availableThemeIds.filter((id) => selectedThemesIds.includes(id)) },
    });
    if (response.ok) {
      const firstQuestionId = quizz.find((t) => t._id === response.data.themes[0]).questions[0]._id;
      setUser(response.data);
      history.push(`/question/${response.data.themes[0]}/${firstQuestionId}`);
    }
  };

  return (
    <>
      <BackgroundContainer>
        <SubContainer>
          <Title>Séletionnez vos thèmes</Title>
          <SubTitle>
            Répondez au quizz thème par thème, en choisissant{" "}
            <strong>celui qui vous tient le plus à coeur</strong>
          </SubTitle>
          <ThemesContainer>
            {quizz.map((theme) => {
              return (
                <ThemeButton
                  key={theme._id}
                  theme={theme}
                  isActive={!!selectedThemesIds.find((id) => id === theme._id)}
                  onClick={onSelectTheme}
                />
              );
            })}
          </ThemesContainer>
          {/* <Footer> */}
          <ValidateButton isDisplayed={selectedThemesIds.length >= 3} onClick={saveSelectedThemes}>
            Valider mes thèmes
          </ValidateButton>
          {/* </Footer> */}
        </SubContainer>
      </BackgroundContainer>
    </>
  );
};

const BackgroundContainer = styled.div`
  padding: 40px 10px 40px 10px;
  height: calc(100vh - 80px);
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #fff;
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
