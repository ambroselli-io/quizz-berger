import React from "react";
import styled from "styled-components";

const ThemesModal = ({ show, unselectedThemes, onSelectTheme }) => {
  if (!show) return null;
  return (
    <>
      <Triangle />
      <Modal>
        {unselectedThemes.map((theme) => {
          return (
            <ThemeSubmenu key={theme._id} data-theme={theme._id} onClick={onSelectTheme}>
              {theme.fr}
            </ThemeSubmenu>
          );
        })}
      </Modal>
    </>
  );
};

const Triangle = styled.span`
  z-index: 99;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid white;
`;

const Modal = styled.div`
  padding: 0 10px;
  width: 400px;
  display: grid;
  grid-gap: 1px black;
  flex-direction: column;
  align-self: center;
  border-radius: 10px;
  box-shadow: 0px 7px 17px 0px rgb(0 0 0 / 7%);
  background-color: white;
`;

const ThemeSubmenu = styled.button`
  height: 40px;
  border: none;
  border-bottom: 1px solid #f7df1e;
  color: black;
  background-color: white;
  font-size: 16px;
  &:last-child {
    border-bottom: none;
  }
`;

export default ThemesModal;
