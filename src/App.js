import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { loadAuctions } from "./services/loadAuctions";

class App extends Component {
  state = {
    auctions: null,
    user: { id: 0, gitHubUsername: null }
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
