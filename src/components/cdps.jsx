import React, { Component } from "react";
import CdpCard from "./cdpCard";

class Cdps extends Component {
  displayAuctions = props => {
    if (this.props.auctions.length == 0) {
      return <div>No auctions found!</div>;
    } else {
      return (
        <div>
          {this.props.auctions.map(auction => (
            <CdpCard key={auction.id} auction={auction} />
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
