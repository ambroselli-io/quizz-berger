import React, { useMemo } from "react";
import styled from "styled-components";

const ThemeButton = ({ theme, onClick, userAnswers = [] }) => {
  const { backgroundColor, fr, _id, questions } = theme;

  const userThemeAnswers = useMemo(
    () => userAnswers?.filter((a) => a.themeId === theme._id)?.length || 0,
    [userAnswers]
  );

  const progress = useMemo(() => userThemeAnswers / questions.length, [userThemeAnswers, questions.length]);

  return (
    <ThemesButtonStyled data-themeid={_id} onClick={onClick} backgroundColor={backgroundColor}>
      <BackgroundProgress key={progress} data-themeid={_id} backgroundColor={backgroundColor} progress={progress} />
      <span />
      <span data-themeid={_id}>{fr}</span>
      <Progress data-themeid={_id}>
        {!!progress ? `${userThemeAnswers} / ${questions.length}` : `${questions.length} questions`}
      </Progress>
    </ThemesButtonStyled>
  );
};

export const ThemesButtonStyled = styled.button`
  padding: 15px 24px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 2px solid ${(props) => props.backgroundColor};
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
`;

const BackgroundProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => Math.round(props.progress * 100)}%;
  height: 100%;
  background-color: ${(props) => props.backgroundColor}CC;
`;

const Progress = styled.span`
  margin-top: 5px;
  margin-left: auto;
  font-size: 0.65em;
  color: #000;
`;
export default ThemeButton;
