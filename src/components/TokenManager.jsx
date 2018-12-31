import React, { useState } from "react";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import SidePanel from "./SidePanel";
import Blockie from "./Blockie";
import DisplayLoading from "./DisplayLoading";

const TokenManager = () => {
  const web3 = useWeb3Context();
  const [account, setAccount] = useState(web3.account);
  const [loading, setLoading] = useState(true);

  const displayPanel = () => {
    if (loading) {
      return <DisplayLoading />;
    }
  };

  useAccountEffect(() => {
    setAccount(web3.account);
    setLoading(false);
  });

  return <SidePanel display={displayPanel} />;
};

export default TokenManager;
