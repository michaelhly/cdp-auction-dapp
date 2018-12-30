import React from "react";
import { Link } from "react-router-dom";
import { BLOCKS_PER_DAY } from "../../common/helpers";

const Listing = props => {
  const convertExpiryBlocks = expiry => {
    console.log(props.auction);
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
            <div className="row flex-nowrap">
              <div className="col-3 p-3">
                <p className="h4">CDP {props.auction.cdpId}</p>
              </div>
              <div className="col-2 ml-4">
                <h6 style={{ color: "rgb(85, 85, 85)" }}>Value</h6>
                <font size="4">Ξ 0</font>
              </div>
              <div className="col-2">
                <h6 style={{ color: "rgb(85, 85, 85)" }}>Bids</h6>
                <font size="4">{props.auction.bids.length}</font>
              </div>
              <div className="col-2">
                <h6 style={{ color: "rgb(85, 85, 85)" }}>Expire in</h6>
                <font size="4">
                  {convertExpiryBlocks(props.auction.expiry)}
                </font>
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
