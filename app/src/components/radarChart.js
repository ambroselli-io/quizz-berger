import React from "react";
import styled from "styled-components";
import { Radar } from "react-chartjs-2";
import { getPartysScores } from "../utils/score";

class RadarChart extends React.Component {
  render() {
    const colors = [
      {
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        pointBackgroundColor: "black",
        borderColor: "black",
      },
      {
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        pointBackgroundColor: "red",
        borderColor: "red",
      },
      {
        backgroundColor: "rgba(255, 99, 132, 0.1)",
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

    const dataSets = this.props.data.map((partyScores, index) => {
      const scores = partyScores.map((score) => score.score);

      return {
        label: "nom du parti",
        hidden: false,
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        pointBackgroundColor: colors[index].pointBackgroundColor,
        borderColor: colors[index].borderColor,
        borderWidth: 1,
        data: scores,
      };
    });

    const data = {
      datasets: dataSets,
      labels: ["Theme 1", "Theme 2", "Theme 3"],
    };

    const options = {
      responsive: true,
      legend: {
        position: "top",
      },
      scale: {
        title: {
          //   display: false,
          padding: 10,
        },
        r: {
          suggestedMin: 0,
          suggestedMax: 20,
        },
        reverse: false,
        gridLines: {
          color: [
            "black",
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "indigo",
            "violet",
          ],
        },
        ticks: {
          beginAtZero: true,
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
  height: 500px;
  width: 500px;
`;

export default RadarChart;
