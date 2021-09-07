import React from "react";
import styled from "styled-components";

class ThemesModal extends React.Component {
  render() {
    if (!this.props.show) return null;
    return (
      <>
        <Triangle />
        <Modal>
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
        </Modal>
      </>
    );
  }
}

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

const Filet = styled.span`
  width: 100%;
  height: 1px;
  background-color: #f7df1e;
`;

export default ThemesModal;
