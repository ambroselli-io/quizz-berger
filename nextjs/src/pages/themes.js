/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Head from "next/head";
import { media, minMedia } from "../styles/mediaQueries";
import API from "../services/api";
import { normalizeWord } from "../utils/diacritics";
import getUserThemes from "../utils/getUserThemes";
import useUser from "../hooks/useUser";
import { quizz, quizzForSearch } from "../utils/quizz";
import ThemeButton from "../components/ThemeButton";
import Button from "../components/Button";
import { FormInput } from "../components/Form";
import ModalFirstThemeSelection from "../components/ModalFirstThemeSelection";
import ModalLastThemeSelection from "../components/ModalLastThemeSelection";
import ModalAccessToResults from "../components/ModalAccessToResults";
import useUserAnswers from "../hooks/useUserAnswers";
// import Banner from "../components/Banner";

const filterBySearch = (search, quizzForSearch) => (theme, index) => {
  if (!search) return true;
  return quizzForSearch[index].includes(normalizeWord(search));
};

const ThemeSelect = () => {
  const { user, mutate } = useUser({ from: "ThemeSelect" });
  const { userAnswers } = useUserAnswers();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(null);
  const questionsNumber = quizz.reduce((questionsNumber, theme) => questionsNumber + theme.questions.length, 0);

  const [userThemes, setUserThemes] = useState([]);
  const [buttonCaption, setButtonCaption] = useState(computeButtonCaption(userThemes));
  const [titleCaption, setTitleCaption] = useState(computeTitleCaption(userThemes));
  const [subtitle, setSubtitle] = useState(computeSubtitle(userThemes, questionsNumber, userAnswers, quizz));
  const [quizzFiltered, setQuizzFiltered] = useState(quizz);

  const shuffledQuizz = useMemo(() => {
    const hour = new Date().getHours();
    return [...quizzFiltered].sort((t1, t2) => {
      const t1onlyLetter = t1.fr.split(" ").join("");
      const t2onlyLetter = t2.fr.split(" ").join("");
      const letter1 = t1onlyLetter[Math.min(hour, t1onlyLetter.length)];
      const letter2 = t2onlyLetter[Math.min(hour, t2onlyLetter.length)];
      return letter1 > letter2 ? -1 : 1;
    });
  }, [new Date().getHours() + 4, quizzFiltered.length]);

  const initNewUser = async () => {
    if (!!user?._id) return;
    const response = await API.post({ path: "/user" });
    if (response.ok) mutate(response, false); // skip revalidation, if not: bug
  };

  const showModalRequest = (modalName) => {
    document.body.style.overflow = "hidden";
    setShowModal(modalName);
  };

  const onCloseModal = (e) => {
    if (e.target !== e.currentTarget) return;
    onForceCloseModal();
  };

  const onForceCloseModal = () => {
    setShowModal(null);
    document.body.style.overflow = "visible";
  };

  const goToResults = () => router.push("/result");
  const goToQuizz = async (e) => {
    await initNewUser();
    const themeId = e.target.dataset.themeid;
    const firstQuestionId = quizz.find((t) => t._id === themeId).questions[0]._id;
    router.push(`/question/${themeId}/${firstQuestionId}`);
  };

  const onSearchChange = (e) => setSearch(e.target.value);

  const alertTimeouts = useRef(null);

  useEffect(() => {
    clearTimeout(alertTimeouts?.current);
    if (!userAnswers.length && !window.sessionStorage.getItem("theme-select_first")) {
      alertTimeouts.current = setTimeout(() => {
        showModalRequest("theme-select_first");
        window.sessionStorage.setItem("theme-select_first", "true");
      }, 1000);
    }
    // if (userThemes.length === 2 && !window.sessionStorage.getItem("theme-select_last")) {
    //   alertTimeouts.current = setTimeout(() => {
    //     showModalRequest("theme-select_last");
    //     window.sessionStorage.setItem("theme-select_last", "true");
    //   }, 1000);
    // }
    if (userThemes.length > 0 && !window.sessionStorage.getItem("theme-select_result")) {
      alertTimeouts.current = setTimeout(() => {
        showModalRequest("theme-select_result");
        window.sessionStorage.setItem("theme-select_result", "true");
      }, 1000);
    }
    return () => {
      clearTimeout(alertTimeouts?.current);
    };
  }, [userAnswers.length, userThemes.length]);

  useEffect(() => {
    setUserThemes(getUserThemes(userAnswers));
  }, [userAnswers.length]);

  useEffect(() => {
    setButtonCaption(computeButtonCaption(userThemes));
    setTitleCaption(computeTitleCaption(userThemes));
    setSubtitle(computeSubtitle(userThemes, questionsNumber, userAnswers, quizz));
  }, [userThemes?.length]);

  const timeoutSearch = useRef(null);
  useEffect(() => {
    clearTimeout(timeoutSearch.current);
    timeoutSearch.current = setTimeout(() => {
      setQuizzFiltered(quizz.filter(filterBySearch(search, quizzForSearch)));
    }, 300);
  }, [search]);

  return (
    <>
      <Head>
        <title>{titleCaption} | Le Quizz du Berger</title>
        <meta
          property="og:title"
          key="og:title"
          content="Choisissez un thème en suivant votre coeur 💕 | Le Quizz du Berger"
        />
        <meta property="og:url" key="og:url" content="https://www.quizz-du-berger.com/themes/" />
        <meta property="og:image" key="og:image" content="https://www.quizz-du-berger.com/themes.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta rel="canonical" key="canonical" content="https://www.quizz-du-berger.com/themes/" />
        <meta property="og:image:alt" key="og:image:alt" content="Les thèmes du Quizz du Berger | Le Quizz du Berger" />
        <meta
          key="twitter:title"
          name="twitter:title"
          content="Choisissez un thème en suivant votre coeur 💕 | Le Quizz du Berger"
        />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="Présidentielles 2022 - Répondez aux questions que vous voulez pour connaître le candidat qui pense comme vous"
        />
        <meta name="twitter:image" key="twitter:image" content="https://www.quizz-du-berger.com/themes.png" />
        <meta
          key="twitter:image:alt"
          name="twitter:image:alt"
          content="Choisissez un thème en suivant votre coeur 💕 | Le Quizz du Berger"
        />
      </Head>
      <BackgroundContainer>
        <SubContainer>
          <Title>{titleCaption}</Title>
          <SubTitle>
            <span dangerouslySetInnerHTML={{ __html: subtitle }} />
            <br />
            <br />
            <small>
              Ce test essaie de représenter l'ensemble d'idées le plus large possible, et contient des éléments que vous
              pourrez trouver choquant.
            </small>
            <br />
            <small>
              Vous pouvez toujours ne pas répondre à une question : vous répondez à ce que vous voulez, si vous le
              voulez. Vos réponses et résultats sont <strong>anonymes</strong>.
            </small>
          </SubTitle>
          <ThemesContainer>
            {shuffledQuizz
              .filter((t) => t._id !== "theme-6211242a3f15af68d035215d")
              .map((theme, index) => {
                return (
                  <ThemeButton
                    key={theme._id}
                    debug={index === 0}
                    theme={theme}
                    userAnswers={userAnswers}
                    onClick={goToQuizz}
                  />
                );
              })}
          </ThemesContainer>
          <SearchInput
            placeholder="Recherchez par mot-clé"
            autoComplete="off"
            value={search}
            onChange={onSearchChange}
          />
          {/* <Footer> */}
          <Button
            disabled={buttonCaption !== "Voir les résultats"}
            onClick={goToResults}
            dangerouslySetInnerHTML={{ __html: buttonCaption }}
          />
          {/* </Footer> */}
        </SubContainer>
        {/* <Banner /> */}
      </BackgroundContainer>
      <ModalFirstThemeSelection
        isActive={showModal === "theme-select_first"}
        onForceCloseModal={onForceCloseModal}
        onCloseModal={onCloseModal}
      />
      {/* <ModalLastThemeSelection
        isActive={showModal === "theme-select_last"}
        onForceCloseModal={onForceCloseModal}
        onCloseModal={onCloseModal}
      /> */}
      <ModalAccessToResults
        isActive={showModal === "theme-select_result"}
        onForceCloseModal={onForceCloseModal}
        onCloseModal={onCloseModal}
      />
    </>
  );
};

