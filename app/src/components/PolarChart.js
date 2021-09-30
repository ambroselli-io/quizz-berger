import { React, useRef, useEffect } from "react";
import styled from "styled-components";
import { PolarArea } from "react-chartjs-2";
import { media } from "../styles/mediaQueries";

import quizz from "../quizz.json";

const PolarChart = ({ candidatesScorePerThemes, partyScores, selectedThemes }) => {
  const radarChartRef = useRef();

  const scores = partyScores.map((score) => score.score);
  const themes = candidatesScorePerThemes[0]?.map((theme) => {
    return quizz.find((quizztheme) => quizztheme._id === theme.themeId).fr;
  });

  const data = {
    labels: themes,
    datasets: [
      {
        data: scores,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
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
          boxHeight: 4,
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
        suggestedMax: 20,
        grid: {
          lineWidth: 1,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    // selectedThemes.forEach((c) => {
    //   const getCandidateDataSetIndex = dataSets.findIndex(
    //     (data) => data.label === c
    //   );
    //   chartRef.current.data.datasets[getCandidateDataSetIndex].hidden = false;
    //   chartRef.current.update();
    // });

    radarChartRef.current?.toggleDataVisibility(2);
    radarChartRef.current?.update();
  }, [selectedThemes]);

  return (
    <>
      <ChartContainer>
        <CandidateTitle>{partyScores[0].pseudo}</CandidateTitle>
        <PolarArea ref={radarChartRef} data={data} options={options} />
      </ChartContainer>
    </>
  );
};

const ChartContainer = styled.div`
  margin: 0 auto;
  padding: 40px;
  margin-bottom: 20px;
  width: 30vw;
  max-width: 400px;
  height: auto;
  border: 1px solid grey;
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
