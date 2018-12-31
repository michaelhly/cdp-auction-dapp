import React from "react";
import { convertExpiryBlocks } from "../utils/helpers";

const AuctionOrderbox = props => {
  return (
    <div className="container-fluid flex-column">
      <div className="row">
        <div className="col p-0 justify-content-center align-self-center">
          <div className="card-header m-0" style={{ padding: "5px" }}>
            <font size="2">Expires in {convertExpiryBlocks(props.expiry)}</font>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col">
            <div class="border border-right-0">
              <div class="card-body">
                <h5 class="card-title">Listed for</h5>
                <p class="card-text">{props.ask}</p>
                <a href="#" class="btn btn-primary">
                  Buy Now
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="border">
              <div class="card-body">
                <h5 class="card-title">Submit a bid</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" class="btn btn-outline-primary">
                  Make Offer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionOrderbox;
