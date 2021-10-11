import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { media } from "../styles/mediaQueries";

import UserContext from "../contexts/user";
import DataContext from "../contexts/data";

import ThemeButton from "../components/ThemeButton";
import Button from "../components/Button";

const ThemeSelect = () => {
  const { userAnswers } = useContext(UserContext);
  const { quizz } = useContext(DataContext);
  const history = useHistory();

  const goToResults = () => history.push("/result");
  const goToQuizz = (e) => {
    const themeId = e.target.dataset.themeid;
    const firstQuestionId = quizz.find((t) => t._id === themeId).questions[0]._id;
    history.push(`/question/${themeId}/${firstQuestionId}`);
  };

  return (
    <>
      <BackgroundContainer>
        <SubContainer>
          <Title>Sélectionnez vos thèmes</Title>
          <SubTitle>
            Répondez au quizz thème par thème, en choisissant{" "}
            <strong>celui qui vous tient le plus à coeur</strong>
          </SubTitle>
          <ThemesContainer>
            {quizz.map((theme) => {
              return <ThemeButton key={theme._id} theme={theme} onClick={goToQuizz} />;
            })}
          </ThemesContainer>
          {/* <Footer> */}
          <Button disabled={!userAnswers.length} onClick={goToResults}>
            Voir les résultats
          </Button>
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
  margin-bottom: 40px;
  ${media.mobile`
    grid-template-columns: auto;
    margin-bottom: 20px;
  `}
`;

export default ThemeSelect;
