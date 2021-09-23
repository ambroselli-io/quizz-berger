import React from "react";
import styled from "styled-components";
import { media } from "../styles/mediaQueries";

class ThemeButton extends React.Component {
  render() {
    const { theme, themeId, onSelect, isActive } = this.props;
    return (
      <ThemesButtons
        data-themeid={themeId}
        isActive={isActive}
        onClick={onSelect}
      >
        <CheckBox data-themeid={themeId} isActive={isActive}>
          &#10003;
        </CheckBox>
        <span data-themeid={themeId}>{theme}</span>
      </ThemesButtons>
    );
  }
}

const ThemesButtons = styled.button`
  padding: 24px;
  max-width: 370px;
  height: 72px;
  display: flex;
  align-items: center;
  border: ${(props) =>
    props.isActive ? "1px solid #6B7280" : "1px solid #e5e7eb"};
  box-sizing: border-box;
  border-radius: 8px;
  background: #ffffff;
  font-size: 14px;
  cursor: pointer;
`;

const CheckBox = styled.div`
  margin-right: 10px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  background: ${(props) => (props.isActive ? "#111827" : "white")};
  color: white;
  border-radius: 16px;
  border: ${(props) => (props.isActive ? "none" : "1px solid #D1D5DB")};
  user-select: none;
`;

export default ThemeButton;
