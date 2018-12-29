import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MyAuctions from "./components/MyAuctions";
import MyBids from "./components/MyBids";
import NotFound from "./components/Notfound";
import Home from "./components/Home/Homepage";
import Navbar from "./components/Navbar";
import Auction from "./components/Auction";

import { loadAuctions } from "./services/AuctionService";

class App extends Component {
  state = {
    loading: true,
    auctions: []
  };

  async componentDidMount() {
    var auctions = [];
    try {
      auctions = await loadAuctions();
      this.setState({ auctions });
    } catch (err) {
      console.log("Error:", err.message);
    }
    console.log(this.state.auctions);
    this.setState({ loading: false });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main class="container">
          <Switch>
            {this.state.auctions.map(auction => (
              <Route
                path={`/${auction.id}`}
                render={() => <Auction data={auction} />}
              />
            ))}
            <Route path="/myauctions" component={MyAuctions} />
            <Route path="/mybids" component={MyBids} />
            <Route path="/page-not-found" component={NotFound} />
            <Route
              path="/"
              exact
              render={() => (
                <Home
                  auctions={this.state.auctions}
                  loading={this.state.loading}
                />
              )}
            />
            <Redirect to="page-not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
