import React from "react";
import DisplayLoading from "../common/DisplayLoading";
import { round2Decimals } from "../../utils/helpers";

const TokenContainer = props => {
  const displayTokenStatus = token => {
    if (token.approving) {
      return (
        <span>
          <DisplayLoading />
        </span>
      );
    } else if (token.allowance === 0 || token.allowance < token.balance) {
      return (
        <span>
          <button
            type="button"
            className="btn btn-link btn-sm"
            onClick={() => props.onApprove(token)}
            style={{ textDecoration: "none", color: "grey", outline: "none" }}
          >
            {token.balance}
          </button>
        </span>
      );
    } else {
      return (
        <span className={token.balance / 1000 >= 1 ? "ml-3" : "mr-2"}>
          {round2Decimals(token.balance)}
        </span>
      );
    }
  };

  return (
    <div>
      <h6 style={{ marginTop: "2em" }}>Your Tokens</h6>
      <ul className="list-group list-group-flush">
        {props.tokens.map(token => {
          return (
            <li
              key={token.symbol}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {token.symbol}
              {displayTokenStatus(token)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TokenContainer;
