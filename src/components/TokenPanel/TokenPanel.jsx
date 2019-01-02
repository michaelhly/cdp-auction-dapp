import React from "react";

import SidePanel from "../common/SidePanel";
import Blockie from "../common/Blockie";
import TokenContainer from "./TokenContainer";
import DisplayLoading from "../common/DisplayLoading";

const TokenPanel = props => {
  if (props.loading) {
    return (
      <SidePanel>
        <DisplayLoading />
      </SidePanel>
    );
  } else {
    return (
      <SidePanel>
        <Blockie address={props.account} label="Account" />
        <div>
          <TokenContainer
            tokens={props.tokens}
            handleApproval={props.handleApproval}
          />
        </div>
      </SidePanel>
    );
  }
};

export default TokenPanel;
