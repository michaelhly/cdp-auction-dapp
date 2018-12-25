import React, { Component } from "react";

class CdpCard extends Component {
  render() {
    return (
      <div className="card w-80 m-2">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" className="btn btn-danger">
            Bid
          </a>
        </div>
      </div>
    );
  }
}

export default CdpCard;
