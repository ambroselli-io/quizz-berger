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
    selectedCandidates: [],
    // selectedThemes: [],
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
      const candidates = candidatesResponse.data.map((c) => c.pseudo);
      this.setState({
        userAnswers: response.data,
        candidatesAnswers: candidatesResponse.data,
        selectedCandidates: candidates,
      });
    }
  };

  switchCharts = () => {
    this.setState(({ showRadarChart }) => ({
      showRadarChart: !showRadarChart,
    }));
  };

  setSelectedCandidate = (e) => {
    const { selectedCandidates } = this.state;
    const onSelectedCandidate = selectedCandidates.find(
      (c) => c === e.target.dataset.candidate
    );

    if (!onSelectedCandidate) {
      this.setState({
        selectedCandidates: [...selectedCandidates, e.target.dataset.candidate],
      });
      console.log(e.target.dataset.candidate, "added to selected candidates");
    } else {
      const onDeleteSelectedCandidate = selectedCandidates.filter((c) => {
        return c !== e.target.dataset.candidate;
      });

      this.setState({ selectedCandidates: onDeleteSelectedCandidate });

      console.log(onDeleteSelectedCandidate);
    }
  };

  setDefaultSelectedCandidates = () => {
    // getCandidatesScorePerThemes(userAnswers, candidatesAnswers).map((c) => {
    //   console.log(c);
    // });
    console.log(this.state);
    // selectedCandidates: [...selectedCandidates, e.target.dataset.candidate],
  };

  render() {
    const {
      userAnswers,
      candidatesAnswers,
      showRadarChart,
      selectedCandidates,
    } = this.state;

    const candidatesScorePerThemes = getCandidatesScorePerThemes(
      userAnswers,
      candidatesAnswers
    );

    return (
      <>
        <Header {...this.props} />
        <BackgroundContainer>
          <SwitchButtons onClick={this.switchCharts}>
            Changer de graphique
          </SwitchButtons>
          <Container>
            <LeftContainer>
              <Title>Vos résultats</Title>
              <SubTitle>Selectionnez vos candidats</SubTitle>
              <p>
                Selectionnez les candidats que vous souhaitez comparer à vos
                idées
              </p>
              <CandidateButtonContainer>
                {candidatesScorePerThemes.map((candidate) => (
                  <CandidateButton
                    key={candidate[0].pseudo}
                    data-candidate={candidate[0].pseudo}
                    isActive={
                      !!selectedCandidates.find(
                        (c) => c === candidate[0].pseudo
                      )
                    }
                    onClick={this.setSelectedCandidate}
                  >
                    {candidate[0].pseudo}
                  </CandidateButton>
                ))}
              </CandidateButtonContainer>
            </LeftContainer>
            <ChartsContainer>
              {showRadarChart && (
                <RadarChart
                  selectedCandidates={selectedCandidates}
                  candidatesScorePerThemes={candidatesScorePerThemes}
                />
              )}
              {!showRadarChart &&
                candidatesScorePerThemes.map((partyScores) => {
                  const isActive = !!selectedCandidates.find(
                    (c) => c === partyScores[0].pseudo
                  );

                  if (isActive) {
                    return (
                      <PolarChart
                        partyScores={partyScores}
                        candidatesScorePerThemes={candidatesScorePerThemes}
                        isActive={
                          !!selectedCandidates.find(
                            (c) => c === partyScores[0].pseudo
                          )
                        }
                      />
                    );
                  }
                })}
            </ChartsContainer>
          </Container>
        </BackgroundContainer>
      </>
    );
  }
}

const BackgroundContainer = styled.div`
  padding: 80px 80px 0 80px;
`;

const SwitchButtons = styled.div`
  margin: 0 auto 40px auto;
  padding: 5px;
  display: inline-block;
  width: auto;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 50px;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  /* position: sticky;
  top: 0px;
  height: 100vw; */
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

const CandidateButtonContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 12px;
`;

const CandidateButton = styled.button`
  padding: 0 15px;
  height: 40px;
  background-color: ${(props) => (props.isActive ? "#111827" : "white")};
  color: ${(props) => (props.isActive ? "white" : "#111827")};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
`;

const ChartsContainer = styled.div``;

export default Result;
