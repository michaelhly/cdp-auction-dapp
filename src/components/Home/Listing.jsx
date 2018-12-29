import React from "react";
import { Link } from "react-router-dom";

const Listing = props => {
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
                <h5 className="CDP-ID">CDP {props.auction.cdp}</h5>
              </div>
              <div className="col-sm-offset-3 center-block ml-4  p-3">
                <font className="Value"> Value Ξ 0 </font>
              </div>
              <div className="col-sm-offset-3 center-block ml-2 p-3">
                <font className="Bids"> {props.auction.bids} Bids </font>
              </div>
              <div className="col-lg-auto center-block ml-2 p-3">
                <font className="Expiry">Expire in 5 days</font>
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
