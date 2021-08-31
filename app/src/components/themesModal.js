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
  display: flex;
  flex-direction: column;
  background-color: transparent;
  align-self: center;
  border: 2px solid black;
  border-radius: 10px;
`;

const ThemeSubmenu = styled.button`
  height: 30px;
  background-color: transparent;
  border: 1px solid black;
`;

export default ThemesModal;
