import React from "react";
import styled from "styled-components";
import { Polar } from "react-chartjs-2";

import quizz from "../quizz.json";

class PolarChart extends React.Component {
  render() {
    const PolarCharts = this.props.data?.map((partyScores, index) => {
      const scores = partyScores.map((score) => score.score);
      const themes = this.props.data[0]?.map((theme) => {
        return quizz.find((quizztheme) => quizztheme._id === theme.themeId).fr;
      });
      console.log(themes);
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
      return <Polar data={data} key={index} />;
    });

    return <Container>{PolarCharts}</Container>;
  }
}

const Container = styled.div`
  width: 500px;
`;

export default PolarChart;
