import React from "react";
import {
  convertExpiryBlocks,
  getTokenSymbolByAddress
} from "../../utils/helpers";
import OrderForm from "../common/OrderForm";
import DisplayLoading from "../common/DisplayLoading";

const AuctionOrderbox = props => {
  const ask = props.ask;

  const stageBidOrder = button => {
    const formInputs = { ...props.formInputs };
    const value = button === "BID" ? formInputs.amount : ask;
    const token =
      button === "BID"
        ? formInputs.token
        : getTokenSymbolByAddress(props.askTokenAddr, props.tokenStates);
    const params = {
      id: props.id,
      token: token,
      value: value,
      expiry: formInputs.expiry
    };
    props.onModal("submitBid", params, props.onUpdate);
  };

  const toggleButtons = (tokenIdentifier, lookUpTarget, button) => {
    const token = props.tokenStates.find(
      t => t[tokenIdentifier].toLowerCase() === lookUpTarget.toLowerCase()
    );

    if (
      !token ||
      (token.approving && button === "BID" && tokenIdentifier === "symbol") ||
      (token.approving && button === "BUY" && tokenIdentifier === "address")
    ) {
      return <DisplayLoading />;
    } else if (
      (token.allowance === 0 && button === "BID") ||
      (token.allowance < ask && button === "BUY")
    ) {
      return (
        <button
          type="button"
          className="btn btn-success"
          onClick={() => props.handleApproval(token)}
        >
          Approve Token
        </button>
      );
    } else {
      return button === "BUY" ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => stageBidOrder("BUY")}
        >
          Take CDP
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => stageBidOrder("BID")}
        >
          Make Offer
        </button>
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
        <div className="card-body">
          <h6 className="card-title" style={{ color: "grey" }}>
            Listed for
          </h6>
          <div className="p-0">
            <p className="ask price" style={{ fontSize: "48px" }}>
              {ask}{" "}
              {getTokenSymbolByAddress(props.askTokenAddr, props.tokenStates)}
            </p>
            <div style={{ marginTop: "72px" }}>
              {toggleButtons("address", props.askTokenAddr, "BUY")}
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 border">
        <div className="card-body">
          <h6 className="card-title" style={{ color: "grey" }}>
            Submit a bid
          </h6>
          <OrderForm
            formInputs={props.formInputs}
            onFormInput={props.onFormInput}
            formType="B"
          />
          {toggleButtons("symbol", props.formInputs.token, "BID")}
        </div>
      </div>
    </div>
  );
};

export default AuctionOrderbox;
