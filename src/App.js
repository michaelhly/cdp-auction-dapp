import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MyAuctions from "./components/MyAuctions";
import MyBids from "./components/MyBids";
import Home from "./components/Home/Homepage";
import Navbar from "./components/Navbar";
import Auction from "./components/Auction/Auction";

import { loadAuctions, loadDummyAuctions } from "./services/requestInfura";
import { fetchPrice } from "./services/requestMKR";

class App extends Component {
  state = {
    loading: true,
    auctions: []
  };

  fetchAuctionData = async count => {
    try {
      const auctions = await loadAuctions(count);
      this.setState({ auctions });
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  fetchDummyData = () => {
    const auctions = loadDummyAuctions(10);
    this.setState({ auctions });
  };

  async componentDidMount() {
    // this.fetchDummyData();
    await this.fetchAuctionData(2);
    this.setState({ loading: false });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            {this.state.auctions.map(auction => (
              <Route
                key={auction.id}
                path={`/${auction.id}`}
                render={() => <Auction auction={auction} />}
              />
            ))}
            <Route path="/myauctions" component={MyAuctions} />
            <Route path="/mybids" component={MyBids} />
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
