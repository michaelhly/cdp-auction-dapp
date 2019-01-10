import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import BigNumber from "bignumber.js";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import InfoCard from "../common/InfoCard";
import TokenPanel from "./TokenPanel";
import AuctionOrderbox from "./AuctionOrderbox";
import AuctionOrderbook from "./AuctionOrderbook";
import { auctionStatus, convertExpiryBlocks } from "../../utils/helpers";

const ERC20 = require("../../artifacts/IERC20.json");
const AddressBook = require("../../utils/addressBook.json");
const Tokens = require("../../utils/tokens.json");

const Auction = props => {
  const web3 = useWeb3Context();
  const [auction, setAuction] = useState(
    props.location.state ? props.location.state.auction : null
  );
  const [tokens, setTokens] = useState([]);
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
        console.log(err);
      }
    }
    setTokens(tokenArray);
  };

  const handleNewBid = event => {
    const copy = auction;
    const newBidId = event.LogSubmittedBid.returnValues.bidId;
    copy.bids = [newBidId, ...copy.bids];
    setAuction(copy);
  };

  const handleSale = event => {
    const transferLog = event.LogCDPTransfer.returnValues;
    const saleLog = event.LogConclusion.returnValues;
    const copy = auction;
    copy.state = 3;
    const index = copy.bids.indexOf(saleLog.bidId);
    //Force re-render if no new bidId
    copy.bids =
      index === -1 ? [saleLog.bidId, ...copy.bids] : ["0x0", ...copy.bids];
    setAuction(copy);

    const cdp = {
      cup: transferLog.cdp,
      id: web3.web3js.utils.hexToNumber(transferLog.cdp)
    };
    props.onSale(auction.id, transferLog.to, cdp);
  };

  const handleApproval = async token => {
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
    if (
      auction.seller !== web3.account &&
      auction.state < 2 &&
      convertExpiryBlocks(auction.expiry) !== "Expired"
    ) {
      return (
        <React.Fragment>
          {expiryBanner()}
          <AuctionOrderbox
            tokenStates={tokens}
            auction={auction}
            formInputs={orderInputs}
            onFormInput={handleOrderInputs}
            onSale={handleSale}
            onNewBid={handleNewBid}
            onModal={props.onModal}
            onApprove={handleApproval}
          />
        </React.Fragment>
      );
    }
  };

  useAccountEffect(
    () => {
      setTokens([]);
      fetchTokens();
    },
    [auction ? auction.bids : null]
  );

  return (
    <React.Fragment>
      {auction ? (
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <TokenPanel
                tokens={tokens}
                account={web3.account}
                onApprove={handleApproval}
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
                        <span className="badge badge-pill badge-success">
                          Live
                        </span>
                      ) : (
                        <span className="badge badge-pill badge-dark">
                          {auctionStatus(auction.state)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <InfoCard auction={auction} type="AUCTION" />
                <div className="row shadow-sm mb-3">{actionBox()}</div>
                <AuctionOrderbook
                  auction={auction}
                  account={web3.account}
                  onSale={handleSale}
                  onModal={props.onModal}
                />
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
