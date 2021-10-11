import React, { useEffect, useState } from "react";
import API from "../services/api";
import { getFromSessionStorage, setToSessionStorage } from "../utils/storage";

const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [sessionStorageUpdateKey, setSessionStorageUpdateKey] = useState(0);
  const [user, setUser] = useState(getFromSessionStorage("user", {}));
  const [userAnswers, setUserAnswers] = useState(getFromSessionStorage("userAnswers", []));
  const [answersQueue, setAnswersQueue] = useState([]);

  const init = async () => {
    if (!!document.cookie.includes("jwt")) {
      await getUser();
      await getAnswers();
    }
  };

  const getUser = async () => {
    const response = await API.getWithCreds({ path: "/user/me" });
    if (!response?.ok) {
      document.cookie = null;
      return;
    }
    setUser(response.data);
    setSessionStorageUpdateKey((k) => k + 1);
  };

  const logout = async () => {
    const response = await API.post({
      path: "/user/logout",
    });
    if (response.ok) {
      setUser(null);
      window.sessionStorage.clear();
    }
  };

  const getAnswers = async () => {
    const response = await API.getWithCreds({ path: "/answer" });
    if (response.ok) {
      setUserAnswers(response.data);
      setSessionStorageUpdateKey((k) => k + 1);
    }
  };

  const saveInSessionStorage = () => {
    setToSessionStorage("user", user);
    setToSessionStorage("userAnswers", userAnswers);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveInSessionStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorageUpdateKey]);

  const setAnswersListState = (newAnswers) => {
    let existingAnswers = userAnswers;
    for (const newAnswer of newAnswers) {
      const existingAnswer = existingAnswers.find((a) => a.questionId === newAnswer.questionId);
      if (!!existingAnswer) {
        existingAnswers = existingAnswers.map((a) =>
          a.questionId === newAnswer.questionId ? newAnswer : a
        );
      } else {
        existingAnswers.push(newAnswer);
      }
    }
    setUserAnswers(existingAnswers);
    setSessionStorageUpdateKey((k) => k + 1);
  };

  const setAnswer = async (newAnswer) => {
    setAnswersListState([newAnswer]);
    await new Promise((res) => setTimeout(res, 250));
    setAnswersQueue((queue) => [...queue, newAnswer]);
  };

  const saveAnswersInDatabase = async () => {
    let newQueue = answersQueue;
    const savedAnswers = [];
    for (let queuedAnswer of newQueue) {
      const response = await API.postWithCreds({ path: "/answer", body: queuedAnswer });
      if (response.ok) {
        const savedAnswer = response.data;
        newQueue = newQueue.filter((answer) => answer.questionId !== savedAnswer.questionId);
        savedAnswers.push(savedAnswer);
      }
    }
    setAnswersListState(savedAnswers);
    setAnswersQueue(newQueue);
  };

  useEffect(() => {
    if (!!answersQueue.length) saveAnswersInDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answersQueue.length]);

  return (
    <UserContext.Provider value={{ user, setUser, logout, userAnswers, getAnswers, setAnswer }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
