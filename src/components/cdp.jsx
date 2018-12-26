import React, { Component } from "react";

class Cdp extends Component {
  render() {
    return (
      <div class="shadow p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <h5 className="card-title">CDP {this.props.auction.cdp}</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
        </div>
      </div>
    );
  }
}

export default Cdp;
