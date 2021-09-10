import React from "react";
import styled from "styled-components";
import { Radar } from "react-chartjs-2";

import quizz from "../quizz.json";

class RadarChart extends React.Component {
  render() {
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

    const dataSets = this.props.data?.map((partyScores, index) => {
      const scores = partyScores.map((score) => score.score);

      return {
        label: partyScores[0].politicalParty,
        hidden: false,
        backgroundColor: colors[index].backgroundColor,
        pointBackgroundColor: colors[index].pointBackgroundColor,
        borderColor: colors[index].borderColor,
        borderWidth: 1,
        data: scores,
      };
    });

    const themes = this.props.data[0]?.map((theme) => {
      return quizz.find((quizztheme) => quizztheme._id === theme.themeId).fr;
    });

    const data = {
      datasets: dataSets,
      labels: themes,
    };

    const options = {
      legend: {
        display: true,
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

    return (
      <>
        <Container>
          <Radar data={data} options={options} />
        </Container>
      </>
    );
  }
}

const Container = styled.div`
  margin: 0 auto;
  width: 800px;
`;

export default RadarChart;
