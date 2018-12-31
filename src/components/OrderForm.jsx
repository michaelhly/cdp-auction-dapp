import React from "react";
import { BLOCKS_PER_DAY } from "../utils/helpers";
const Tokens = require("../utils/tokens.json");

const OrderForm = props => {
  const formType = props.formType;
  var { orderToken, orderAmount, orderExpiry } = props.formStates;
  const {
    handleTokenInput,
    handleAmountInput,
    handleExpiryInput
  } = props.onFormInputs;

  const labelToggler = (formType, formField) => {
    console.log(formType);
    if (formField === "ASK") {
      return formType === "L" ? (
        <label>Asking amount: </label>
      ) : (
        <label>Bid amount: </label>
      );
    }
    if (formField === "TOKEN") {
      return formType === "L" ? (
        <label>Recieve token: </label>
      ) : (
        <label>Send token: </label>
      );
    }
  };

  return (
    <form>
      <div style={{ textAlign: "left", fontSize: "11px", marginBottom: "1em" }}>
        {labelToggler(formType, "TOKEN")}
        <select
          className="form-control form-control p-1"
          id="token-input"
          value={orderToken}
          onChange={e => handleTokenInput(e)}
          style={{ marginTop: "-9px", marginBottom: "1em" }}
        >
          {Tokens.kovan.map(token => (
            <option>{token.symbol}</option>
          ))}
        </select>
        {labelToggler(formType, "ASK")}
        <input
          className="form-control"
          type="text"
          id="amount-input"
          placeholder="token(s)"
          value={orderAmount}
          onChange={e => handleAmountInput(e)}
          style={{ marginTop: "-9px", marginBottom: "1em" }}
        />
        <label>Expiration: </label>
        <input
          className="form-control"
          type="text"
          id="expiry-input"
          placeholder="day(s)"
          value={orderExpiry}
          onChange={e => handleExpiryInput(e)}
          style={{ marginTop: "-9px" }}
        />
      </div>
      <div
        className="day-in-blocks"
        style={{ textAlign: "right", fontSize: "11px", marginTop: "-9px" }}
      >
        {Math.round(BLOCKS_PER_DAY * orderExpiry)} blocks
      </div>
    </form>
  );
};

export default OrderForm;
