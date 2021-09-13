import React from "react";
import styled from "styled-components";
import { getPartysScores } from "../utils/score";

import Header from "../components/header";
import RadarChart from "../components/radarChart";
import PolarChart from "../components/PolarChart";

class Result extends React.Component {
  state = {
    userResults: [],
    politicalPartys: [],
    orderedPoliticalPartysResults: [],
    showRadarChart: true,
  };

  componentDidMount() {
    this.getResult();
  }

  getResult = async () => {
    const response = await fetch("http://127.0.0.1:8080/user/result", {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());

    if (response.ok) {
      this.setState({
        userResults: response.data.userResults,
        politicalPartys: response.data.politicalPartys,
        orderedPoliticalPartysResults:
          response.data.orderedPoliticalPartyResults,
      });
    }
  };

  switchResult = () => {
    if (this.state.showRadarChart === true) {
      this.setState({ showRadarChart: false });
    } else {
      this.setState({ showRadarChart: true });
    }
  };

  render() {
    const { userResults, politicalPartys, orderedPoliticalPartysResults } =
      this.state;

    return (
      <>
        <Header />
        <BackgroundContainer>
          <SwitchButtons onClick={this.switchResult}>
            <RadarButton showRadarChart={this.state.showRadarChart}>
              Radar
            </RadarButton>
            <PolarButton showRadarChart={this.state.showRadarChart}>
              Polar
            </PolarButton>
          </SwitchButtons>
          {/* Tab: un chart avec tous les partis */}
          <SelectCandidatContainer>
            <LeftContainer>
              <Title>Vos résultats</Title>
              <SubTitle>Selectionnez vos candidats</SubTitle>
              <p>
                Selectionnez les candidats que vous souhaitez comparer à vos
                idées
              </p>
              <CandidatButtonContainer>
                <CandidatButton>Rassemblement National</CandidatButton>
                <CandidatButton>La France Insoumise</CandidatButton>
                <CandidatButton>La République en Marche !</CandidatButton>
              </CandidatButtonContainer>
            </LeftContainer>
            {this.state.showRadarChart && (
              <RadarChart
                data={getPartysScores(
                  userResults,
                  politicalPartys,
                  orderedPoliticalPartysResults
                )}
              />
            )}
            {!this.state.showRadarChart && (
              <PolarChart
                data={getPartysScores(
                  userResults,
                  politicalPartys,
                  orderedPoliticalPartysResults
                )}
              />
            )}
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
