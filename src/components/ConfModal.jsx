import React, { useState } from "react";
import Modal from "react-modal";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import {
  extractFunction,
  BLOCKS_PER_DAY,
  random,
  getTokenAddressBySymbol
} from "../utils/helpers";
import NoProxy from "./common/NoProxy";
import DisplayLoading from "./common/DisplayLoading";

const addressBook = require("../utils/addressBook.json");
const Tokens = require("../utils/tokens.json");
const AuctionProxy = require("../artifacts/AuctionProxy.json");
const Auction = require("../artifacts/Auction.json");
const DSProxy = require("../artifacts/DSProxy.json");

const customStyles = {
  content: {
    margin: "auto",
    height: "min-content",
    width: "min-content"
  }
};

Modal.setAppElement(document.getElementById("root"));

var STATE = Object.freeze({
  READY: 2,
  PENDING: 3,
  CONFIRMED: 4
});

const ConfModal = props => {
  const web3 = useWeb3Context();
  const [state, setState] = useState(STATE.READY);
  const modalProps = props.modal;
  const BN = web3.web3js.utils.BN;

  const getCallDataForProxy = parameters => {
    const functionAbi = extractFunction(AuctionProxy.abi, "createAuction");
    return web3.web3js.eth.abi.encodeFunctionCall(functionAbi, parameters);
  };

  const createAuction = async () => {
    const inputParams = { ...modalProps.params };

    const ask = web3.web3js.utils.toWei(inputParams.ask.toString(), "ether");
    const token = getTokenAddressBySymbol(inputParams.token);
    const expiryBlocks = new BN(
      Math.floor(BLOCKS_PER_DAY * inputParams.expiry)
    ).toString();
    const salt = new BN(random(100000000)).toString();

    const params = [
      addressBook.kovan.auction,
      addressBook.kovan.saiTub,
      inputParams.cup,
      token,
      ask,
      expiryBlocks,
      salt
    ];

    const calldata = getCallDataForProxy(params);

    const proxyInstance = new web3.web3js.eth.Contract(
      DSProxy.abi,
      props.proxy
    );

    console.log(proxyInstance);
    const tx = proxyInstance.methods
      .execute(addressBook.kovan.auctionProxy, calldata)
      .send({ from: web3.account })
      .on("transactionHash", function(hash) {
        console.log(`TxHash: ${hash}`);
      });
  };

  const sendTransaction = () => {
    if (modalProps.method === "createAuction") {
      createAuction();
    }
  };

  const toggleModal = () => {
    if (props.loading) {
      return <DisplayLoading />;
    }
    if (!props.proxy) {
      return (
        <NoProxy
          requestMaker={props.maker}
          loading={props.loading}
          onSetLoading={props.onSetLoading}
          onSetProxy={props.onSetProxy}
        />
      );
    } else {
      return (
        <div>
          <div class="modal-header">
            <h5 class="modal-title">Submitting transaction</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => props.onClose()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p className="text-nowrap">From: {web3.account}</p>
            <p className="text-nowrap">
              To:{" "}
              {modalProps.method === "createAuction"
                ? props.proxy
                : addressBook.kovan.auction}
            </p>
            <p>Method: {modalProps.method}</p>
            <p>Input: </p>
            <textarea
              readonly="true"
              rows="4"
              cols="50"
              style={{ resize: "none" }}
            >
              {JSON.stringify(modalProps.params)}
            </textarea>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => sendTransaction()}
            >
              Confirm
            </button>
          </div>
        </div>
      );
    }
  };

  useAccountEffect(() => {
    props.onClose();
  });

  return (
    <Modal
      isOpen={modalProps.show}
      onRequestClose={props.onClose}
      style={customStyles}
    >
      {toggleModal()}
    </Modal>
  );
};

export default ConfModal;
