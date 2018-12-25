import React, { Component } from "react";
import CdpPreview from "./cdpPreview";

class Cdps extends Component {
  displayAuctions = props => {
    if (this.props.auctions.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          {this.props.auctions.map(auction => (
            <CdpPreview key={auction.id} auction={auction} />
          ))}
        </div>
      );
    }
  };
  render() {
    return this.displayAuctions();
  }
}

export default Cdps;
