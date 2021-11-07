/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { media } from "../styles/mediaQueries";

import UserContext from "../contexts/user";
import DataContext from "../contexts/data";

import ThemeButton from "../components/ThemeButton";
import Button from "../components/Button";
import { FormInput } from "../components/Form";
import { normalizeWord } from "../utils/diacritics";
import ModalFirstThemeSelection from "../components/ModalFirstThemeSelection";
import ModalLastThemeSelection from "../components/ModalLastThemeSelection";
import getUserThemes from "../utils/getUserThemes";
import ModalAccessToResults from "../components/ModalAccessToResults";

const filterBySearch = (search, quizzForSearch) => (theme, index) => {
  if (!search) return true;
  return quizzForSearch[index].includes(normalizeWord(search));
};

const ThemeSelect = () => {
  const { initNewUser, userAnswers } = useContext(UserContext);
  const { quizz, quizzForSearch } = useContext(DataContext);
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(null);
  const questionsNumber = quizz.reduce(
    (questionsNumber, theme) => questionsNumber + theme.questions.length,
    0
  );

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

  const goToResults = () => history.push("/result");
  const goToQuizz = async (e) => {
    await initNewUser();
    const themeId = e.target.dataset.themeid;
    const firstQuestionId = quizz.find((t) => t._id === themeId).questions[0]._id;
    history.push(`/question/${themeId}/${firstQuestionId}`);
  };
  const onSearchChange = async (e) => setSearch(e.target.value);

  const userThemes = getUserThemes(userAnswers);

  const alertTimeouts = useRef(null);

  useEffect(() => {
    clearTimeout(alertTimeouts?.current);
    if (!userAnswers.length && !window.sessionStorage.getItem("theme-select_first")) {
      alertTimeouts.current = setTimeout(() => {
        showModalRequest("theme-select_first");
        window.sessionStorage.setItem("theme-select_first", "true");
      }, 1000);
    }
    if (userThemes.length === 2 && !window.sessionStorage.getItem("theme-select_last")) {
      alertTimeouts.current = setTimeout(() => {
        showModalRequest("theme-select_last");
        window.sessionStorage.setItem("theme-select_last", "true");
      }, 1000);
    }
    if (userThemes.length === 3 && !window.sessionStorage.getItem("theme-select_result")) {
      alertTimeouts.current = setTimeout(() => {
        showModalRequest("theme-select_result");
        window.sessionStorage.setItem("theme-select_result", "true");
      }, 1000);
    }
  }, [userAnswers.length]);

  const buttonCaption = () => {
    if (!userThemes.length) return "Choisissez votre 1<sup>er</sup>&nbsp;&nbsp;thème";
    if (userThemes.length === 1) return "Choisissez un 2<sup>ème</sup>&nbsp;&nbsp;thème";
    if (userThemes.length === 2) return "Choisissez un 3<sup>ème</sup>&nbsp;&nbsp;thème";
    return "Voir les résultats";
  };

  const titleCaption = () => {
    if (!userThemes.length) return "Choisissez votre premier thème";
    if (userThemes.length === 1) return "Choisissez un deuxième thème";
    if (userThemes.length === 2) return "Choisissez un troisième thème";
    return "Choisissez un thème";
  };

  const renderSubtitle = () => {
    if (!userThemes.length) {
      return (
        <>
          Répondez au quizz, thème après thème, en commençant par
          <strong> celui qui vous tient le plus à coeur.</strong>
        </>
      );
    }
    if (userThemes.length === 1) {
      return (
        <>
          Prenez désormais un deuxième thème
          <strong> qui vous tient à coeur.</strong>
        </>
      );
    }
    if (userThemes.length === 2) {
      return (
        <>
          Encore un thème avant de pouvoir
          <strong> voir vos résultats&nbsp;!</strong>
        </>
      );
    }
    if (userAnswers.length === questionsNumber) {
      return <>Bravo, vous avez répondu à toutes les questions&nbsp;!</>;
    }
    if (userThemes.length === quizz.length) {
      return (
        <>
          Bravo, vous avez répondu à tous les thèmes&nbsp;!
          <br />
          Il reste toutefois <strong> quelques questions non répondues</strong>, si vous voulez
          aller jusqu'au bout de votre pensée.
        </>
      );
    }
    return (
      <>
        Vous pouvez
        <strong> répondre aux autres questions</strong> thème après thème <br />
        pour approfondir votre pensée politique ou directement
        <strong> voir les résultats </strong>
        pour la comparer aux autres candidats.
      </>
    );
  };

  return (
    <>
      <BackgroundContainer>
        <SubContainer>
          <Title>{titleCaption()}</Title>
          <SubTitle>
            {renderSubtitle()}
            <br />
            <br />
            <small>
              Ce test essaie de représenter l'ensemble d'idées le plus large possible, et contient
              des éléments que vous pourrez trouver choquant.
            </small>
            <br />
            <small>
              Vous pouvez toujours ne pas répondre à une question : vous répondez à ce que vous
              voulez, si vous le voulez. Vos réponses et résultats sont <strong>anonymes</strong>.
            </small>
          </SubTitle>
          <ThemesContainer>
            {quizz.filter(filterBySearch(search, quizzForSearch)).map((theme) => {
              return <ThemeButton key={theme._id} theme={theme} onClick={goToQuizz} />;
            })}
          </ThemesContainer>
          <SearchInput
            placeholder="Recherchez par mot-clé"
            value={search}
            onChange={onSearchChange}
          />
          {/* <Footer> */}
          <Button
            disabled={buttonCaption() !== "Voir les résultats"}
            onClick={goToResults}
            dangerouslySetInnerHTML={{ __html: buttonCaption() }}
          />
          {/* </Footer> */}
        </SubContainer>
      </BackgroundContainer>
      <ModalFirstThemeSelection
        isActive={showModal === "theme-select_first"}
        onForceCloseModal={onForceCloseModal}
        onCloseModal={onCloseModal}
      />
      <ModalLastThemeSelection
        isActive={showModal === "theme-select_last"}
        onForceCloseModal={onForceCloseModal}
        onCloseModal={onCloseModal}
      />
      <ModalAccessToResults
        isActive={showModal === "theme-select_result"}
        onForceCloseModal={onForceCloseModal}
        onCloseModal={onCloseModal}
      />
    </>
  );
};

const BackgroundContainer = styled.div`
  padding: 40px 10px 40px 10px;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #fff;
  ${media.mobile`
  padding: 40px 10px 40px 10px;
  height: auto;
  min-height: 900px;
  `}
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

const SearchInput = styled(FormInput)``;

export default ThemeSelect;
