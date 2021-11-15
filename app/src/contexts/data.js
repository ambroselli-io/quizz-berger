import React, { useState } from "react";
import API from "../services/api";
import { normalizeWord } from "../utils/diacritics";
import { getFromLocalStorage, setToLocalStorage } from "../utils/storage";

const DataContext = React.createContext({});

const formatQuizzForSearch = (quizz) =>
  quizz.map((theme) => {
    const questions = theme.questions.map((q) => q.fr).join(" ");
    const answers = theme.questions.map((q) => q.answers.join(" ")).join(" ");
    return normalizeWord(`${theme.fr} ${questions} ${answers}`.toLocaleLowerCase());
  });

export const DataProvider = ({ children }) => {
  const [quizz, setQuizz] = useState(getFromLocalStorage("quizz", []));
  const [quizzForSearch, setQuizzForSearch] = useState(
    formatQuizzForSearch(getFromLocalStorage("quizz", []))
  );
  const [candidates, setCandidates] = useState(getFromLocalStorage("candidates", []));
  const [friends, setFriends] = useState(getFromLocalStorage("friends", []));

  const getQuizz = async () => {
    const response = await API.get({ path: "/quizz" });
    if (response.ok) {
      const enrichedQuizz = response.data.map((theme, index) => ({
        ...theme,
        backgroundColor: colors[index],
      }));
      setQuizz(enrichedQuizz);
      setToLocalStorage("quizz", enrichedQuizz);
      setQuizzForSearch(formatQuizzForSearch(enrichedQuizz));
    }
  };

  const getCandidates = async () => {
    const response = await API.get({ path: "/answer/candidates" });
    if (response.ok) {
      if (JSON.stringify(candidates) !== JSON.stringify(response.data)) {
        setToLocalStorage("candidates", response.data);
        setCandidates(response.data);
      }
    }
  };

  const getFriends = async () => {
    const response = await API.get({ path: "/answer/friends" });
    if (response.ok) {
      if (JSON.stringify(friends) !== JSON.stringify(response.data)) {
        setToLocalStorage("friends", response.data);
        setFriends(response.data);
      }
    }
  };

  return (
    <DataContext.Provider
      value={{ quizz, quizzForSearch, getQuizz, candidates, getCandidates, friends, getFriends }}>
      {children}
    </DataContext.Provider>
  );
};

const colors = [
  "#e6194B",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#42d4f4",
  "#f032e6",
  "#bfef45",
  "#fabed4",
  "#469990",
  "#dcbeff",
  "#9A6324",
  "#fffac8",
  "#800000",
  "#aaffc3",
  "#808000",
  "#ffd8b1",
  "#000075",
  "#a9a9a9",
  "#ffffff",
  "#000000",
];

export default DataContext;
