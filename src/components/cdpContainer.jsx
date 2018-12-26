import React, { Component } from "react";
import Cdp from "./cdp";

class CdpContainer extends Component {
  displayAuctions = props => {
    if (this.props.auctions.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          {this.props.auctions.map(auction => (
            <Cdp key={auction.id} auction={auction} />
          ))}
        </div>
      );
    }
  };
  render() {
    return this.displayAuctions();
  }
}

export default CdpContainer;
