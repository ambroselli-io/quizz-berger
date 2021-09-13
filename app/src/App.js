import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./scenes/home";
import ThemeSelect from "./scenes/theme";
import Quizz from "./scenes/quizz";
import Result from "./scenes/result";

class App extends React.Component {
  state = {
    user: {},
    needLoading: !!document.cookie.includes("jwt"),
  };

  componentDidMount() {
    if (this.state.needLoading) this.onGetUser();
  }

  onGetUser = async () => {
    const response = await fetch("http://127.0.0.1:8080/user/me", {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());
    this.setUser(response.data);
  };

  setUser = (user) => this.setState({ user, needLoading: false });

  setTheme = (user) => {
    this.setState({ user: user });
  };

  render() {
    const { needLoading, user } = this.state;
    if (needLoading) return <div>Loading...</div>;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path='/login'
            render={(props) => <Home {...props} setUser={this.setUser} />}
          />
          <RestrictedRoute
            path='/theme'
            user={user}
            Component={(props) => (
              <ThemeSelect {...props} setTheme={this.setTheme} />
            )}
          />
          <RestrictedRoute
            path='/question'
            exact
            user={user}
            Component={(props) => <Quizz {...props} />}
          />
          <RestrictedRoute
            path='/result'
            exact
            user={user}
            Component={(props) => <Result {...props} />}
          />
          <RestrictedRoute
            path='/'
            exact
            user={user}
            Component={() => <Redirect to='/theme' />}
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
        user._id ? (
          <Component {...props} user={user} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default App;
