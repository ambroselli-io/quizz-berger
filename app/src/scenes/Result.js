/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getCandidatesScorePerThemes } from "../utils/score";
import { media, minMedia } from "../styles/mediaQueries";
import UserContext from "../contexts/user";
import DataContext from "../contexts/data";
import { getFromSessionStorage, setToSessionStorage } from "../utils/storage";
import ModalLogin from "../components/ModalLogin";
import ModalShare from "../components/ModalShare";
import { useHistory, useParams } from "react-router";
import API from "../services/api";
import Loader from "../components/Loader";
import InternalLink from "../components/InternalLink";
import getUserThemes from "../utils/getUserThemes";
import Podium from "../components/Podium";

const Result = () => {
  const userContext = useContext(UserContext);
  const { quizz, candidates /* getCandidates */ } = useContext(DataContext);
  const { userPseudo } = useParams();
  const history = useHistory();
  const [publicUser, setPublicUser] = useState({});
  const [publicUserAnswers, setPublicUserAnswers] = useState([]);

  const publicPage = !!userPseudo;

  const user = publicPage ? publicUser : userContext.user;
  const userAnswers = publicPage ? publicUserAnswers : userContext.userAnswers;

  const userThemes = getUserThemes(userAnswers);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCandidates, setShowCandidates] = useState(
    Boolean(getFromSessionStorage("selectedCandidates", false))
  );
  const [showThemes, setShowThemes] = useState(
    Boolean(getFromSessionStorage("selectedThemes", false))
  );

  const allCandidates = candidates.map((c) => c.pseudo);
  const [selectedCandidates, setSelectedCandidates] = useState(() => {
    if (publicPage) return allCandidates;
    return getFromSessionStorage("selectedCandidates", allCandidates);
  });
  const [selectedThemes, setSelectedThemes] = useState(() => {
    const allThemes = userThemes;
    if (publicPage) return allThemes;
    const previousThemesSelected = getFromSessionStorage("selectedThemes", []);
    if (!previousThemesSelected.length) return allThemes;
    if (userThemes.length !== previousThemesSelected.length) return previousThemesSelected;
    return allThemes;
  });

  const onSelectCandidates = (e) => {
    const pseudo = e.target.dataset.pseudo;

    if (!selectedCandidates.find((p) => p === pseudo)) {
      setSelectedCandidates([...selectedCandidates, pseudo]);
    } else {
      setSelectedCandidates(selectedCandidates.filter((c) => c !== pseudo));
    }
  };
  const onSelectThemes = (e) => {
    const themeId = e.target.dataset.themeid;
    if (selectedThemes.includes(themeId)) {
      setSelectedThemes(selectedThemes.filter((id) => id !== themeId));
    } else {
      setSelectedThemes([...selectedThemes, themeId]);
    }
  };

  const candidatesScorePerThemes = getCandidatesScorePerThemes(
    userAnswers.filter((a) => selectedThemes.includes(a.themeId)),
    candidates.map((c) => ({
      ...c,
      answers: c.answers.filter((a) => selectedThemes.includes(a.themeId)),
    })),
    quizz
  );

  const candidatesScore = candidatesScorePerThemes.map((c) => ({
    _id: c._id,
    pseudo: c.pseudo,
    total: c.total,
    totalMax: c.totalMax,
  }));

  const filteredCandidatesScorePerThemes = candidatesScorePerThemes.filter((candidate) =>
    selectedCandidates.includes(candidate?.pseudo)
  );

  useEffect(() => {
    if (candidates.map((c) => c.pseudo).length !== selectedCandidates.length) {
      setToSessionStorage("selectedCandidates", selectedCandidates);
    } else {
      window.sessionStorage.removeItem("selectedCandidates");
    }
  }, [selectedCandidates.length]);

  useEffect(() => {
    if (userThemes.length !== selectedThemes.length) {
      setToSessionStorage("selectedThemes", selectedThemes);
    } else {
      window.sessionStorage.removeItem("selectedThemes");
    }
  }, [selectedThemes.length]);

  const getPublicUser = async () => {
    const publicUserResponse = await API.get({ path: `/user/${userPseudo}` });
    if (!publicUserResponse.ok) return history.push("/home");
    setPublicUser(publicUserResponse.data);
    const publicUserAnswersResponse = await API.get({ path: `/answer/${userPseudo}` });
    if (!publicUserAnswersResponse.ok) return history.push("/home");
    setSelectedThemes(getUserThemes(publicUserAnswersResponse.data));
    setPublicUserAnswers(publicUserAnswersResponse.data);
    setSelectedCandidates(allCandidates);
  };

  useEffect(() => {
    if (userPseudo) getPublicUser();
  }, [userPseudo]);

  useEffect(() => {
    if (userPseudo) setSelectedCandidates(allCandidates);
  }, [candidates.length]);

  const renderTitle = () => {
    if (!publicPage && !user?.pseudo) return "Voici vos résultats";
    const name = user?.pseudo?.charAt(0).toUpperCase() + user?.pseudo?.slice(1);
    if (!!publicPage) {
      return `Voici les résultats de ${name}`;
    }
    return `${name}, voici vos résultats`;
  };

  const isLoading = !!publicPage && !user?.pseudo;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <BackgroundContainer>
        <Container>
          <Title>{renderTitle()}</Title>
          {!publicPage && (
            <SaveContainer>
              {!user?.pseudo && (
                <>
                  <SaveButton
                    onClick={() => {
                      setShowLoginModal(true);
                      document.body.style.overflow = "hidden";
                    }}>
                    Enregistrer
                  </SaveButton>
                  <Tiret />
                </>
              )}
              <SaveButton
                onClick={() => {
                  if (!user?.pseudo) setShowLoginModal(true);
                  setShowShareModal(true);
                  document.body.style.overflow = "hidden";
                }}>
                Partager
              </SaveButton>
            </SaveContainer>
          )}
        </Container>
        <PodiumContainer>
          <Podium fullHeight candidatesScore={candidatesScore} />
        </PodiumContainer>
        <div>
          <Title>Aller plus loin</Title>
        </div>
        <ChartsContainer>
          <LeftContainer>
            <OpenButtonContainer onClick={() => setShowCandidates((show) => !show)}>
              <OpenButton isActive={showCandidates}>&#9654;</OpenButton>
              <SubTitle>Afficher/masquer des candidats</SubTitle>
            </OpenButtonContainer>
            <CandidateButtonContainer isActive={showCandidates}>
              {candidatesScorePerThemes.map((candidate) => (
                <ButtonStyled
                  key={candidate?.pseudo}
                  data-pseudo={candidate?.pseudo}
                  isActive={!!selectedCandidates.find((c) => c === candidate?.pseudo)}
                  onClick={onSelectCandidates}>
                  {candidate?.pseudo}
                </ButtonStyled>
              ))}
            </CandidateButtonContainer>
            <OpenButtonContainer onClick={() => setShowThemes((show) => !show)}>
              <OpenButton isActive={showThemes}>&#9654;</OpenButton>
              <SubTitle>Afficher/masquer des thèmes</SubTitle>
            </OpenButtonContainer>
            <ThemeButtonContainer isActive={showThemes}>
              {userThemes.map((userThemeId) => {
                const theme = quizz.find((t) => t._id === userThemeId);
                return (
                  <ButtonStyled
                    key={userThemeId}
                    data-themeid={theme._id}
                    backgroundColor={theme.backgroundColor}
                    isActive={!!selectedThemes.find((c) => c === theme._id)}
                    onClick={onSelectThemes}>
                    {theme.fr}
                  </ButtonStyled>
                );
              })}
            </ThemeButtonContainer>
          </LeftContainer>
          <RightContainer>
            {selectedThemes
              .map((themeId) => ({
                themeId,
                candidatesScore: filteredCandidatesScorePerThemes?.map((c) => ({
                  _id: c._id,
                  pseudo: c.pseudo,
                  total: c.scorePerThemes?.find((score) => themeId === score.themeId)?.percent,
                  totalMax: 100,
                })),
              }))
              .map(({ candidatesScore, themeId }) => (
                <ThemePodiumContainer key={themeId}>
                  <Podium
                    candidatesScore={candidatesScore}
                    noPadding
                    fullHeight
                    title={quizz.find((quizztheme) => quizztheme._id === themeId).fr}
                  />
                </ThemePodiumContainer>
              ))}
          </RightContainer>
        </ChartsContainer>
      </BackgroundContainer>
      <Loader isLoading={isLoading} withBackground />
      <ModalShare
        isActive={showShareModal}
        onCloseModal={(e) => {
          if (e?.target !== e?.currentTarget) return;
          setShowShareModal(false);
          document.body.style.overflow = "visible";
        }}
      />
      <ModalLogin
        title={showShareModal ? "Enregistrez vos résultats d'abord" : "Enregistrez-vous"}
        isActive={showLoginModal}
        onForceCloseModal={(e) => {
          setShowLoginModal(false);
          document.body.style.overflow = "visible";
        }}
        onCloseModal={(e) => {
          if (e.target !== e.currentTarget) return;
          setShowLoginModal(false);
          setShowShareModal(false);
          document.body.style.overflow = "visible";
        }}
      />
    </>
  );
};

