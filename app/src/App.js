import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./scenes/home";
import ThemeSelect from "./scenes/theme";
import Quizz from "./scenes/quizz";
import Result from "./scenes/result";
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
    if (!response.ok) return alert(response.error);
    this.setUser(response.data);
  };

  setUser = (user) => this.setState({ user, needLoading: false });

  render() {
    const { needLoading, user } = this.state;
    if (needLoading) return <div>Loading...</div>;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" render={(props) => <Home {...props} setUser={this.setUser} />} />
          <RestrictedRoute
            path="/theme"
            user={user}
            Component={(props) => <ThemeSelect {...props} setUser={this.setUser} />}
          />
          <RestrictedRoute
            path="/question"
            exact
            user={user}
            Component={(props) => <Quizz {...props} />}
          />
          <RestrictedRoute
            path="/result"
            exact
            user={user}
            Component={(props) => <Result {...props} />}
          />
          <RestrictedRoute path="/" exact user={user} Component={() => <Redirect to="/theme" />} />
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
        user._id ? <Component {...props} user={user} /> : <Redirect to="/login" />
      }
    />
  );
};

export default App;
