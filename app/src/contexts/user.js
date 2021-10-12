import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import API from "../services/api";
import { getFromSessionStorage, setToSessionStorage } from "../utils/storage";

const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [sessionStorageUpdateKey, setSessionStorageUpdateKey] = useState(0);
  const [user, setUser] = useState(getFromSessionStorage("user", {}));
  const [userAnswers, setUserAnswers] = useState(getFromSessionStorage("userAnswers", []));
  const [answersQueue, setAnswersQueue] = useState(getFromSessionStorage("answersQueue", []));
  const history = useHistory();

  const init = async () => {
    await getUser();
    await getAnswers();
  };

  const initNewUser = async () => {
    if (!!user?._id) return;
    const response = await API.post({ path: "/user" });
    if (response.ok) setUser(response.data);
  };

  const getUser = async () => {
    const response = await API.getWithCreds({ path: "/user/me" });
    if (!response?.ok) {
      setUserAnswers([]);
      setAnswersQueue([]);
      return;
    }
    if (JSON.stringify(user) !== JSON.stringify(response.data)) {
      setUser(response.data);
      setSessionStorageUpdateKey((k) => k + 1);
    }
  };

  const logout = async () => {
    const response = await API.post({
      path: "/user/logout",
    });
    if (response.ok) {
      window.sessionStorage.clear();
      setUserAnswers([]);
      setAnswersQueue([]);
      history.push("/home");
      setUser(null);
    }
  };

  const getAnswers = async () => {
    await saveAnswersInDatabase();
    const response = await API.getWithCreds({ path: "/answer" });
    if (!response.ok) return;
    if (JSON.stringify(userAnswers) !== JSON.stringify(response.data)) {
      setUserAnswers(response.data);
      setSessionStorageUpdateKey((k) => k + 1);
    }
  };

  const saveInSessionStorage = () => {
    setToSessionStorage("user", user);
    setToSessionStorage("userAnswers", userAnswers);
    setToSessionStorage("answersQueue", answersQueue);
  };

  useEffect(() => {
    if (user?._id) init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

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
    setSessionStorageUpdateKey((k) => k + 1);
  };

  useEffect(() => {
    if (!!answersQueue.length) saveAnswersInDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answersQueue.length]);

  return (
    <UserContext.Provider
      value={{ user, setUser, initNewUser, logout, userAnswers, getAnswers, setAnswer }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
