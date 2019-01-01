import React from "react";
import { convertExpiryBlocks } from "../../utils/helpers";
import OrderForm from "../common/OrderForm";
import DisplayLoading from "../common/DisplayLoading";

const AuctionOrderbox = props => {
  const token = props.tokenList.map(t => {
    if (t.address === props.askTokenAddr) return t;
    return -1;
  });

  const toggleButtons = (selected, ask, button, eventHandlers) => {
    const { handleApproval } = eventHandlers;
    if (
      (token.approving && button === "BUY") ||
      (selected.approving && button === "BID")
    ) {
      return <DisplayLoading />;
    } else if (
      (selected.allowance === 0 && button === "BID") ||
      (token.allowance < ask && button === "BUY")
    ) {
      return (
        <a class="btn btn-success" onClick={() => handleApproval(token, false)}>
          Approve Token
        </a>
      );
    } else {
      return button === "BUY" ? (
        <a href="#" class="btn btn-primary" style={{ marginTop: "4px" }}>
          Take CDP
        </a>
      ) : (
        <a href="#" class="btn btn-outline-primary">
          Make Offer
        </a>
      );
    }
  };

  return (
    <div className="row shadow-sm">
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
            {toggleButtons(
              props.selectedToken,
              props.ask,
              "BUY",
              props.handleApproval
            )}
          </div>
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
          {toggleButtons(
            props.selectedToken,
            props.ask,
            "BID",
            props.handleApproval
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionOrderbox;
