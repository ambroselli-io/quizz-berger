import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Chart, RadarController, RadialLinearScale } from "chart.js";
import { media } from "../styles/mediaQueries";

Chart.register(RadarController, RadialLinearScale);

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

const RadarChart = ({ candidatesScorePerThemes, selectedThemes, selectedCandidates, quizz }) => {
  const [isMounted, setIsMounted] = useState(false);

  const dataSets = candidatesScorePerThemes?.map((candidat, index) => {
    const scores = candidat.scorePerThemes
      .filter((score) => selectedThemes.includes(score.themeId))
      .map((score) => score.score);

    return {
      label: candidat?.pseudo,
      hidden: false,
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
