import { React, useRef } from "react";
import styled from "styled-components";
import { Radar } from "react-chartjs-2";

import quizz from "../quizz.json";
import { Redirect } from "react-router";

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

const RadarChart = ({ candidatesScorePerThemes }) => {
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
      hidden: false,
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

  const onShowCandidate = (e) => {
    const getButtonCandidateName = e.target.dataset.candidate;
    const getCandidateDataSetIndex = dataSets.findIndex(
      (data) => data.label === getButtonCandidateName
    );
    if (
      chartRef.current.data.datasets[getCandidateDataSetIndex].hidden === false
    ) {
      chartRef.current.data.datasets[getCandidateDataSetIndex].hidden = true;
      chartRef.current.update();
    } else {
      chartRef.current.data.datasets[getCandidateDataSetIndex].hidden = false;
      chartRef.current.update();
    }
  };

  return (
    <SelectCandidatContainer>
      <LeftContainer>
        <Title>Vos résultats</Title>
        <SubTitle>Selectionnez vos candidats</SubTitle>
        <p>
          Selectionnez les candidats que vous souhaitez comparer à vos idées
        </p>
        <CandidatButtonContainer>
          {candidatesScorePerThemes.map((candidate) => (
            <CandidatButton
              key={candidate[0].pseudo}
              data-candidate={candidate[0].pseudo}
              onClick={onShowCandidate}
            >
              {candidate[0].pseudo}
            </CandidatButton>
          ))}
        </CandidatButtonContainer>
      </LeftContainer>
      <RadarContainer>
        <Radar ref={chartRef} data={data} options={options} />
      </RadarContainer>
    </SelectCandidatContainer>
  );
};

const SelectCandidatContainer = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  > p {
    margin-bottom: 20px;
    font-size: 16px;
    color: #111827;
  }
`;

const Title = styled.h2`
  margin-bottom: 60px;
  font-family: Merriweather;
  font-weight: bold;
  font-size: 30px;
  color: #082d0f;
`;

const SubTitle = styled.h3`
  margin-bottom: 20px;
  font-family: Merriweather;
  font-weight: bold;
  font-size: 20px;
  color: #111827;
`;

const CandidatButtonContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 12px;
`;

const CandidatButton = styled.button`
  padding: 0 15px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
`;

const RadarContainer = styled.div`
  margin: 0 auto;
  width: 800px;
  height: 600px;
`;

export default RadarChart;
