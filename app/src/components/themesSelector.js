import React, { useState } from "react";
import styled from "styled-components";

import ThemesModal from "./ThemesModal";
import quizz from "../quizz.json";

const ThemesSelector = ({ saveSelectedThemes, user }) => {
  const [show, setShow] = useState(false);
  const [selectedThemesIds, setSelectedThemesIds] = useState(user.themes || []);

  const showModal = () => setShow(!show);

  const onSelectTheme = (e) => {
    setSelectedThemesIds([...selectedThemesIds, e.target.dataset.theme]);
  };

  const unselectedThemes = quizz.filter((theme) => !selectedThemesIds.includes(theme._id));

  const resetSelectedThemes = () => {
    setSelectedThemesIds([]);
  };

  const deleteTheme = (e) => {
    const themeIdToDelete = e.target.dataset.theme;
    const filteredTheme = selectedThemesIds.filter((id) => id !== themeIdToDelete);
    setSelectedThemesIds(filteredTheme);
  };

  const onValidate = () => saveSelectedThemes(selectedThemesIds);

  return (
    <>
      <ButtonsContainer>
        {unselectedThemes.length < quizz.length && (
          <ResetButton onClick={resetSelectedThemes}>Réinitialiser les thèmes</ResetButton>
        )}
        {selectedThemesIds.length >= 3 && (
          <ValidateButton onClick={onValidate}>Valider mes thèmes</ValidateButton>
        )}
      </ButtonsContainer>
      {selectedThemesIds.map((selectedThemeId) => (
        <ThemeList key={selectedThemeId}>
          <DeleteButton data-theme={selectedThemeId} onClick={deleteTheme}>
            &#10005;
          </DeleteButton>
          {quizz.find((theme) => theme._id === selectedThemeId).fr}
        </ThemeList>
      ))}
      <ModalButton onClick={showModal}>Ajouter un thème</ModalButton>
      <ThemesModal unselectedThemes={unselectedThemes} onSelectTheme={onSelectTheme} show={show} />
    </>
  );
};

const ButtonsContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
`;

const ResetButton = styled.button`
  margin-bottom: 20px;
  width: 190px;
  height: 40px;
  background-color: transparent;
  color: red;
  border: 2px solid red;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 700;
`;

const ValidateButton = styled.button`
  margin-bottom: 20px;
  width: 190px;
  height: 40px;
  background-color: transparent;
  color: green;
  border: 2px solid green;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 700;
`;

const ModalButton = styled.button`
  margin-bottom: 20px;
  width: 400px;
  height: 80px;
  border: 2px dashed white;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  box-shadow: 0px 7px 17px 0px rgb(0 0 0 / 7%);
  background-color: #f7df1e;
  color: white;
  font-size: 18px;
`;

const ThemeList = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 400px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  color: black;
  font-size: 16px;
`;

const DeleteButton = styled.button`
  padding: 0;
  position: absolute;
  right: 7px;
  top: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: black;
`;

export default ThemesSelector;
