import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import GlobalStyles from "./styles/globalStyle";

import Home from "./scenes/Home";
import LoginPage from "./scenes/LoginPage";
import ThemeSelect from "./scenes/Theme";
import Quizz from "./scenes/Quizz";
import Result from "./scenes/Result";
import API from "./services/api";

class App extends React.Component {
  state = {
    user: {},
    needLoading: !!document.cookie.includes("jwt"),
  };

  componentDidMount() {
    if (this.state.needLoading) this.onGetUser();
  }

  onGetUser = async () => {
    const response = await API.getWithCreds({ path: "/user/me" });
    if (!response.ok) document.cookie = null;
    this.setUser(response.data);
  };

  setUser = (user) => this.setState({ user, needLoading: false });

  render() {
    const { needLoading, user } = this.state;
    if (needLoading) return <div>Loading...</div>;
    return (
      <BrowserRouter>
        <GlobalStyles />
        <Switch>
          <Route path="/home" render={(props) => <Home user={user} setUser={this.setUser} />} />
          <Route
            path="/login"
            render={(props) => <LoginPage {...props} user={user} setUser={this.setUser} />}
          />
          <RestrictedRoute
            path="/theme"
            user={user}
            Component={(props) => <ThemeSelect {...props} setUser={this.setUser} />}
          />
          <RestrictedRoute
            path="/question/:themeId/:questionId"
            exact
            user={user}
            Component={(props) => <Quizz {...props} setUser={this.setUser} />}
          />
          <RestrictedRoute
            path="/result"
            exact
            user={user}
            Component={(props) => <Result {...props} setUser={this.setUser} />}
          />
          <RestrictedRoute
            path="/"
            exact
            user={user}
            Component={() => <Redirect to="/theme" setUser={this.setUser} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const RestrictedRoute = ({ Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user?._id ? <Component {...props} user={user} /> : <Redirect to="/login" />
      }
    />
  );
};

export default App;
