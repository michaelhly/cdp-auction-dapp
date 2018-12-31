import React from "react";

import SidePanel from "./SidePanel";
import Blockie from "./Blockie";
import DisplayLoading from "./DisplayLoading";

const TokenManager = props => {
  const displayToken = (token, handleClick) => {
    if (token.approving) {
      return (
        <div>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            {token.symbol}
            <span>
              <DisplayLoading />
            </span>
          </li>
        </div>
      );
    } else if (token.allowance === 0 || token.allowance < token.balance) {
      return (
        <div>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            {token.symbol}
            <span>
              <button
                type="button"
                class="btn btn-link btn-sm ml-2"
                onClick={() => handleClick(token)}
                style={{
                  textDecoration: "none",
                  color: "grey",
                  outline: "none"
                }}
              >
                {token.balance}
              </button>
            </span>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            {token.symbol}
            <span>{token.balance}</span>
          </li>
        </div>
      );
    }
  };

  const displayPanel = () => {
    console.log(props);
    if (props.loading) {
      return <DisplayLoading size="large" />;
    } else {
      return (
        <React.Fragment>
          <Blockie address={props.account} label="Account" />
          <div>
            <h6 style={{ marginTop: "2em" }}>Your Tokens</h6>
            <ul class="list-group list-group-flush">
              {props.tokens.map(token => {
                return displayToken(token, props.handleClick);
              })}
            </ul>
          </div>
        </React.Fragment>
      );
    }
  };

  return <SidePanel display={displayPanel} />;
};

export default TokenManager;
