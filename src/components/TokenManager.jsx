import React, { useEffect, useState } from "react";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import SidePanel from "./SidePanel";
import Blockie from "./Blockie";
import DisplayLoading from "./DisplayLoading";

const ERC20 = require("../artifacts/IERC20.json");
const AddressBook = require("../common/addressBook.json");
const Tokens = require("../common/tokens.json");

const TokenManager = () => {
  const web3 = useWeb3Context();
  const [account, setAccount] = useState(web3.account);
  const [tokens, setTokens] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const fetchTokens = async () => {
    var tokenArray = [];
    for (let i = 0; i < Tokens.kovan.length; i++) {
      const token = Tokens.kovan[i];
      const tokenInstance = new web3.web3js.eth.Contract(
        ERC20.abi,
        token.address
      );

      try {
        var tokenBalance = await tokenInstance.methods
          .balanceOf(web3.account)
          .call();
        console.log(tokenBalance);

        var tokenAllowance = await tokenInstance.methods
          .allowance(web3.account, AddressBook.kovan.auction)
          .call();

        console.log(tokenAllowance);

        tokenArray.push({
          symbol: token.symbol,
          balance: tokenBalance,
          allowance: tokenAllowance
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    setTokens(tokenArray);
    setLoading(false);
  };

  const displayPanel = () => {
    if (loading) {
      return <DisplayLoading size="large" />;
    } else {
      return (
        <React.Fragment>
          <Blockie address={account} label="Account" />
        </React.Fragment>
      );
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  useAccountEffect(() => {
    setLoading(true);
    setAccount(web3.account);
    fetchTokens();
  });

  return <SidePanel display={displayPanel} />;
};

export default TokenManager;
