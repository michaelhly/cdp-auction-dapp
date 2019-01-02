import React from "react";

import SidePanel from "../common/SidePanel";
import Blockie from "../common/Blockie";
import DisplayLoading from "../common/DisplayLoading";

const TokenManager = props => {
  const displayToken = (token, handleApproval) => {
    if (token.approving) {
      return (
        <li
          key={token.symbol}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {token.symbol}
          <span>
            <DisplayLoading />
          </span>
        </li>
      );
    } else if (token.allowance === 0 || token.allowance < token.balance) {
      return (
        <li
          key={token.symbol}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {token.symbol}
          <span>
            <button
              type="button"
              className="btn btn-link btn-sm"
              onClick={() => handleApproval(token)}
              style={{ textDecoration: "none", color: "grey", outline: "none" }}
            >
              {token.balance}
            </button>
          </span>
        </li>
      );
    } else {
      return (
        <li
          key={token.symbol}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {token.symbol}
          <span className={token.balance / 1000 >= 1 ? "ml-3" : "mr-2"}>
            {token.balance}
          </span>
        </li>
      );
    }
  };

  const displayPanel = () => {
    if (props.loading) {
      return <DisplayLoading size="large" />;
    } else {
      return (
        <React.Fragment>
          <Blockie address={props.account} label="Account" />
          <div>
            <h6 style={{ marginTop: "2em" }}>Your Tokens</h6>
            <ul className="list-group list-group-flush">
              {props.tokens.map(token => {
                return displayToken(token, props.handleApproval);
              })}
            </ul>
          </div>
        </React.Fragment>
      );
    }
  };

  return <SidePanel>{displayPanel()}</SidePanel>;
};

export default TokenManager;
