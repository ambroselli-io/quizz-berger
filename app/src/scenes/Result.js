import React from "react";
import styled from "styled-components";
import { getCandidatesScorePerThemes } from "../utils/score";
import { media } from "../styles/mediaQueries";
import quizz from "../quizz.json";

import RadarChart from "../components/RadarChart";
import PolarChart from "../components/PolarChart";
import API from "../services/api";

import infoIcon from "../images/info.svg";

class Result extends React.Component {
  state = {
    userAnswers: [],
    candidatesAnswers: [],
    showRadarChart: false,
    selectedCandidates: [],
    selectedThemes: [],
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
        selectedThemes: this.props.user.themes,
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
    const onSelectedCandidate = selectedCandidates.find((c) => c === e.target.dataset.candidate);

    if (!onSelectedCandidate) {
      this.setState({
        selectedCandidates: [...selectedCandidates, e.target.dataset.candidate],
      });
    } else {
      const onDeleteSelectedCandidate = selectedCandidates.filter((c) => {
        return c !== e.target.dataset.candidate;
      });

      this.setState({ selectedCandidates: onDeleteSelectedCandidate });
    }
  };

  setSelectedThemes = (e) => {
    const { selectedThemes } = this.state;
    const onSelectedThemes = selectedThemes.find((t) => t === e.target.dataset.themeid);

    if (!onSelectedThemes) {
      this.setState({
        selectedThemes: [...selectedThemes, e.target.dataset.themeid],
      });
    } else {
      const onDeleteSelectedTheme = selectedThemes.filter((t) => {
        return t !== e.target.dataset.themeid;
      });

      this.setState({ selectedThemes: onDeleteSelectedTheme });
    }
  };

  render() {
    const { userAnswers, candidatesAnswers, showRadarChart, selectedCandidates, selectedThemes } =
      this.state;

    const { user } = this.props;

    const candidatesScorePerThemes = getCandidatesScorePerThemes(userAnswers, candidatesAnswers);

    return (
      <>
        <BackgroundContainer>
          <SwitchButtons onClick={this.switchCharts}>Changer de graphique</SwitchButtons>
          <Container>
            <LeftContainer>
              <TitleContainer>
                <Title>Vos résultats</Title>
                <InfoIcon src={infoIcon}></InfoIcon>
              </TitleContainer>

              {window.screen.width > 768 && (
                <>
                  <SubTitle>Selectionnez vos candidats</SubTitle>
                  <p>Selectionnez les candidats que vous souhaitez comparer à vos idées</p>
                  <CandidateButtonContainer>
                    {candidatesScorePerThemes.map((candidate) => (
                      <CandidateButton
                        key={candidate[0].pseudo}
                        data-candidate={candidate[0].pseudo}
                        isActive={!!selectedCandidates.find((c) => c === candidate[0].pseudo)}
                        onClick={this.setSelectedCandidate}>
                        {candidate[0].pseudo}
                      </CandidateButton>
                    ))}
                  </CandidateButtonContainer>
                  {!showRadarChart && (
                    <>
                      <SubTitle> Selectionnez les thèmes à afficher</SubTitle>
                      <CandidateButtonContainer>
                        {user.themes.map((userT) => {
                          const theme = quizz.find((t) => t._id === userT);
                          return (
                            <CandidateButton
                              key={userT}
                              data-themeid={theme._id}
                              isActive={!!selectedThemes.find((c) => c === theme._id)}
                              onClick={this.setSelectedThemes}>
                              {theme.fr}
                            </CandidateButton>
                          );
                        })}
                      </CandidateButtonContainer>
                    </>
                  )}
                </>
              )}

              {window.screen.width <= 768 && (
                <>
                  <SubTitle>
                    Cliquez ici pour modifier les candidats et les thèmes a afficher
                  </SubTitle>
                </>
              )}
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
                  return (
                    <PolarChart
                      key={partyScores[0].pseudo}
                      selectedThemes={selectedThemes}
                      partyScores={partyScores}
                      candidatesScorePerThemes={candidatesScorePerThemes}
                      isActive={!!selectedCandidates.find((c) => c === partyScores[0].pseudo)}
                    />
                  );
                })}
            </ChartsContainer>
          </Container>
        </BackgroundContainer>
      </>
    );
  }
}

const BackgroundContainer = styled.div`
  padding: 80px 10px 0 10px;
  ${media.mobile`
  padding: 40px 10px 1px 10px;
`}
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
  ${media.mobile`
  display: none;
`}
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 20px;
  justify-content: space-between;
  ${media.mobile`
    display: block;
`}
`;

const LeftContainer = styled.div`
  > p {
    margin-bottom: 20px;
    font-size: 16px;
    color: #111827;
  }
`;

const TitleContainer = styled.div`
  margin-bottom: 60px;
  display: flex;
  align-items: center;
  ${media.mobile`
  margin-bottom: 30px;
`}
`;

const Title = styled.h2`
  font-family: Merriweather;
  font-weight: bold;
  font-size: 30px;
  color: #082d0f;
`;

const InfoIcon = styled.img`
  margin-left: 10px;
  width: 20px;
  height: auto;
  cursor: pointer;
`;

const SubTitle = styled.h3`
  margin-bottom: 20px;
  font-family: Merriweather;
  font-weight: bold;
  font-size: 20px;
  color: #111827;
`;

const CandidateButtonContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid green;
  display: flex;
  flex-flow: row wrap;
  grid-gap: 12px;
`;

const CandidateButton = styled.button`
  padding: 8px 15px;
  width: auto;
  height: auto;
  max-height: 55px;
  /* flex-shrink: 0; */
  background-color: ${(props) => (props.isActive ? "#111827" : "white")};
  color: ${(props) => (props.isActive ? "white" : "#111827")};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
`;

const ChartsContainer = styled.div``;

export default Result;
