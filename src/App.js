import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MyAuctions from "./components/MyAuctions";
import MyBids from "./components/MyBids";
import NotFoundPage from "./components/NotFoundPage";
import Home from "./components/Home/HomePage";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main class="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/myauctions" component={MyAuctions} />
            <Route path="/mybids" component={MyBids} />
            <Route path="/page-not-found" component={NotFoundPage} />
            <Redirect to="page-not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
