import React from "react";
import styled from "styled-components";
import { Polar } from "react-chartjs-2";

import quizz from "../quizz.json";

class PolarChart extends React.Component {
  render() {
    const options = {
      legend: {
        display: true,
        position: "bottom",
      },
      borderWidth: 10,
      scale: {
        r: {},
        ticks: {
          suggestedMin: 0,
          suggestedMax: 20,
          display: false,
        },
        gridLines: {
          circular: true,
          lineWidth: 1,
        },
      },
    };
    const PolarCharts = this.props.data?.map((partyScores, index) => {
      const scores = partyScores.map((score) => score.score);
      const themes = this.props.data[0]?.map((theme) => {
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
          <ChartContainer>
            <Polar data={data} options={options} key={index} />
          </ChartContainer>
        </>
      );
    });

    return <Container>{PolarCharts}</Container>;
  }
}

const Container = styled.div`
  display: flex;
  width: 500px;
`;

const ChartContainer = styled.div`
  border: 1px solid white;
`;

export default PolarChart;
