import React, { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import { loadBids } from "../../services/AuctionService";
import TokenManager from "../TokenPanel/TokenPanel";
import AuctionOrderbox from "./AuctionOrderbox";
import InfoCard from "./InfoCard";
import TokenPanel from "../TokenPanel/TokenPanel";

const ERC20 = require("../../artifacts/IERC20.json");
const AddressBook = require("../../utils/addressBook.json");
const Tokens = require("../../utils/tokens.json");

const Auction = props => {
  const auction = props.auction;
  const web3 = useWeb3Context();
  const [account, setAccount] = useState(web3.account);
  const [tokens, setTokens] = useState([]);
  const [book, setBook] = useState([]);
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
          console.log(
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
      copy[index].allowance = tx.events.Approval.returnValues.value;
      setTokens(copy);
    }
  };

  const handleOrderInputs = e => {
    const newOrderInputs = { ...orderInputs };
    newOrderInputs[e.currentTarget.name] = e.currentTarget.value;
    setOrderInputs(newOrderInputs);
  };

  const fetchBook = async () => {
    const bookForThisAuction = await loadBids(auction.id);
    setBook(bookForThisAuction);
  };

  const displayBidRelated = handleApproval => {
    if (auction.seller !== account) {
      return (
        <AuctionOrderbox
          tokenStates={tokens}
          id={auction.id}
          expiry={auction.expiry}
          askTokenAddr={auction.token}
          ask={auction.ask}
          formInputs={orderInputs}
          onFormInput={handleOrderInputs}
          handleApproval={approveToken}
        />
      );
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  useAccountEffect(() => {
    setLoading(true);
    setAccount(web3.account);
    fetchTokens();
    setLoading(false);
  });

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <TokenPanel
              loading={loading}
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
                  <h2 className="title mb-4">CDP {auction.cdpId}</h2>
                </div>
              </div>
              <InfoCard auction={auction} ethPrice={props.ethPrice} />
              {displayBidRelated({ approveToken })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auction;
