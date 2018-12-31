import React, { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import { convertExpiryBlocks, calcValue } from "../utils/helpers";
import { loadBids } from "../services/AuctionService";
import TokenManager from "./TokenManager";
import OrderBox from "./OrderBox";

const ERC20 = require("../artifacts/IERC20.json");
const AddressBook = require("../utils/addressBook.json");
const Tokens = require("../utils/tokens.json");

const Auction = props => {
  const auction = props.auction;
  const web3 = useWeb3Context();
  const [account, setAccount] = useState(web3.account);
  const [tokens, setTokens] = useState([]);
  const [bids, setBids] = useState([]);
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
  };

  const approveToken = async token => {
    const copy = [...tokens];
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
        .on("transaction", txHash => {
          console.log(txHash);
        });
    } catch (err) {
      console.log(err.message);
      const copy = [...tokens];
      const index = tokens.indexOf(token);
      copy[index] = { ...token };
      copy[index].approving = false;
      setTokens(copy);
    }
  };

  const fetchBids = async () => {
    const bidsForThisAuction = await loadBids(auction.id);
    setBids(bidsForThisAuction);
  };

  const displayBidRelated = (web3, auction) => {
    if (auction.seller !== web3.account) {
      return <OrderBox />;
    }
  };

  const trimAddress = addr => {
    return [addr.substring(0, 30), "..."];
  };

  useEffect(() => {
    fetchBids();
  }, []);

  useAccountEffect(() => {
    setLoading(true);
    setAccount(web3.account);
    fetchTokens();
    setLoading(false);
    console.log(tokens);
  });

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <TokenManager
              loading={loading}
              tokens={tokens}
              account={account}
              handleClick={approveToken}
            />
          </div>
          <div className="col-8">
            <h2 class="title mb-4">CDP {auction.cdpId}</h2>
            <div className="row">
              <div className="col">
                <div class="card shadow-sm mb-5 bg-white rounded">
                  <div class="card-body">
                    <div className="row">
                      <div className="col-8">
                        <h6 style={{ color: "rgb(85, 85, 85)" }}>
                          Seller:{" "}
                          <span style={{ color: "black" }}>
                            {trimAddress(auction.seller)}
                          </span>
                        </h6>
                      </div>
                      <div className="col-4">
                        <h6 style={{ color: "rgb(85, 85, 85)" }}>
                          Liquidation Price:{" "}
                          <span style={{ color: "black" }}>
                            ${auction.cdpLiquidation}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <h6 style={{ color: "rgb(85, 85, 85)" }}>
                          Collateral:{" "}
                          <span style={{ color: "black" }}>
                            {auction.cdpCollateral}
                          </span>
                        </h6>
                      </div>
                      <div className="col-4">
                        <h6 style={{ color: "rgb(85, 85, 85)" }}>
                          Debt:{" "}
                          <span style={{ color: "black" }}>
                            {auction.cdpDebt + auction.cdpFee}
                          </span>
                        </h6>
                      </div>
                      <div className="col-4">
                        <h6 style={{ color: "rgb(85, 85, 85)" }}>
                          Value: Ξ{" "}
                          <span style={{ color: "black" }}>
                            {calcValue(
                              auction.cdpCollateral,
                              auction.cdpDebt,
                              auction.cdpFee,
                              props.ethPrice
                            )}
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">{displayBidRelated(web3, auction)}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auction;
