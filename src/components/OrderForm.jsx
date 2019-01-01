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

  const labelToggler = formType => {
    return formType === "L" ? (
      <label>Asking amount: </label>
    ) : (
      <label>Bid amount: </label>
    );
  };

  const upperForm = (
    tokens,
    orderToken,
    orderAmount,
    handleTokenInput,
    handleAmountInput
  ) => {
    if (formType == "L") {
      return (
        <div
          style={{ textAlign: "left", fontSize: "11px", marginBottom: "1em" }}
        >
          <label>Recieve token: </label>
          <select
            className="form-control form-control-sm"
            id="token-input"
            value={orderToken}
            onChange={e => handleTokenInput(e)}
            style={{ marginTop: "-5px", marginBottom: "1em" }}
          >
            {tokens.map(token => (
              <option>{token.symbol}</option>
            ))}
          </select>

          <label>Asking amount: </label>
          <input
            className="form-control form-control-sm"
            type="text"
            id="amount-input"
            placeholder="token(s)"
            value={orderAmount}
            onChange={e => handleAmountInput(e)}
            style={{ marginTop: "-5px", marginBottom: "1em" }}
          />
        </div>
      );
    } else {
      return (
        <div
          style={{ textAlign: "left", fontSize: "11px", marginBottom: "1em" }}
        >
          <label>Bid amount: </label>
          <div class="input-group-prepend">
            <span class="input-group-btn">
              <select
                class="btn btn-light mr-1"
                id="token-input"
                value={orderToken}
                onChange={e => handleTokenInput(e)}
              >
                {Tokens.kovan.map(token => (
                  <option>{token.symbol}</option>
                ))}
              </select>
            </span>
            <input
              type="text"
              className="form-control form-control-sm"
              type="text"
              id="amount-input"
              placeholder="token(s)"
              value={orderAmount}
              onChange={e => handleAmountInput(e)}
              style={{ marginTop: "-5px" }}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <form>
        {upperForm(
          Tokens.kovan,
          orderToken,
          orderAmount,
          handleTokenInput,
          handleAmountInput
        )}
        <div
          style={{ textAlign: "left", fontSize: "11px", marginBottom: "1em" }}
        >
          <label>Expiration: </label>
        </div>
        <input
          className="form-control form-control-sm"
          type="text"
          id="expiry-input"
          placeholder="day(s)"
          value={orderExpiry}
          onChange={e => handleExpiryInput(e)}
          style={{ marginTop: "-13px" }}
        />
        <div
          className="day-in-blocks"
          style={{
            textAlign: "right",
            fontSize: "11px",
            marginTop: "2px",
            marginBottom: "1em"
          }}
        >
          {Math.round(BLOCKS_PER_DAY * orderExpiry)} blocks
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
