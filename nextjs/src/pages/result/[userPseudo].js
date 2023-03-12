/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useRouter } from "next/router";
import Head from "next/head";
import { getCandidatesScorePerThemes, getPicName, getPodium } from "quizz-du-berger-shared";
import { media, minMedia } from "../../styles/mediaQueries";
import { getFromSessionStorage, setToSessionStorage } from "../../utils/storage";
import getUserThemes from "../../utils/getUserThemes";
import API from "../../services/api";
import useUser from "../../hooks/useUser";
import { quizz, quizzQuestions } from "../../utils/quizz";
import useCandidates from "../../hooks/useCandidates";
import useFriends from "../../hooks/useFriends";
import useUserAnswers from "../../hooks/useUserAnswers";
import ModalLogin from "../../components/ModalLogin";
import ModalShare from "../../components/ModalShare";
import Loader from "../../components/Loader";
import Podium from "../../components/Podium";
import QuizzButton from "../../components/QuizzButton";
import Filter from "../../components/Filter";
import Banner from "../../components/Banner";

const Result = ({ publicUser, publicUserAnswers, ogImageName }) => {
  const router = useRouter();
  const { userPseudo } = router.query;
  const { user, mutate } = useUser();
  const { userAnswers } = useUserAnswers();
  const { candidates } = useCandidates();
  const { friends, mutateFriends } = useFriends();

  const publicPage = useMemo(() => {
    if (!userPseudo) return false;
    if (userPseudo === user.pseudo) return false;
    if (!publicUser?.isPublic) return false;
    return true;
  }, [userPseudo, user, publicUser]);

  const userToShow = useMemo(() => {
    if (!publicPage) return user;
    if (userPseudo === user.pseudo) return user;
    return publicUser;
  }, [user, publicUser, publicUserAnswers, publicPage]);

  const answersToShow = useMemo(() => {
    if (userPseudo === user.pseudo) return userAnswers;
    if (publicPage) return publicUserAnswers;
    return userAnswers;
  }, [publicUser, publicUserAnswers, publicPage]);

  // const [isLoading, setIsLoading] = useState(!!userPseudo && !userToShow?.pseudo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(!!userPseudo && !userToShow?.pseudo);
  }, [userPseudo, userToShow?.pseudo]);

  const userThemes = useMemo(() => getUserThemes(answersToShow), [answersToShow]);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFriends, setShowFriends] = useState(() => Boolean(getFromSessionStorage("selectedFriends", false)));

  const showSaveButton = useMemo(() => !publicPage && !userToShow?.pseudo, [publicPage, userToShow]);
  const [hideSaveTip, setHideSaveTip] = useState(() => getFromSessionStorage("hideSaveTip", false));

  const [newFriend, setNewFriend] = useState("");
  const [loadingFriend, setLoadingFriend] = useState(false);
  const [noFriend, setNoFriend] = useState(false);

  const allCandidatesQualified = useMemo(
    () => candidates.map((c) => c.pseudo),
    // () => candidates.filter((c) => ["Emmanuel Macron", "Marine Le Pen"].includes(c.pseudo)).map((c) => c.pseudo),
    [candidates]
  );
  const [showCandidates, setShowCandidates] = useState(false);
  // const [showCandidates, setShowCandidates] = useState(() =>
  //   Boolean(getFromSessionStorage("selectedCandidates", false))
  // );
  // const allCandidates = useMemo(() => candidates.map((c) => c.pseudo), [candidates]);
  const allFriends = useMemo(() => friends.map((c) => c.pseudo), [friends]);

  const [selectedCandidates, setSelectedCandidates] = useState(() => {
    if (publicPage) return allCandidatesQualified;
    return getFromSessionStorage("selectedCandidates", allCandidatesQualified);
  });
  const [selectedFriends, setSelectedFriends] = useState(() => {
    if (publicPage) return [];
    return getFromSessionStorage("selectedFriends", allFriends);
  });

  const selectedThemes = useMemo(() => {
    if (publicUser?.pseudo === user.pseudo) return userThemes;
    if (publicPage) return getUserThemes(publicUserAnswers);
    return userThemes;
  }, [publicUserAnswers, userPseudo, userThemes]);

  const title = useMemo(() => {
    if (!publicPage && !userToShow?.pseudo) return "Voici vos résultats";
    const name = userToShow?.pseudo?.charAt(0).toUpperCase() + userToShow?.pseudo?.slice(1);
    if (!publicPage) return `${name}, voici vos résultats`;
    if (publicUser?.pseudo === user?.pseudo) return `${name}, voici vos résultats`;
    return `Voici les résultats de ${name}`;
  }, [publicPage, userToShow]);

  const onSelectCandidates = (e) => {
    const pseudo = e.target.dataset.pseudo;

    if (!selectedCandidates.find((p) => p === pseudo)) {
      setSelectedCandidates([...selectedCandidates, pseudo]);
    } else {
      setSelectedCandidates(selectedCandidates.filter((c) => c !== pseudo));
    }
  };

  const onSelectFriends = (e) => {
    const pseudo = e.target.dataset.pseudo;

    if (!selectedFriends.find((p) => p === pseudo)) {
      setSelectedFriends([...selectedFriends, pseudo]);
    } else {
      setSelectedFriends(selectedFriends.filter((c) => c !== pseudo));
    }
  };

  console.log({ showCandidates });

  const newFriendTimeout = useRef(null);
  const setNewFriendRequest = async (e) => {
    const newName = e.target.value;
    setNoFriend(null);
    setNewFriend(e.target.value);
    if (newName?.length < 3 || allFriends.includes(newName) || userToShow?.pseudo === newName) {
      setLoadingFriend(false);
      setNoFriend(null);
      return clearTimeout(newFriendTimeout.current);
    }
    newFriendTimeout.current = setTimeout(async () => {
      setNoFriend(null);
      setLoadingFriend(true);
      const response = await API.get({ path: `/user/friends/${newName}` });
      if (response.ok) {
        if (window.confirm(`Voulez-vous ajouter ${response.data.pseudo} à vos amis ?`)) {
          setNoFriend(null);
          setLoadingFriend(true);
          await API.put({
            path: "/user",
            body: { friends: [...(userToShow?.friends || []), response.data._id] },
          });
          setSelectedFriends([...selectedFriends, response.data.pseudo]);
          await mutate();
          await mutateFriends();
          setLoadingFriend(false);
          setNewFriend("");
        } else {
          setLoadingFriend(false);
        }
      } else {
        setLoadingFriend(false);
        if (response.code === "NOT_PUBLIC") {
          alert(`${newName} n'a pas cliqué sur "Partager". Demandez-lui !`);
        } else {
          setNoFriend(newName);
        }
      }
    }, 500);
  };

  const candidatesScorePerThemes = useMemo(
    () =>
      getCandidatesScorePerThemes(
        answersToShow.filter((a) => selectedThemes.includes(a.themeId)),
        candidates.map((c) => ({
          ...c,
          answers: c.answers.filter((a) => selectedThemes.includes(a.themeId)),
        })),
        quizzQuestions
      ),
    [
      JSON.stringify(answersToShow),
      JSON.stringify(selectedThemes),
      JSON.stringify(candidates),
      JSON.stringify(quizzQuestions),
    ]
  );

  const friendsScorePerThemes = useMemo(
    () =>
      getCandidatesScorePerThemes(
        answersToShow.filter((a) => selectedThemes.includes(a.themeId)),
        friends.map((f) => ({
          ...f,
          answers: f.answers.filter((a) => selectedThemes.includes(a.themeId)),
        })),
        quizzQuestions
      ),
    [answersToShow, selectedThemes, friends.length, quizzQuestions]
  );

  const filteredPersons = useMemo(
    () => [
      ...candidatesScorePerThemes.filter((candidate) => selectedCandidates.includes(candidate?.pseudo)),
      ...friendsScorePerThemes.filter((friend) => selectedFriends.includes(friend?.pseudo)),
    ],
    [candidatesScorePerThemes, friendsScorePerThemes, selectedCandidates.length, selectedFriends.length]
  );

  const podiumsPerTheme = useMemo(
    () =>
      selectedThemes.map((themeId) => ({
        themeId,
        personsScore: filteredPersons?.map((c) => ({
          _id: c._id,
          pseudo: c.pseudo,
          picture: c.picture,
          color: c.color,
          total: c.scorePerThemes?.find((score) => themeId === score.themeId)?.percent,
          totalMax: 100,
        })),
      })),
    [selectedThemes, filteredPersons]
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

  useEffect(() => {
    if (userPseudo || !selectedCandidates.length) setSelectedCandidates(allCandidatesQualified);
  }, [candidates.length]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Head>
        <title>{title} | Le Quizz du Berger</title>
        <meta property="og:title" key="og:title" content={`${title} | Le Quizz du Berger`} />
        <meta property="og:url" key="og:url" content={`https://www.quizz-du-berger.com/result/${userPseudo}`} />
        <meta
          property="og:image"
          key="og:image"
          content={`https://quizz-du-berger-pictures.cellar-c2.services.clever-cloud.com/${ogImageName}.png`}
        />
        <meta rel="canonical" key="canonical" content={`https://www.quizz-du-berger.com/result/${userPseudo}`} />
        <meta
          property="og:image:alt"
          key="og:image:alt"
          content={`Voici les résultats de ${userPseudo} | Le Quizz du Berger`}
        />
      </Head>
      <BackgroundContainer>
        <Container>
          <Header>
            <Title>{title}</Title>
            {!!showSaveButton && !hideSaveTip && (
              <small>
                Enregistrez vos résultats maintenant, sinon dans une heure ils sont perdus !{" - "}
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(true);
                    document.body.style.overflow = "hidden";
                  }}
                >
                  Oui !
                </button>
                {" - "}
                <button
                  type="button"
                  onClick={() => {
                    setHideSaveTip(true);
                    setToSessionStorage("hideSaveTip", true);
                  }}
                >
                  Non merci !
                </button>
              </small>
            )}
          </Header>
        </Container>
        <PodiumContainer>
          <Podium fullHeight podiumised={getPodium(filteredPersons)} />
        </PodiumContainer>
        <TipContainer>
          {!publicPage && (
            <SaveContainer>
              {!!showSaveButton && (
                <>
                  <SaveButton
                    onClick={() => {
                      setShowLoginModal(true);
                      document.body.style.overflow = "hidden";
                    }}
                    animate={showSaveButton}
                  >
                    Enregistrer
                  </SaveButton>
                </>
              )}
              <SaveButton
                onClick={() => {
                  if (!userToShow?.pseudo) setShowLoginModal(true);
                  setShowShareModal(true);
                  document.body.style.overflow = "hidden";
                }}
                animate={!user?.isPublic}
              >
                Partager avec mes amis
              </SaveButton>
              <SaveButton
                onClick={() => {
                  setShowFriends(true);
                  document.body.style.overflow = "hidden";
                }}
                animate={!user?.friends?.length}
              >
                Se comparer à mes amis
              </SaveButton>
            </SaveContainer>
          )}
          <Tip>Vous pouvez cliquer sur le nom d'un candidat pour voir ses réponses</Tip>
        </TipContainer>
        <Container>
          <Title>Thème par thème</Title>
          <Filter toggle={setShowCandidates} isActive={showCandidates} title="Afficher/masquer des candidats">
            {candidatesScorePerThemes.map((candidate) => (
              <ButtonStyled
                key={candidate?.pseudo}
                data-pseudo={candidate?.pseudo}
                isActive={!!selectedCandidates.find((c) => c === candidate?.pseudo)}
                onClick={onSelectCandidates}
              >
                {candidate?.pseudo}
              </ButtonStyled>
            ))}
          </Filter>
          <Filter toggle={setShowFriends} isActive={showFriends} title="Se comparer à mes amis" hideTitle>
            {friendsScorePerThemes.map((friend) => (
              <ButtonStyled
                key={friend?.pseudo}
                data-pseudo={friend?.pseudo}
                isActive={!!selectedFriends.find((c) => c === friend?.pseudo)}
                onClick={onSelectFriends}
              >
                {friend?.pseudo}
              </ButtonStyled>
            ))}
            <InputWithLoader>
              <FriendsInput
                placeholder={!!loadingFriend ? `Ajout de ${newFriend}...` : "Tapez le pseudo d'un ami"}
                value={newFriend}
                onChange={setNewFriendRequest}
                autoComplete="name"
              />
              <Loader size="20px" isLoading={loadingFriend} displayOnLoadingOnly />
            </InputWithLoader>
            <NoFriend show={!!noFriend && noFriend === newFriend}>
              Il n'y a pas de pseudo <b>{newFriend}</b> existant. Vérifiez les majuscules ?
            </NoFriend>
            {!user?.isPublic && (
              <small>
                N'oubliez pas de cliquer sur le bouton <b>Partager avec mes amis</b> pour leur permettre de faire la
                même chose avec vous !
              </small>
            )}
          </Filter>
        </Container>
        <PodiumContainer as="aside">
          {podiumsPerTheme.map(({ personsScore, themeId }) => (
            <ThemePodiumContainer key={themeId}>
              <Podium
                podiumised={getPodium(personsScore)}
                // noPadding
                fullHeight
                title={quizz.find((quizztheme) => quizztheme._id === themeId).fr}
              />
            </ThemePodiumContainer>
          ))}
        </PodiumContainer>
        {/* </ChartsContainer> */}
        <Banner>
          En construction.
          <br />
          Envie d'aider ?
        </Banner>
      </BackgroundContainer>
      <Loader isLoading={isLoading} withBackground size="15vh" />
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
    height: calc(100vh - 80px);
    padding: 3vh 10px 1px 10px;
    overflow-x: hidden;
    overflow-y: auto;
  `}

  > div:not(.modal-container) {
    margin: 0 auto 2vh;
    max-width: 1024px;
  }
  > section,
  main,
  aside {
    margin: 0 -10px;
  }
`;

