import React from "react";
import styled from "styled-components";
import { Radar } from "react-chartjs-2";
import quizz from "../quizz.json";
import { Redirect } from "react-router-dom";

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

    const dataSets = this.props.data?.map((partyScores, index) => {
      const scores = partyScores.map((score) => score.score);
      console.log(partyScores);

      return {
        label: partyScores[0].politicalParty,
        hidden: false,
        backgroundColor: "rgba(255, 99, 132, 0.1)",
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
        display: false,
      },
      borderWidth: 10,
      scale: {
        r: {
          suggestedMin: 0,
          suggestedMax: 20,
        },
        ticks: {
          fontSize: 18,
          max: 100,
        },
        gridLines: {
          lineWidth: 2,
          color: "lightgreen",
        },
        pointLabels: {
          fontSize: 18,
          fontStyle: "bold",
        },
      },
    };

    // new Chart(document.getElementById("radar-chart"), {

    // });

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
