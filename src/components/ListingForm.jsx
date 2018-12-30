import React, { useState } from "react";
import { BLOCKS_PER_DAY, random, extractFunction } from "../utils/helpers";
import { useWeb3Context } from "web3-react/hooks";

const BN = require("bn.js");
const AddressBook = require("../utils/addressBook.json");
const Tokens = require("../utils/tokens.json");
const DSProxy = require("../artifacts/DSProxy.json");
const AuctionProxy = require("../artifacts/AuctionProxy.json");

function ListingForm(props) {
  const web3 = useWeb3Context();
  const [symbol, setSymbol] = useState([]);
  const [ask, setAsk] = useState(0);
  const [expiry, setExpiry] = useState(0);

  const callProxy = async calldata => {
    const proxyInstance = new web3.web3js.eth.Contract(
      DSProxy.abi,
      props.proxy
    );
    console.log(proxyInstance);
    await proxyInstance.methods["0x1cff79cd"](
      AddressBook.kovan.auctionProxy,
      calldata
    ).send({ from: web3.account });
  };

  const listCDP = () => {
    var input_symbol = document.getElementsByTagName("select")[0].value;
    var input_ask = document.getElementsByTagName("input")[1].value;
    var input_expiry = document.getElementsByTagName("input")[2].value;

    var token = Tokens.kovan.filter(token => token.symbol === input_symbol)[0];

    var amount = web3.web3js.utils.toWei(input_ask.toString(), "ether");
    console.log(amount);
    console.log(amount.toString());
    var expiryBlocks = new BN(Math.floor(BLOCKS_PER_DAY * input_expiry));
    var salt = new BN(random(10000000000000));

    const abi = extractFunction(AuctionProxy.abi, "createAuction");

    var parameters = [
      AddressBook.kovan.auction,
      AddressBook.kovan.saiTub,
      props.cdp.cup,
      token.address,
      amount.toString(),
      expiryBlocks.toString(),
      salt.toString()
    ];

    var calldata = web3.web3js.eth.abi.encodeFunctionCall(abi, parameters);
    callProxy(calldata);
  };

  const handleTokenChange = e => {
    setSymbol(e.target.value);
  };

  const handleAskChange = e => {
    setAsk(e.target.value);
  };

  const handleExpiryChange = e => {
    setExpiry(e.target.value);
  };

  return (
    <div class="text-align-left">
      <button
        type="button"
        class="btn btn-light btn-sm"
        onClick={() => props.onBack()}
      >
        Back
      </button>
      <h6>Listing CDP {props.cdp.id}</h6>
      <form>
        <div style={{ textAlign: "left", fontSize: "11px" }}>
          <label for="token-input">Token to recieve</label>
          <select
            class="form-control form-control"
            id="token-input"
            value={symbol}
            onChange={e => handleTokenChange(e)}
          >
            {Tokens.kovan.map(token => (
              <option>{token.symbol}</option>
            ))}
          </select>
          <label>Ask amount</label>
          <input
            class="form-control"
            type="text"
            id="ask"
            placeholder="token(s)"
            value={ask}
            onChange={e => handleAskChange(e)}
          />
          <label>Days to expiration</label>
          <input
            class="form-control"
            type="text"
            id="expiry"
            placeholder="day(s)"
            value={expiry}
            onChange={e => handleExpiryChange(e)}
          />
        </div>
        <div
          class="day-in-blocks"
          style={{ textAlign: "right", fontSize: "11px" }}
        >
          {Math.round(BLOCKS_PER_DAY * expiry)} blocks
        </div>
      </form>
      <button
        type="button"
        class="btn btn-primary btn-sm"
        onClick={() => listCDP()}
      >
        Submit Listing
      </button>
    </div>
  );
}

export default ListingForm;
