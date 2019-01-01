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
          <h6 class="card-title" style={{ color: "grey" }}>
            Listed for
          </h6>
          <div class="p-0">
            <p class="ask price" style={{ fontSize: "82px" }}>
              {props.ask}
            </p>
          </div>

          <a href="#" class="btn btn-primary" style={{ marginTop: "4px" }}>
            Buy Now
          </a>
        </div>
      </div>
      <div className="col-6 border">
        <div class="card-body">
          <h6 class="card-title" style={{ color: "grey" }}>
            Submit a bid
          </h6>
          <OrderForm
            formStates={props.formStates}
            onFormInputs={props.onFormInputs}
            formType="B"
          />
          <a href="#" class="btn btn-outline-primary">
            Make Offer
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuctionOrderbox;