const BackgroundContainer = styled.div`
  padding: 80px 10px 0 10px;
  ${minMedia.desktop`
    height: calc(100vh - 80px);
    overflow-x: hidden;
    overflow-y: auto;
  `}
  ${media.mobile`
    padding: 3vh 10px 1px 10px;
  `}

  > div {
    margin: 0 auto 2vh;
    max-width: 1024px;
  }
  > section {
    margin: 0 -10px;
  }
`;

const Container = styled.div`
  /* height: 80%; */
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${minMedia.desktop`
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  `}
  ${media.mobile`
    flex-direction: column;
`}
`;

const LeftContainer = styled.div`
  position: relative;
  > p {
    margin-bottom: 20px;
    font-size: 16px;
    color: #111827;
  }
  ${minMedia.desktop`
  width: 50%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  `}
  ${media.mobile`
      width: 100%;
  `}
`;

const Title = styled.h2`
  font-family: Merriweather;
  font-weight: bold;
  font-size: 30px;
  color: #082d0f;
  margin-bottom: 5px;
`;

const ThemePodiumContainer = styled.div`
  height: max(15vh, 400px);
  width: 100%;
`;

const OpenButtonContainer = styled.button`
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const SubTitle = styled.h3`
  font-family: Merriweather;
  font-weight: bold;
  font-size: 20px;
  text-align: left;
  color: #111827;
  ${media.mobile`
  font-size: 16px;
`}
`;

const PodiumContainer = styled.section`
  height: 50vh;
  margin-bottom: 5vh !important;