const Container = styled.div`
  /* height: 80%; */
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

const PodiumContainer = styled.main`
  height: 50vh;
  overflow-y: visible;
  margin-bottom: 5vh !important;
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

const SaveContainer = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-left: 10px;
  }
  ${media.mobile`
    flex-direction: column;
    align-items: flex-start;
    > * {
      margin-left: 0px;
      margin-top: 10px;
    }
  `}
`;

const opacityANimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.2;
    transform: scale(0.96);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const SaveButton = styled(QuizzButton)`
  font-size: 0.9em;
  animation: 2s linear 2s 3 running ${opacityANimation};
  ${(props) => !props.animate && "animation-name: none;"}
`;

const Tip = styled.span`
  font-size: 0.65em;
  font-style: italic;
  ${media.mobile`
  display: none;
`}
`;

const TipContainer = styled.div`
  margin-top: -5vh !important;
  margin-bottom: 5vh !important;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  button:first-of-type {
    background-color: #facc15;
    border: none;
    height: 1rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    border-radius: 1rem;
    color: black;
    cursor: pointer;
  }
  button:not(first-of-type) {
    background-color: transparent;
    border: none;
  }
`;

const FriendsInput = styled.input`
  padding: 12px 12px;
  border: none;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  font-size: 16px;
  font-weight: 300;
  width: 100%;
  &:placeholder {
    color: rgba(17, 24, 39, 0.4);
  }
`;

const InputWithLoader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-right: 12px;
  > div {
    margin-left: -25px;
  }
`;

const NoFriend = styled.span`
  font-size: 0.75rem;
  color: red;
  ${(props) => !props.show && "opacity: 0;"}
`;

export default Result;

export const getServerSideProps = async (context) => {
  const { userPseudo } = context.params;
  if (!userPseudo) return { props: {} };
  const publicUserResponse = await API.get({ path: `/user/${userPseudo}`, query: { ssr: true } });
  if (!publicUserResponse.ok) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if (!publicUserResponse.data.isPublic) {
    return { props: {} };
  }
  const publicUserAnswersResponse = await API.get({ path: `/answer/${userPseudo}` });
  if (!publicUserAnswersResponse.ok) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const candidatesResponse = await API.get({ path: "/answer/candidates" });
  const ogImageName = getPicName(
    getPodium(
      getCandidatesScorePerThemes(publicUserAnswersResponse.data, candidatesResponse.data, quizzQuestions).filter(
        (c) => c.isCandidate
      )
    )
  );

  return {
    props: { publicUser: publicUserResponse.data, publicUserAnswers: publicUserAnswersResponse.data, ogImageName },
  };
};
