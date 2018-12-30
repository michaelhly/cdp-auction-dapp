import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MyAuctions from "./components/MyAuctions";
import MyBids from "./components/MyBids";
import Home from "./components/Home/Homepage";
import Navbar from "./components/Navbar";
import Auction from "./components/Auction";

import { loadAuctions, loadDummyAuctions } from "./services/AuctionService";
import { fetchPrice } from "./services/MkrService";

class App extends Component {
  state = {
    loading: true,
    pwRatio: 1,
    ethPrice: 0,
    auctions: []
  };

  fetchAuctionData = async () => {
    try {
      const auctions = await loadAuctions();
      this.setState({ auctions });
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  fetchPricingData = async () => {
    try {
      const price = await fetchPrice();
      this.setState({ pwRatio: price.ratio });
      this.setState({ ethPrice: price.ethPrice });
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  refreshData = async () => {
    await this.fetchAuctionData();
    await this.fetchPricingData();
  };

  fetchDummyData = () => {
    const auctions = loadDummyAuctions(10);
    this.setState({ auctions });
  };

  async componentDidMount() {
    // this.fetchDummyData();
    await this.refreshData();
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
                render={() => (
                  <Auction
                    data={auction}
                    ethPrice={this.state.ethPrice}
                    ratio={this.state.pwRatio}
                  />
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
