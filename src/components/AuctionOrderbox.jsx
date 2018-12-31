import React from "react";
import { convertExpiryBlocks } from "../utils/helpers";
import OrderForm from "./OrderForm";

const AuctionOrderbox = props => {
  return (
    <div className="row">
      <div className="col-12 p-0">
        <div className="card-header" style={{ padding: "5px" }}>
          <font size="2">Expires in {convertExpiryBlocks(props.expiry)}</font>
        </div>
      </div>
      <div className="col-6 border border-right-0">
        <div class="card-body">
          <h5 class="card-title">Listed for</h5>
          <p class="card-text">{props.ask}</p>
          <a href="#" class="btn btn-primary">
            Buy Now
          </a>
        </div>
      </div>
      <div className="col-6 border">
        <div class="card-body">
          <h5 class="card-title">Submit a bid</h5>
          <OrderForm
            formStates={props.formStates}
            onFormInputs={props.onFormInputs}
            formType="B"
          />
          <a href="#" class="btn btn-primary">
            Make Offer
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuctionOrderbox;
