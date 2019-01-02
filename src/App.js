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
    ethPrice: 100,
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

  fetchPricingData = async () => {
    try {
      const price = await fetchPrice();
      this.setState({ ethPrice: price });
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  refreshData = async count => {
    await this.fetchAuctionData(count);
    await this.fetchPricingData();
  };

  fetchDummyData = () => {
    const auctions = loadDummyAuctions(10);
    this.setState({ auctions });
  };

  async componentDidMount() {
    this.fetchDummyData();
    // await this.refreshData(2);
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
                render={() => (
                  <Auction auction={auction} ethPrice={this.state.ethPrice} />
                )}
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
                  ethPrice={this.state.ethPrice}
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
