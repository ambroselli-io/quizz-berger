import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { media } from "../styles/mediaQueries";

import UserContext from "../contexts/user";
import DataContext from "../contexts/data";

import ThemeButton from "../components/ThemeButton";
import Button from "../components/Button";
import { FormInput } from "../components/Form";
import { normalizeWord } from "../utils/diacritics";

const filterBySearch = (search, quizzForSearch) => (theme, index) => {
  if (!search) return true;
  return quizzForSearch[index].includes(normalizeWord(search));
};

const ThemeSelect = () => {
  const { initNewUser, userAnswers } = useContext(UserContext);
  const { quizz, quizzForSearch } = useContext(DataContext);
  const history = useHistory();
  const [search, setSearch] = useState("");

  const goToResults = () => history.push("/result");
  const goToQuizz = async (e) => {
    await initNewUser();
    const themeId = e.target.dataset.themeid;
    const firstQuestionId = quizz.find((t) => t._id === themeId).questions[0]._id;
    history.push(`/question/${themeId}/${firstQuestionId}`);
  };
  const onSearchChange = async (e) => setSearch(e.target.value);

  return (
    <>
      <BackgroundContainer>
        <SubContainer>
          <Title>Choisissez vos thèmes</Title>
          <SubTitle>
            Répondez au quizz, thème après thème, en commençant par{" "}
            <strong>celui qui vous tient le plus à coeur.</strong>
            <br />
            <small>
              Ce test essaie de représenter l'ensemble d'idées le plus large possible, et contient
              des éléments que vous pourrez trouver choquant.
            </small>
            <br />
            <small>
              Vous pouvez toujours ne pas répondre à une question : vous répondez à ce que vous
              voulez, si vous le voulez. Vos réponses et résultats sont <strong>anonymes</strong>
            </small>
          </SubTitle>
          <ThemesContainer>
            {quizz.filter(filterBySearch(search, quizzForSearch)).map((theme) => {
              return <ThemeButton key={theme._id} theme={theme} onClick={goToQuizz} />;
            })}
          </ThemesContainer>
          <SearchInput
            placeholder="Recherchez par mot-clé"
            value={search}
            onChange={onSearchChange}
          />
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
  max-width: 90vw;
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

const SearchInput = styled(FormInput)``;

export default ThemeSelect;
