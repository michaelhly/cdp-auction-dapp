import React, { useState } from "react";
import TokenManager from "./TokenManager";

const Auction = props => {
  const auction = props.auction;
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(props.ethPrice);

  const display = () => {};

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <TokenManager />
          </div>
          <div className="col-8">
            <h2 class="title mb-4">CDP {auction.cdpId}</h2>
            <div className="row">
              <div className="col-8">
                <div class="card">
                  <div class="card-body">
                    <h6>Seller</h6>
                    This is some text within a card body.
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div class="card">
                  <div class="card-body">
                    <h6>Liquidation</h6>
                    49
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div class="card">
                  <div class="card-body">
                    <h6>Collateral</h6>
                    49
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div class="card">
                  <div class="card-body">
                    <h6>Debt</h6>
                    49
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div class="card">
                  <div class="card-body">
                    <h6>Value</h6>
                    49
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">Ask</div>
              <div className="col-8">Bid Box</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auction;

/*
class Auction extends Component {
  state = {};
  render() {
    return <h1>Auction: {this.props.data.id}</h1>;
  }
}

export default Auction;
*/
