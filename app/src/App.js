import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./scenes/home";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' render={(props) => <Home />} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
