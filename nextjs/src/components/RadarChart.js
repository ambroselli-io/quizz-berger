/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Chart, RadarController, RadialLinearScale, Legend } from "chart.js";
import { media } from "../styles/mediaQueries";

Chart.register(RadarController, RadialLinearScale, Legend);

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
].map((color) => ({
  backgroundColor: color,
  pointBackgroundColor: color,
  borderColor: color,
}));

const RadarChart = ({ candidatesScorePerThemes, selectedThemes, selectedCandidates, quizz }) => {
  const [isMounted, setIsMounted] = useState(false);

  const dataSets = candidatesScorePerThemes?.map((candidat, index) => {
    const scores = candidat.scorePerThemes
      .filter((score) => selectedThemes.includes(score.themeId))
      .map((score) => score.percent);

    return {
      label: candidat?.pseudo,
      hidden: true,
      backgroundColor: colors[index % colors.length].backgroundColor,
      pointBackgroundColor: colors[index % colors.length].pointBackgroundColor,
      borderColor: colors[index % colors.length].borderColor,
      borderWidth: 1,
      data: scores,
    };
  });

  const data = {
    datasets: dataSets,
    labels: selectedThemes.map(
      (themeId) => quizz.find((quizztheme) => quizztheme._id === themeId).fr
    ),
  };
  const radarChartCanvasRef = useRef(null);
  const radarChartRef = useRef(null);

  useEffect(() => {
    if (isMounted) {
      const ctx = radarChartCanvasRef.current.getContext("2d");
      radarChartRef.current = new Chart(ctx, {
        type: "radar",
        data,
        options,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  useEffect(() => {
    for (const candidate of selectedCandidates) {
      if (!radarChartRef.current) continue;
      const getCandidateDataSetIndex = dataSets.findIndex((data) => data.label === candidate);
      radarChartRef.current.data.datasets[getCandidateDataSetIndex].hidden = false;
      radarChartRef.current.update();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, selectedCandidates.length]);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, []);

  return (
    <RadarContainer>
      <canvas ref={radarChartCanvasRef} width="400" height="900" />
    </RadarContainer>
  );
};

const RadarContainer = styled.div`
  margin: 0 auto;
  width: 30vw;
  height: 600px;
  ${media.mobile`
    width: 300px;
    height: 400px;
  `}
`;

export default RadarChart;
