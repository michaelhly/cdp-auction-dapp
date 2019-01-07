import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import BigNumber from "bignumber.js";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import AuctionOrderbox from "./AuctionOrderbox";
import InfoCard from "../common/InfoCard";
import TokenPanel from "./TokenPanel";
import { auctionStatus, convertExpiryBlocks } from "../../utils/helpers";

const ERC20 = require("../../artifacts/IERC20.json");
const AddressBook = require("../../utils/addressBook.json");
const Tokens = require("../../utils/tokens.json");

const Auction = props => {
  const auction = props.location.state ? props.location.state.auction : null;
  const web3 = useWeb3Context();
  const [account, setAccount] = useState(web3.account);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderInputs, setOrderInputs] = useState({
    token: "WETH",
    amount: 0,
    expiry: 0
  });

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
  };

  const approveToken = async token => {
    let copy = [...tokens];
    const index = tokens.indexOf(token);
    copy[index] = { ...token };
    copy[index].approving = true;
    setTokens(copy);

    const tokenInstance = new web3.web3js.eth.Contract(
      ERC20.abi,
      token.address
    );

    var tx = null;
    try {
      tx = await tokenInstance.methods
        .approve(
          AddressBook.kovan.auction,
          new BigNumber(2 ** 256 - 1).toFixed()
        )
        .send({ from: web3.account })
        .on("transactionHash", function(hash) {
          alert(
            `Submitted transaction to approve ${
              token.symbol
            } for Auction.\n TxHash: ${hash}`
          );
        });
    } catch (err) {
      copy[index].approving = false;
      setTokens(copy);
    }
    if (tx) {
      copy[index].approving = false;
      copy[index].allowance = Number.MAX_SAFE_INTEGER;
      setTokens(copy);
    }
  };

  const handleOrderInputs = e => {
    const newOrderInputs = { ...orderInputs };
    newOrderInputs[e.currentTarget.name] = e.currentTarget.value;
    setOrderInputs(newOrderInputs);
  };

  const expiryBanner = () => {
    return (
      <div className="col-12 p-0">
        <div className="card-header" style={{ padding: "5px" }}>
          <font size="2">
            {convertExpiryBlocks(auction.expiry) === "Expired"
              ? "Expired"
              : `Expires in ${convertExpiryBlocks(auction.expiry)}`}
          </font>
        </div>
      </div>
    );
  };

  const actionBox = () => {
    if (auction.seller !== account) {
      return (
        <React.Fragment>
          {expiryBanner()}
          <AuctionOrderbox
            tokenStates={tokens}
            id={auction.id}
            expiry={auction.expiry}
            askTokenAddr={auction.token}
            ask={auction.ask}
            formInputs={orderInputs}
            onFormInput={handleOrderInputs}
            onModal={props.onModal}
            onUpdate={props.onUpdate}
            handleApproval={approveToken}
          />
        </React.Fragment>
      );
    }
  };

  useAccountEffect(() => {
    setTokens([]);
    if (!loading) {
      setLoading(true);
    }
    setAccount(web3.account);
    fetchTokens();
    setLoading(false);
  });

  return (
    <React.Fragment>
      {auction ? (
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <TokenPanel
                tokens={tokens}
                account={account}
                handleApproval={approveToken}
              />
            </div>
            <div
              className="col-8"
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <div className="container-fluid">
                <div className="row">
                  <div className="col p-0">
                    <div>
                      <h2
                        className="title mb-4 mr-2"
                        style={{ display: "inline-block" }}
                      >
                        CDP {auction.cdpId}{" "}
                      </h2>
                      {auctionStatus(auction.state) === "Active" ? (
                        <span class="badge badge-pill badge-success">Live</span>
                      ) : (
                        <span class="badge badge-pill badge-dark">
                          {auctionStatus(auction.state)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <InfoCard auction={auction} type="AUCTION" />
                <div className="row shadow-sm">{actionBox()}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>Something went wrong!</div>
          <Redirect to="/" />
        </div>
      )}
    </React.Fragment>
  );
};

export default Auction;