const BackgroundContainer = styled.div`
  padding: 80px 10px 80px 10px;
  ${minMedia.desktop`
    height: calc(100vh - 80px);
    overflow-x: hidden;
    overflow-y: auto;
  `}
  ${media.mobile`
    padding: 3vh 10px 1px 10px;
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

const SubContainer = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-family: Merriweather;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #111827;
`;

const SubTitle = styled.h3`
  max-width: 90vw;
  margin-bottom: 40px;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  color: #111827;
`;

const ThemesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 20px;
  margin-bottom: 40px;
  ${media.mobile`
    grid-template-columns: auto;
    margin-bottom: 20px;
  `}
`;

const SearchInput = styled(FormInput)`
  width: 250px;
`;

const computeButtonCaption = (userThemes) => {
  if (!userThemes?.length) return "Choisissez votre 1<sup>er</sup>&nbsp;&nbsp;thème";
  // if (userThemes.length === 1) return "Choisissez un 2<sup>ème</sup>&nbsp;&nbsp;thème";
  // if (userThemes.length === 2) return "Choisissez un 3<sup>ème</sup>&nbsp;&nbsp;thème";
  return "Voir les résultats";
};
const computeTitleCaption = (userThemes) => {
  if (!userThemes?.length) return "Choisissez votre premier thème";
  // if (userThemes.length === 1) return "Choisissez un deuxième thème";
  // if (userThemes.length === 2) return "Choisissez un troisième thème";
  return "Choisissez un thème";
};

const computeSubtitle = (userThemes, questionsNumber, userAnswers, quizz) => {
  if (!userThemes?.length) {
    return "Répondez au quiz, thème après thème, en commençant par<strong> celui qui vous tient le plus à coeur.</strong>";
  }
  // if (userThemes.length === 1) {
  //   return "Prenez désormais un deuxième thème <strong> qui vous tient à coeur.</strong>";
  // }
  // if (userThemes.length === 2) {
  //   return "Encore un thème avant de pouvoir <strong> voir vos résultats&nbsp;!</strong>";
  // }
  if (userAnswers.length === questionsNumber) {
    return "Bravo, vous avez répondu à toutes les questions&nbsp;!";
  }
  if (userThemes.length === quizz.length) {
    return "Bravo, vous avez répondu à tous les thèmes&nbsp;!<br />Il reste toutefois <strong> quelques questions non répondues</strong>, si vous voulez aller jusqu'au bout de votre pensée.";
  }
  return "Vous pouvez <strong> répondre aux autres questions</strong> thème après thème <br /> pour approfondir votre pensée politique ou directement <strong> voir les résultats </strong> pour la comparer aux autres candidats.";
};

export default ThemeSelect;
