import React from "react";

import SidePanel from "../common/SidePanel";
import Blockie from "../common/Blockie";
import TokenContainer from "./TokenContainer";
import DisplayLoading from "../common/DisplayLoading";

const TokenPanel = props => {
  if (props.tokens.length === 0) {
    return (
      <SidePanel>
        <div className="mt-4">
          <DisplayLoading size="large" />
        </div>
      </SidePanel>
    );
  } else {
    return (
      <SidePanel>
        <Blockie address={props.account} label="Account" />
        <div>
          <TokenContainer tokens={props.tokens} onApprove={props.onApprove} />
        </div>
      </SidePanel>
    );
  }
};

export default TokenPanel;
