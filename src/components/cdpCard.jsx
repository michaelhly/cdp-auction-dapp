import React, { Component } from "react";

class CdpCard extends Component {
  render() {
    return (
      <div className="card w-80 shadow-sm p-3 mb-4 bg-white rounded">
        <div className="card-body">
          <h5 className="card-title">CDP: {this.props.auction.cdp}</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" className="btn btn-danger shadow rounded">
            Bid
          </a>
        </div>
      </div>
    );
  }
}

export default CdpCard;
