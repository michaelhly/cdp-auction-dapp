import React, { Component } from "react";

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
        <div class="container">
          <div class="row">
            <div
              class="col-md-auto"
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <StickyBox offsetTop={50}>
                <CdpMenu />
              </StickyBox>
            </div>
            <div
              class="col-md-8"
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <CdpContainer auctions={this.state.auctions} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
