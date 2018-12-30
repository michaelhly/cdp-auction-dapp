import React from "react";
import { Link } from "react-router-dom";
import { BLOCKS_PER_DAY } from "../../common/helpers";

const Listing = props => {
  const bidUnit = bids => {
    return bids === 1 ? "Bid" : "Bids";
  };

  const convertExpiryBlocks = expiry => {
    var days = expiry / BLOCKS_PER_DAY;
    if (days < 1) {
      var hours = days * 24;
      if (hours < 1) {
        var minutes = hours * 60;
        if (minutes < 1) {
          return "< 1 minute";
        } else {
          return Math.round(minutes) === 1
            ? "1 minute"
            : `${Math.round(minutes)} minutes`;
        }
      } else {
        return Math.round(hours) === 1
          ? "1 hour"
          : `${Math.round(hours)} hours`;
      }
    } else {
      return Math.round(days) === 1 ? "1 day" : `${Math.round(days)} days`;
    }
  };

  return (
    <div class="shadow float-right w-100 mb-5 bg-white rounded">
      <Link
        className="auction-link"
        to={`/${props.auction.id}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        <div className="card-body">
          <div className="container">
            <div className="row justify-content-center align-self-center">
              <div className="col-sm-offeset-3 center-block ml-4 p-3">
                <h5 className="CDP-ID">CDP {props.auction.cdpId}</h5>
              </div>
              <div className="col-sm-offset-3 center-block ml-4  p-3">
                <font className="Value"> Value Ξ 0 </font>
              </div>
              <div className="col-sm-offset-3 center-block ml-2 p-3">
                <font className="Bids">
                  {props.auction.bids.length}{" "}
                  {bidUnit(props.auction.bids.length)}
                </font>
              </div>
              <div className="col-lg-auto center-block ml-2 p-3">
                <font className="Expiry">
                  Expire in {convertExpiryBlocks(props.auction.expiry)}
                </font>
              </div>
              <div className="col-sm center-block ml-4 p-3">
                <button type="button" class="btn btn-light btn-sm">
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
