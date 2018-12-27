import React, { Component } from "react";
import { Container } from "reactstrap";
import "./App.css";

import StickyBox from "react-sticky-box";
import CdpContainer from "./components/CdpContainer";
import Navbar from "./components/Navbar";
import CdpMenu from "./components/CdpMenu/Menu";

import { loadAuctions } from "./services/AuctionService";

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
        <Container>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <StickyBox offsetTop={50}>
              <CdpMenu />
            </StickyBox>
            <div>
              <CdpContainer auctions={this.state.auctions} />
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
