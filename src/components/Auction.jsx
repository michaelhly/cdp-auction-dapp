import React, { useState } from "react";
import { convertExpiryBlocks, calcValue } from "../common/helpers";
import TokenManager from "./TokenManager";

const Auction = props => {
  const auction = props.auction;
  console.log(auction);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(props.ethPrice);

  const trimAddress = addr => {
    return [addr.substring(0, 30), "..."];
  };
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
              <div className="col">
                <div class="card shadow-sm mb-5 bg-white rounded">
                  <div class="card-body">
                    <div className="row">
                      <div className="col-8">
                        <h6 style={{ color: "rgb(85, 85, 85)" }}>
                          Seller:{" "}
                          <span style={{ color: "black" }}>
                            {trimAddress(auction.seller)}
                          </span>
                        </h6>
                      </div>
                      <div className="col-4">
                        <h6 style={{ color: "rgb(85, 85, 85)" }}>
                          Liquidation:{" "}
                          <span style={{ color: "black" }}>
                            ${auction.cdpLiquidation}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <h6 style={{ color: "rgb(85, 85, 85)" }}>
                          Collateral:{" "}
                          <span style={{ color: "black" }}>
                            {auction.cdpCollateral}
                          </span>
                        </h6>
                      </div>
                      <div className="col-4">
                        <h6 style={{ color: "rgb(85, 85, 85)" }}>
                          Debt:{" "}
                          <span style={{ color: "black" }}>
                            {auction.cdpDebt + auction.cdpFee}
                          </span>
                        </h6>
                      </div>
                      <div className="col-4">
                        <h6 style={{ color: "rgb(85, 85, 85)" }}>
                          Value: Ξ{" "}
                          <span style={{ color: "black" }}>
                            {calcValue(
                              auction.cdpCollateral,
                              auction.cdpDebt,
                              auction.cdpFee,
                              props.ethPrice
                            )}
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
