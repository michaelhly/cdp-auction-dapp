import React from "react";
import { BLOCKS_PER_DAY } from "../utils/helpers";
const Tokens = require("../utils/tokens.json");

const OrderForm = props => {
  return (
    <form>
      <div style={{ textAlign: "left", fontSize: "11px", marginBottom: "1em" }}>
        <label for="token-input">Recieve Token: </label>
        <select
          className="form-control form-control p-1"
          id="token-input"
          value={props.symbol}
          onChange={e => props.onTokenInput(e)}
          style={{ marginTop: "-9px", marginBottom: "1em" }}
        >
          {Tokens.kovan.map(token => (
            <option>{token.symbol}</option>
          ))}
        </select>
        <label>Asking amount: </label>
        <input
          className="form-control"
          type="text"
          id="ask"
          placeholder="token(s)"
          value={props.ask}
          onChange={e => props.onAskInput(e)}
          style={{ marginTop: "-9px", marginBottom: "1em" }}
        />
        <label>Expiration: </label>
        <input
          className="form-control"
          type="text"
          id="expiry"
          placeholder="day(s)"
          value={props.expiry}
          onChange={e => props.onExpiryInput(e)}
          style={{ marginTop: "-9px" }}
        />
      </div>
      <div
        className="day-in-blocks"
        style={{ textAlign: "right", fontSize: "11px", marginTop: "-9px" }}
      >
        {Math.round(BLOCKS_PER_DAY * props.expiry)} blocks
      </div>
    </form>
  );
};

export default OrderForm;
