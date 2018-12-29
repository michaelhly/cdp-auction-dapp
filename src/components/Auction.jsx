import React, { Component } from "react";

class Auction extends Component {
  state = {};
  render() {
    return <h1>Auction: {this.props.data.id}</h1>;
  }
}

export default Auction;
