import React from "react";
import { BLOCKS_PER_DAY } from "../../utils/helpers";
const Tokens = require("../../utils/tokens.json");

const OrderForm = props => {
  const tokens = Tokens.kovan;
  const formType = props.formType;
  const onFormInput = props.onFormInput;
  const { token, amount, expiry } = props.formInputs;

  const formToggler = () => {
    if (formType === "L") {
      return (
        <div
          style={{ textAlign: "left", fontSize: "11px", marginBottom: "1em" }}
        >
          <label>Recieve token: </label>
          <select
            className="form-control form-control-sm"
            id="token-input"
            name="token"
            value={token}
            onChange={e => onFormInput(e)}
            style={{ marginTop: "-5px", marginBottom: "1em" }}
          >
            {tokens.map(token => (
              <option key={token.symbol}>{token.symbol}</option>
            ))}
          </select>

          <label>Asking amount: </label>
          <input
            className="form-control form-control-sm"
            type="number"
            id="amount-input"
            name="amount"
            placeholder="token(s)"
            value={amount}
            onChange={e => onFormInput(e)}
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
          <div className="input-group">
            <input
              className="form-control form-control-sm"
              type="number"
              min="0"
              id="amount-input"
              name="amount"
              placeholder="token(s)"
              value={amount}
              onChange={e => onFormInput(e)}
              style={{ marginTop: "-5px" }}
            />
            <span className="input-group-btn">
              <select
                className="btn btn-light mr-1"
                id="token-input"
                name="token"
                value={token}
                onChange={e => onFormInput(e)}
              >
                {Tokens.kovan.map(token => (
                  <option key={token.symbol}>{token.symbol}</option>
                ))}
              </select>
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <form>
        {formToggler()}
        <div
          style={{ textAlign: "left", fontSize: "11px", marginBottom: "1em" }}
        >
          <label>Expiration: </label>
        </div>
        <input
          className="form-control form-control-sm"
          type="number"
          min="0"
          id="expiry-input"
          name="expiry"
          placeholder="day(s)"
          value={expiry}
          onChange={e => onFormInput(e)}
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
          {Math.round(BLOCKS_PER_DAY * expiry)} blocks
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
