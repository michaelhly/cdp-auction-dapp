import React, { useState } from "react";
import OrderForm from "../common/OrderForm";

function ListingForm(props) {
  const [orderInputs, setOrderInputs] = useState({
    token: "WETH",
    amount: 0,
    expiry: 0
  });

  const stageCdpListing = () => {
    const params = {
      cup: props.cdp.cup,
      token: orderInputs.token,
      ask: orderInputs.amount,
      expiry: orderInputs.expiry
    };
    props.onModal("createAuction", params);
    props.onBack();
  };

  const handleOrderInputs = e => {
    const newOrderInputs = { ...orderInputs };
    newOrderInputs[e.currentTarget.name] = e.currentTarget.value;
    setOrderInputs(newOrderInputs);
  };

  return (
    <div className="text-align-left">
      <button
        type="button"
        className="btn btn-light btn-sm"
        onClick={() => props.onBack()}
        style={{ marginBottom: "1.25em" }}
      >
        Back
      </button>
      <div>
        <h6>Listing </h6>
      </div>
      <div style={{ marginBottom: "1em" }}>
        <h6>CDP {props.cdp.id}</h6>
      </div>
      <OrderForm
        formInputs={orderInputs}
        onFormInput={handleOrderInputs}
        formType="L"
      />
      <button
        type="button"
        className="btn btn-success btn-sm"
        onClick={() => stageCdpListing()}
        style={{ marginTop: "1.5em" }}
      >
        Submit Listing
      </button>
    </div>
  );
}

export default ListingForm;