`;

const OpenButton = styled.span`
  margin-right: 10px;
  border: none;
  background-color: transparent;
  transform: ${(props) => (props.isActive ? "rotate(90deg)" : "none")};
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

const getBackgroundColor = ({ backgroundColor, isActive }) => {
  if (!!backgroundColor) {
    return `${backgroundColor}${isActive ? "CC" : "00"}`;
  }
  return isActive ? "#111827" : "white";
};

const getColor = ({ backgroundColor, isActive }) => {
  if (!!backgroundColor) {
    return isActive ? "#111827" : backgroundColor;
  }
  return isActive ? "white" : "#111827";
};

const getBorderColor = ({ backgroundColor, isActive }) => {
  if (!!backgroundColor) return backgroundColor;
  return "#111827";
};

const ButtonStyled = styled.button`
  padding: 8px 15px;
  width: auto;
  height: auto;
  max-height: 55px;
  /* flex-shrink: 0; */
  background-color: ${getBackgroundColor};
  color: ${getColor};
  border: 1px solid ${getBorderColor};
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
`;

const RightContainer = styled.div`
  ${minMedia.desktop`
  width: 50%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  `}
`;

const SaveContainer = styled.div`
  display: flex;
  align-items: center;
  > :first-child {
    margin-right: 5px;
  }
  > :nth-child(3) {
    margin-left: 5px;
  }
`;

const Tiret = styled.div`
  height: 1px;
  background-color: #111827;
  width: 10px;
`;

const SaveButton = styled(InternalLink)`
  font-size: 0.9em;
`;

export default Result;
