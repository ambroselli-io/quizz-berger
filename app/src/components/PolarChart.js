import React from "react";
import styled from "styled-components";
import { PolarArea } from "react-chartjs-2";

import quizz from "../quizz.json";

class PolarChart extends React.Component {
  render() {
    const { candidatesScorePerThemes } = this.props;
    const options = {
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
              size: 12,
            },
          },
        },
      },
      scale: {
        r: {},
        ticks: {
          suggestedMin: 0,
          suggestedMax: 20,
          display: false,
        },
      },
    };

    const PolarCharts = candidatesScorePerThemes?.map((partyScores, index) => {
      console.log(partyScores);
      const scores = partyScores.map((score) => score.score);
      const themes = candidatesScorePerThemes[0]?.map((theme) => {
        return quizz.find((quizztheme) => quizztheme._id === theme.themeId).fr;
      });

      const data = {
        labels: themes,
        datasets: [
          {
            label: "# of Votes",
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
      return (
        <>
          <ChartContainer key={index}>
            <CandidateTitle>{partyScores[0].pseudo}</CandidateTitle>
            <PolarArea data={data} options={options} key={index} />
          </ChartContainer>
        </>
      );
    });

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
                // onClick={onShowCandidate}
              >
                {candidate[0].pseudo}
              </CandidatButton>
            ))}
          </CandidatButtonContainer>
        </LeftContainer>
        <Container>{PolarCharts}</Container>
      </SelectCandidatContainer>
    );
  }
}

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

const Container = styled.div`
  margin: 0 auto;
  width: auto;
`;

const ChartContainer = styled.div`
  padding: 40px;
  margin-bottom: 20px;
  width: 400px;
  border: 1px solid #e5e7eb;
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
