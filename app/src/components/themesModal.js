import React from "react";
import styled from "styled-components";

class ThemesModal extends React.Component {
  render() {
    if (!this.props.show) return null;
    return (
      <ThemeModal>
        {this.props.filteredTheme.map((theme) => {
          return (
            <ThemeSubmenu
              key={theme._id}
              data-theme={theme._id}
              onClick={this.props.onSelectTheme}
            >
              {theme.fr}
            </ThemeSubmenu>
          );
        })}
      </ThemeModal>
    );
  }
}

const ThemeModal = styled.div`
  width: 400px;
  display: grid;
  grid-gap: 1px black;
  flex-direction: column;
  align-self: center;
  border: 2px solid #e3cc1b;
  border-radius: 10px;
  box-shadow: 0px 7px 17px 0px rgb(0 0 0 / 7%);
`;

const ThemeSubmenu = styled.button`
  height: 40px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #e3cc1b;
  color: #665c0c;
`;

export default ThemesModal;
