import React, { useState } from "react";
import API from "../services/api";
import { getFromLocalStorage, setToLocalStorage } from "../utils/storage";

const DataContext = React.createContext({});

export const DataProvider = ({ children }) => {
  const [quizz, setQuizz] = useState(getFromLocalStorage("quizz", []));
  const [candidates, setCandidates] = useState(getFromLocalStorage("candidates"), []);

  const getQuizz = async () => {
    const response = await API.get({ path: "/quizz" });
    if (response.ok) {
      const enrichedQuizz = response.data.map((theme, index) => ({
        ...theme,
        backgroundColor: colors[index],
      }));
      setQuizz(enrichedQuizz);
      setToLocalStorage("quizz", enrichedQuizz);
    }
  };

  const getCandidates = async () => {
    const response = await API.get({ path: "/answer/candidates" });
    if (response.ok) {
      if (JSON.stringify(candidates) !== JSON.stringify(response.data)) {
        console.log("miam");
        setToLocalStorage("candidates", response.data);
        setCandidates(response.data);
      }
    }
  };

  return (
    <DataContext.Provider value={{ quizz, getQuizz, candidates, getCandidates }}>
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
