import React from "react";
import { Spin, Icon } from "antd";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import SidePanel from "./SidePanel";
import Blockie from "./Blockie";

const TokenManager = () => {
  const displayPanel = () => {};

  useAccountEffect(() => {});

  return <SidePanel display={displayPanel} />;
};

export default TokenManager;
