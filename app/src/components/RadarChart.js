import { React, useEffect, useRef } from "react";
import styled from "styled-components";
import { Radar } from "react-chartjs-2";
import { media } from "../styles/mediaQueries";

import quizz from "../quizz.json";

const options = {
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: true,
      position: "bottom",
      onClick: false,
      labels: {
        usePointStyle: true,
        boxHeight: 4,
        pointStyle: "circle",
        font: {
          size: 14,
        },
      },
    },
  },

  scales: {
    r: {
      suggestedMin: 0,
      suggestedMax: 20,
      pointLabels: {
        position: "bottom",
        font: {
          size: 12,
          weight: 500,
        },
        padding: 20,
      },
      grid: {
        // circular: true,
        lineWidth: 1,
      },
      ticks: {
        display: false,
      },
    },
  },
};

const RadarChart = ({ candidatesScorePerThemes, selectedCandidates }) => {
  const chartRef = useRef();

  const colors = [
    {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      pointBackgroundColor: "black",
      borderColor: "black",
    },
    {
      backgroundColor: "rgba(255, 0, 0, 0.1)",
      pointBackgroundColor: "red",
      borderColor: "red",
    },
    {
      backgroundColor: "rgba(255,165,0, 0.1)",
      pointBackgroundColor: "orange",
      borderColor: "orange",
    },
    {
      backgroundColor: "rgba(255, 99, 132, 0.1)",
      pointBackgroundColor: "yellow",
      borderColor: "yellow",
    },
    {
      backgroundColor: "rgba(255, 99, 132, 0.1)",
      pointBackgroundColor: "green",
      borderColor: "green",
    },
    {
      backgroundColor: "rgba(255, 99, 132, 0.1)",
      pointBackgroundColor: "violet",
      borderColor: "violet",
    },
  ];

  let dataSets = candidatesScorePerThemes?.map((partyScores, index) => {
    const scores = partyScores.map((score) => score.score);

    return {
      label: partyScores[0].pseudo,
      hidden: true,
      backgroundColor: colors[index].backgroundColor,
      pointBackgroundColor: colors[index].pointBackgroundColor,
      borderColor: colors[index].borderColor,
      borderWidth: 1,
      data: scores,
    };
  });

  const themes = candidatesScorePerThemes[0]?.map((theme) => {
    return quizz.find((quizztheme) => quizztheme._id === theme.themeId).fr;
  });

  const data = {
    datasets: dataSets,
    labels: themes,
  };

  useEffect(() => {
    selectedCandidates.forEach((c) => {
      const getCandidateDataSetIndex = dataSets.findIndex(
        (data) => data.label === c
      );
      chartRef.current.data.datasets[getCandidateDataSetIndex].hidden = false;
      chartRef.current.update();
    });
  }, [selectedCandidates]);

  return (
    <RadarContainer>
      <Radar ref={chartRef} data={data} options={options} />
    </RadarContainer>
  );
};

const RadarContainer = styled.div`
  margin: 0 auto;
  width: 30vw;
  height: 600px;
  ${media.mobile`
  width: 200px;
  height: 400px;
`}
`;

export default RadarChart;
