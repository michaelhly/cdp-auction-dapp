import React, { useState } from "react";
import { BLOCKS_PER_DAY, random, extractFunction } from "../utils/helpers";
import { useWeb3Context } from "web3-react/hooks";
import OrderForm from "./OrderForm";

const BN = require("bn.js");
const AddressBook = require("../utils/addressBook.json");
const Tokens = require("../utils/tokens.json");
const DSProxy = require("../artifacts/DSProxy.json");
const AuctionProxy = require("../artifacts/AuctionProxy.json");

function ListingForm(props) {
  const web3 = useWeb3Context();
  const [orderToken, setOrderToken] = useState(" ");
  const [orderAmount, setOrderAmount] = useState(0);
  const [orderExpiry, setOrderExpiry] = useState(0);

  const callProxy = async calldata => {
    const proxyInstance = new web3.web3js.eth.Contract(
      DSProxy.abi,
      props.proxy
    );
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

  const handleTokenInput = e => {
    setOrderToken(e.target.value);
  };

  const handleAmountInput = e => {
    setOrderAmount(e.target.value);
  };

  const handleExpiryInput = e => {
    setOrderExpiry(e.target.value);
  };

  return (
    <div className="text-align-left">
      <button
        type="button"
        className="btn btn-light btn-sm"
        onClick={() => props.onBack()}
        style={{ marginBottom: "1.25em" }}
      >
        Back
      </button>
      <div>
        <h6>Listing </h6>
      </div>
      <div style={{ marginBottom: "1em" }}>
        <h6>CDP {props.cdp.id}</h6>
      </div>
      <OrderForm
        formStates={{ orderToken, orderAmount, orderExpiry }}
        onFormInputs={{
          handleTokenInput,
          handleAmountInput,
          handleExpiryInput
        }}
        formType="L"
      />
      <button
        type="button"
        className="btn btn-success btn-sm"
        onClick={() => listCDP()}
        style={{ marginTop: "1.5em" }}
      >
        Submit Listing
      </button>
    </div>
  );
}

export default ListingForm;
