import React, { Component } from "react";
import "./App.css";
import { loadAuctions } from "./services/loadAuctions";
import CdpContainer from "./components/cdpContainer";
import Navbar from "./components/navbar";

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
        <Navbar />
        <main className="container">
          <CdpContainer auctions={this.state.auctions} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
