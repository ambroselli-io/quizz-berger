import React, { useState } from "react";
import styled from "styled-components";

import ThemesModal from "./themesModal";

const themes = [
  { _id: "theme1", fr: "Dépenses publiques et dette" },
  { _id: "theme2", fr: "Entreprises, emploi et économie" },
  { _id: "theme3", fr: "Environnement et Energie" },
  { _id: "theme4", fr: "Fonction publique et effectifs publics" },
  { _id: "theme5", fr: "Gouvernance et république" },
  { _id: "theme6", fr: "Défense et justice" },
  { _id: "theme7", fr: "Politique fiscale" },
  { _id: "theme8", fr: "Politique publique" },
  { _id: "theme9", fr: "Social et solidarité" },
  { _id: "theme10", fr: "Territoires et colléctivités" },
];

const ThemesSelector = ({ sendSelectedThemes }) => {
  const [show, setShow] = useState(false);
  const [selectedThemesIds, setSelectedThemesIds] = useState([]);

  const showModal = () => {
    if (show === true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const onSelectTheme = (e) => {
    setSelectedThemesIds([...selectedThemesIds, e.target.dataset.theme]);
    console.log(selectedThemesIds);
  };

  let filteredTheme = themes.filter((theme) => {
    return (
      theme._id !==
      selectedThemesIds.find((id) => {
        return theme._id === id;
      })
    );
  });

  const resetFilteredTheme = () => {
    setSelectedThemesIds([]);
  };

  const deleteTheme = (e) => {
    const themeIdToDelete = e.target.dataset.theme;
    const filteredTheme = selectedThemesIds.filter(
      (id) => id !== themeIdToDelete
    );
    setSelectedThemesIds(filteredTheme);
  };

  const sendThemesToParent = () => sendSelectedThemes(selectedThemesIds);

  return (
    <>
      <ButtonsContainer>
        {filteredTheme.length < themes.length && (
          <ResetButton onClick={resetFilteredTheme}>
            Réinitialiser les thèmes
          </ResetButton>
        )}
        {3 <= selectedThemesIds.length && (
          <ValidateButton onClick={sendThemesToParent}>
            Valider mes thèmes
          </ValidateButton>
        )}
      </ButtonsContainer>
      {selectedThemesIds.map((selectedThemeId) => (
        <ThemeList key={selectedThemeId}>
          <DeleteButton data-theme={selectedThemeId} onClick={deleteTheme}>
            &#10005;
          </DeleteButton>
          {themes.find((theme) => theme._id === selectedThemeId).fr}
        </ThemeList>
      ))}
      <ModalButton onClick={showModal}>Ajouter un thème</ModalButton>
      <ThemesModal
        themes={themes}
        filteredTheme={filteredTheme}
        onSelectTheme={onSelectTheme}
        show={show}
      />
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
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ValidateButton = styled.button`
  margin-bottom: 20px;
  width: 190px;
  height: 40px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ModalButton = styled.button`
  margin-bottom: 20px;
  width: 400px;
  height: 80px;
  background-color: transparent;
  border: 2px dashed #e3cc1b;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 7px 17px 0px rgb(0 0 0 / 7%);
  color: #665c0c;
`;

const ThemeList = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 400px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid #e3cc1b; */
  border-radius: 10px;
  text-align: center;
  color: #665c0c;
  box-shadow: 0px 7px 17px 0px rgb(0 0 0 / 7%);
`;

const DeleteButton = styled.button`
  padding: 0;
  position: absolute;
  right: 7px;
  top: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #665c0c;
`;

export default ThemesSelector;
