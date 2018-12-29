import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MyAuctions from "./components/MyAuctions";
import MyBids from "./components/MyBids";
import NotFound from "./components/Notfound";
import Home from "./components/Home/Homepage";
import Navbar from "./components/Navbar";
import Auction from "./components/Auction";

import { loadAuctions } from "./services/AuctionService";
import { fetchPrice } from "./services/MkrService";

class App extends Component {
  state = {
    loading: true,
    pwRatio: 1,
    ethPrice: 0,
    auctions: []
  };

  fetchData = async () => {
    var auctions = [];
    var price = {};
    try {
      auctions = await loadAuctions();
      this.setState({ auctions });
      price = await fetchPrice();
      this.setState({ pwRatio: price.ratio });
      this.setState({ ethPrice: price.ethPrice });
    } catch (err) {
      console.log("Error:", err.message);
    }
    this.setState({ loading: false });
  };

  async componentDidMount() {
    await this.fetchData();
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
            <Redirect to="/" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
