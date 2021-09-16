import React from "react";
import styled from "styled-components";
import { getCandidatesScorePerThemes } from "../utils/score";

import Header from "../components/Header";
import RadarChart from "../components/RadarChart";
import PolarChart from "../components/PolarChart";
import API from "../services/api";

class Result extends React.Component {
  state = {
    userAnswers: [],
    candidatesAnswers: [],
    showRadarChart: true,
  };

  componentDidMount() {
    this.getAnswers();
  }

  getAnswers = async () => {
    const response = await API.getWithCreds({ path: "/answer" });
    const candidatesResponse = await API.getWithCreds({
      path: "/answer/candidates",
    });

    if (response.ok) {
      this.setState({
        userAnswers: response.data,
        candidatesAnswers: candidatesResponse.data,
      });
    }
  };

  switchCharts = () => {
    this.setState(({ showRadarChart }) => ({
      showRadarChart: !showRadarChart,
    }));
  };

  render() {
    const { userAnswers, candidatesAnswers, showRadarChart } = this.state;

    return (
      <>
        <Header user={this.props.user} />
        <BackgroundContainer>
          <SwitchButtons onClick={this.switchCharts}>
            Changer de graphique
          </SwitchButtons>
          <SelectCandidatContainer>
            {showRadarChart && (
              <RadarChart
                candidatesScorePerThemes={getCandidatesScorePerThemes(
                  userAnswers,
                  candidatesAnswers
                )}
              />
            )}
            {!showRadarChart && (
              <PolarChart
                candidatesScorePerThemes={getCandidatesScorePerThemes(
                  userAnswers,
                  candidatesAnswers
                )}
              />
            )}
          </SelectCandidatContainer>
        </BackgroundContainer>
      </>
    );
  }
}

const BackgroundContainer = styled.div`
  padding: 160px 80px 0 80px;
  height: 100vh;
`;

const SwitchButtons = styled.div`
  margin: 0 auto 40px auto;
  padding: 5px;
  display: inline-block;
  width: auto;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 14px;
`;

const SelectCandidatContainer = styled.div``;

export default Result;
