import React from "react";
import { Link } from "react-router-dom";
import { convertExpiryBlocks, calcValue } from "../../common/helpers";

const Listing = props => {
  const auction = props.auction;

  return (
    <div class="shadow float-right w-100 mb-5 bg-white rounded">
      <Link
        className="auction-link"
        to={`/${auction.id}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        <div className="card-body">
          <div className="container">
            <div className="row flex-nowrap">
              <div className="col-3 p-3">
                <p className="h4">CDP {auction.cdpId}</p>
              </div>
              <div className="col-2 ml-4">
                <h6 style={{ color: "rgb(85, 85, 85)" }}>Value</h6>
                <font size="4">
                  Ξ{" "}
                  {calcValue(
                    auction.cdpCollateral,
                    auction.cdpDebt,
                    auction.cdpFee,
                    props.ethPrice
                  )}
                </font>
              </div>
              <div className="col-2">
                <h6 style={{ color: "rgb(85, 85, 85)" }}>Bids</h6>
                <font size="4">{auction.bids.length}</font>
              </div>
              <div className="col-2">
                <h6 style={{ color: "rgb(85, 85, 85)" }}>Expire in</h6>
                <font size="4">{convertExpiryBlocks(auction.expiry)}</font>
              </div>
              <div className="col-3 p-2 ml-4">
                <button type="button" class="btn btn-light btn">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Listing;
