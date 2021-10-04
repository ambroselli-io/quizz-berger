import React from "react";
import styled from "styled-components";
import { getCandidatesScorePerThemes } from "../utils/score";
import { media } from "../styles/mediaQueries";
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
    showCandidates: true,
    showThemes: true,
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
        candidatesAnswers: candidatesResponse.data.sort(() =>
          Math.random() > 0.5 ? -1 : 1
        ),
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

  setSelectedCandidates = (e) => {
    const { selectedCandidates } = this.state;
    const candidate = e.target.dataset.candidate;

    if (!selectedCandidates.find((c) => c === candidate)) {
      this.setState({
        selectedCandidates: [...selectedCandidates, candidate],
      });
    } else {
      this.setState({
        selectedCandidates: selectedCandidates.filter((c) => c !== candidate),
      });
    }
  };

  setSelectedThemes = (e) => {
    const { selectedThemes } = this.state;
    const themeId = e.target.dataset.themeid;

    if (!selectedThemes.find((t) => t === themeId)) {
      this.setState({ selectedThemes: [...selectedThemes, themeId] });
    } else {
      this.setState({
        selectedThemes: selectedThemes.filter((t) => t !== themeId),
      });
    }
  };

  render() {
    const {
      userAnswers,
      candidatesAnswers,
      showRadarChart,
      selectedCandidates,
      selectedThemes,
      showCandidates,
      showThemes,
    } = this.state;

    const { user, quizz } = this.props;

    const candidatesScorePerThemes = getCandidatesScorePerThemes(
      userAnswers.filter((a) => selectedThemes.includes(a.themeId)),
      candidatesAnswers.map((c) => ({
        ...c,
        answers: c.answers.filter((a) => selectedThemes.includes(a.themeId)),
      })),
      quizz
    );

    return (
      <>
        <BackgroundContainer>
          <Container>
            <LeftContainerBlock />
            <LeftContainer>
              <SwitchButtons onClick={this.switchCharts}>
                Changer de graphique
              </SwitchButtons>
              <TitleContainer>
                <Title>
                  {user.pseudo.charAt(0).toUpperCase() + user.pseudo.slice(1)},
                  voici vos résultats
                </Title>
                {/* <InfoIcon src={infoIcon}></InfoIcon> */}
              </TitleContainer>
              <OpenButtonContainer>
                <SubTitle>Selectionnez vos candidats</SubTitle>
                <OpenButton
                  onClick={() =>
                    this.setState((prevState) => ({
                      showCandidates: !prevState.showCandidates,
                    }))
                  }
                  isActive={showCandidates}
                >
                  &#9664;
                </OpenButton>
              </OpenButtonContainer>
              <CandidateButtonContainer isActive={showCandidates}>
                {candidatesScorePerThemes.map((candidate) => (
                  <CandidateButton
                    key={candidate?.pseudo}
                    data-candidate={candidate?.pseudo}
                    isActive={
                      !!selectedCandidates.find((c) => c === candidate?.pseudo)
                    }
                    onClick={this.setSelectedCandidates}
                  >
                    {candidate?.pseudo}
                  </CandidateButton>
                ))}
              </CandidateButtonContainer>
              <OpenButtonContainer>
                <SubTitle> Selectionnez les thèmes à afficher</SubTitle>
                <OpenButton
                  onClick={() =>
                    this.setState((prevState) => ({
                      showThemes: !prevState.showThemes,
                    }))
                  }
                  isActive={showThemes}
                >
                  &#9664;
                </OpenButton>
              </OpenButtonContainer>
              <ThemeButtonContainer isActive={showThemes}>
                {user.themes.map((userT) => {
                  const theme = quizz.find((t) => t._id === userT);
                  return (
                    <CandidateButton
                      key={userT}
                      data-themeid={theme._id}
                      isActive={!!selectedThemes.find((c) => c === theme._id)}
                      onClick={this.setSelectedThemes}
                    >
                      {theme.fr}
                    </CandidateButton>
                  );
                })}
              </ThemeButtonContainer>
            </LeftContainer>
            <ChartsContainer>
              {showRadarChart && (
                <RadarChart
                  key={`${selectedCandidates.length}-${selectedThemes.length}`}
                  selectedCandidates={selectedCandidates}
                  selectedThemes={selectedThemes}
                  candidatesScorePerThemes={candidatesScorePerThemes}
                  quizz={quizz}
                />
              )}
              {!showRadarChart &&
                candidatesScorePerThemes
                  .filter((candidate) =>
                    selectedCandidates.includes(candidate?.pseudo)
                  )
                  .map((candidate) => {
                    return (
                      <PolarChart
                        quizz={quizz}
                        key={`${candidate?.pseudo}-${selectedCandidates.length}-${selectedThemes.length}`}
                        selectedThemes={selectedThemes}
                        candidate={candidate}
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

const SwitchButtonsContainer = styled.div`
  margin: 0 auto;
  max-width: 1024px;
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
  border: 1px solid red;
  margin: 0 auto;
  max-width: 1024px;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  justify-content: space-between;
  ${media.mobile`
    display: block;
`}
`;

const LeftContainerBlock = styled.div`
  max-width: 500px;
  ${media.mobile`
    display: none;
`}
`;

const LeftContainer = styled.div`
  position: fixed;
  > p {
    margin-bottom: 20px;
    font-size: 16px;
    color: #111827;
  }
  ${media.mobile`
  position: relative;
`}
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

const OpenButtonContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const SubTitle = styled.h3`
  font-family: Merriweather;
  font-weight: bold;
  font-size: 20px;
  color: #111827;
  ${media.mobile`
  font-size: 16px;
`}
`;

const OpenButton = styled.button`
  margin-left: 10px;
  border: none;
  background-color: transparent;
  transform: ${(props) => (props.isActive ? "rotate(-90deg)" : "none")};
  transition: transform 0.1s linear;
  cursor: pointer;
`;

const CandidateButtonContainer = styled.div`
  max-width: 500px;
  width: auto;
  margin-bottom: 20px;
  display: ${(props) => (props.isActive ? "flex" : "none")};
  grid-template-columns: auto auto auto;
  flex-flow: row wrap;
  grid-gap: 12px;
`;

const ThemeButtonContainer = styled.div`
  margin-bottom: 20px;
  display: ${(props) => (props.isActive ? "flex" : "none")};
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

const ChartsContainer = styled.div`
  /* margin-left: 600px; */
  /* width: 410px;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden; */
`;

export default Result;
