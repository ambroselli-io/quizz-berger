import React, { useContext, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useLocation } from "react-router";
import GlobalStyles from "./styles/globalStyle";

import Home from "./scenes/Home";
import LoginPage from "./scenes/LoginPage";
import ThemeSelect from "./scenes/ThemeSelect";
import Quizz from "./scenes/Quizz";
import Result from "./scenes/Result";
import Layout from "./components/Layout";
import AllQuestions from "./scenes/AllQuestions";
import UserContext from "./contexts/user";
import DataContext from "./contexts/data";

const App = () => {
  const { getQuizz, getCandidates } = useContext(DataContext);

  const location = useLocation();

  const init = async () => {
    await getQuizz();
    getCandidates();
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GlobalStyles path={location.pathname} />
      <Layout loading={false}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/all-questions" exact component={AllQuestions} />
          <Route path="/themes" component={ThemeSelect} />
          <Route path="/result/:userPseudo" exact component={Result} />
          <Route path="/quizz/:candidatePseudo" exact component={AllQuestions} />
          <RestrictedRoute path="/question/:themeId/:questionId" exact component={Quizz} />
          <RestrictedRoute path="/result" exact component={Result} />
        </Switch>
      </Layout>
    </>
  );
};

const RestrictedRoute = ({ Component, ...rest }) => {
  const { user } = useContext(UserContext);
  if (!user?._id) return <Redirect to="/" />;
  return <Route {...rest} />;
};

export default App;
