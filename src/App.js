import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { loadAuctions } from "./services/loadAuctions";
import Cdps from "./components/cdps";

class App extends Component {
  state = {
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
  }

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Cdps auctions={this.state.auctions} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
