import React from "react";
import styled from "styled-components";
import { PolarArea } from "react-chartjs-2";
import { media } from "../styles/mediaQueries";

const colors = [
  "#e6194B",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#42d4f4",
  "#f032e6",
  "#bfef45",
  "#fabed4",
  "#469990",
  "#dcbeff",
  "#9A6324",
  "#fffac8",
  "#800000",
  "#aaffc3",
  "#808000",
  "#ffd8b1",
  "#000075",
  "#a9a9a9",
  "#ffffff",
  "#000000",
];

const PolarChart = ({ candidate, selectedThemes, quizz }) => {
  const scores = candidate.scorePerThemes
    .filter((score) => selectedThemes.includes(score.themeId))
    .map((score) => score.score);

  const themes = selectedThemes.map((themeId) => {
    return quizz.find((quizztheme) => quizztheme._id === themeId).fr;
  });

  const data = {
    labels: themes,
    datasets: [
      {
        data: scores,
        backgroundColor: quizz
          .map((theme, themeIndex) => ({ ...theme, backgroundColor: colors[themeIndex] }))
          .filter((theme) => selectedThemes.includes(theme._id))
          .map((t) => t.backgroundColor),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,

    plugins: {
      legend: {
        display: true,
        position: "bottom",
        // onClick: true,
        labels: {
          usePointStyle: true,
          boxHeight: 5,
          pointStyle: "circle",
          font: {
            size: 10,
          },
        },
      },
    },

    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        grid: {
          lineWidth: 1,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <ChartContainer>
        <CandidateTitle>{candidate?.pseudo}</CandidateTitle>
        <PolarArea data={data} options={options} />
      </ChartContainer>
    </>
  );
};

const ChartContainer = styled.div`
  display: block;
  margin: 0 auto;
  padding: 40px;
  margin-bottom: 20px;
  width: 30vw;
  max-width: 400px;
  height: auto;
  /* border: 1px solid #e5e7eb; */
  ${media.mobile`
    width: 90vw;
    max-width: 400px;
    padding: 20px;
  `}
`;

const CandidateTitle = styled.h3`
  margin-bottom: 40px;
  font-family: Merriweather;
  font-weight: bold;
  font-size: 20px;
  color: #111827;
  text-align: center;
`;

export default PolarChart;
