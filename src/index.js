import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import configureStore from "./modules/store";

import CharacterList from "./containers/CharacterList";
import CharacterDetail from "./containers/CharacterDetail";

import "style/main.scss";

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <Route exact path="/" component={CharacterList} />
      <Route exact path="/:id" component={CharacterDetail} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
