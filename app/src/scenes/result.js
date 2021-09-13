import React from "react";
import styled from "styled-components";
import { getCandidatesScorePerThemes } from "../utils/score";

import Header from "../components/Header";
// import RadarChart from "../components/RadarChart";
// import PolarChart from "../components/PolarChart";
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
    const candidatesResponse = await API.getWithCreds({ path: "/answer/candidates" });

    if (response.ok) {
      this.setState({
        userAnswers: response.data,
        candidatesAnswers: candidatesResponse.data,
      });
    }
  };

  switchCharts = () => {
    this.setState(({ showRadarChart }) => ({ showRadarChart: !showRadarChart }));
  };

  render() {
    const { userAnswers, candidatesAnswers, showRadarChart } = this.state;

    return (
      <>
        <Header />
        <BackgroundContainer>
          <SwitchButtons onClick={this.switchCharts}>
            <RadarButton showRadarChart={showRadarChart}>Radar</RadarButton>
            <PolarButton showRadarChart={showRadarChart}>Polar</PolarButton>
          </SwitchButtons>
          {/* Tab: un chart avec tous les partis */}
          <SelectCandidatContainer>
            <LeftContainer>
              <Title>Vos résultats</Title>
              <SubTitle>Selectionnez vos candidats</SubTitle>
              <p>Selectionnez les candidats que vous souhaitez comparer à vos idées</p>
              <CandidatButtonContainer>
                <CandidatButton>Rassemblement National</CandidatButton>
                <CandidatButton>La France Insoumise</CandidatButton>
                <CandidatButton>La République en Marche !</CandidatButton>
              </CandidatButtonContainer>
            </LeftContainer>
            {/* showRadarChart && (
              <RadarChart
                data={getCandidatesScorePerThemes(userAnswers, candidatesAnswers)}
              />
            )}
            {!showRadarChart && (
              <PolarChart
                data={getCandidatesScorePerThemes(userAnswers, candidatesAnswers)}
              />
            ) */}
          </SelectCandidatContainer>
          {/* Tab: un chart par parti */}
        </BackgroundContainer>
      </>
    );
  }
}

const BackgroundContainer = styled.div`
  padding: 40px;
  min-height: 100vh;
  width: 100vw;
  background-color: #f7df1e;
`;

const SwitchButtons = styled.div`
  margin: 0 auto 40px auto;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 5px;
`;

const RadarButton = styled.button`
  width: 100%;
  display: block;
  background-color: ${(props) => (props.showRadarChart ? "#f7df1e" : "black")};
  color: ${(props) => (props.showRadarChart ? "black" : "white")};
  border: none;
  cursor: pointer;
`;

const PolarButton = styled.button`
  width: 100%;
  display: block;
  background-color: ${(props) => (props.showRadarChart ? "black" : "#f7df1e")};
  color: ${(props) => (props.showRadarChart ? "white" : "black")};
  border: none;
  cursor: pointer;
`;

const SelectCandidatContainer = styled.div`
  display: flex;
`;

const LeftContainer = styled.div``;

const Title = styled.h2`
  margin-bottom: 40px;
`;

const SubTitle = styled.h3`
  margin-bottom: 10px;
`;

const CandidatButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CandidatButton = styled.button`
  padding: 5px 8px;
  border: 1px solid grey;
  border-radius: 5px;
  background-color: transparent;
  font-weight: 700;
`;
export default Result;
