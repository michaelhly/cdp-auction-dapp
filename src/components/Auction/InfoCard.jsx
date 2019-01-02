import React from "react";
import { calcValue } from "../../utils/helpers";

const InfoCard = props => {
  const auction = props.auction;
  const trimAddress = addr => {
    return [addr.substring(0, 30), "..."];
  };
  return (
    <div className="row">
      <div className="col p-0">
        <div className="card shadow-sm mb-3 bg-white rounded">
          <div className="card-body">
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
                  Liquidation Price:{" "}
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
  );
};

export default InfoCard;
