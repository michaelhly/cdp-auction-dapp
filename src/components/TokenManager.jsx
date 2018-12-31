import React, { useEffect, useState } from "react";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import BigNumber from "bignumber.js";
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

        var tokenAllowance = await tokenInstance.methods
          .allowance(web3.account, AddressBook.kovan.auction)
          .call();

        tokenArray.push({
          address: token.address,
          symbol: token.symbol,
          balance:
            parseInt(web3.web3js.utils.fromWei(tokenBalance, "ether") * 100) /
            100,
          allowance: parseInt(
            web3.web3js.utils.fromWei(tokenAllowance, "ether")
          ),
          approving: false
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    setTokens(tokenArray);
    setLoading(false);
  };

  const approveToken = async (token, fromButton) => {
    const tokenInstance = new web3.web3js.eth.Contract(
      ERC20.abi,
      token.address
    );

    try {
      return await tokenInstance.methods
        .approve(
          AddressBook.kovan.auction,
          new BigNumber(2 ** 256 - 1).toFixed()
        )
        .send({ from: web3.account })
        .on("transaction", txHash => {
          console.log(txHash);
        });
    } catch (err) {
      if (fromButton) {
        const copy = [...tokens];
        const index = tokens.indexOf(token);
        copy[index] = { ...token };
        copy[index].approving = false;
        setTokens(copy);
      }
      return new Error("failed to submit transaction");
    }
  };

  const handleClick = async token => {
    const copy = [...tokens];
    const index = tokens.indexOf(token);
    copy[index] = { ...token };
    copy[index].approving = true;
    setTokens(copy);

    var tx = null;
    try {
      tx = await approveToken(token, true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const displayToken = token => {
    console.log("hello", token, token.approving);
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
                onClick={e => handleClick(token)}
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
    if (loading) {
      return <DisplayLoading size="large" />;
    } else {
      return (
        <React.Fragment>
          <Blockie address={account} label="Account" />
          <div>
            <h6 style={{ marginTop: "2em" }}>Your Tokens</h6>
            <ul class="list-group list-group-flush">
              {tokens.map(token => {
                return displayToken(token);
              })}
            </ul>
          </div>
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
