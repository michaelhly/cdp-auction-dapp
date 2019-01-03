import React, { useState } from "react";
import Modal from "react-modal";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import NoProxy from "./common/NoProxy";
import { extractFunction, BLOCKS_PER_DAY } from "../utils/helpers";
import { width } from "window-size";

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
  NOPROXY: 1,
  LOADING: 2,
  READY: 3,
  PENDING: 4,
  CONFIRMED: 5
});

const ConfModal = props => {
  const web3 = useWeb3Context();
  const [state, setState] = useState(STATE.READY);
  const modalProps = props.modal;

  const getAuctionInstance = () => {
    return new web3.web3js.eth.Contract(Auction.abi, addressBook.kovan.auction);
  };

  const getCallDataForProxy = parameters => {
    const functionAbi = extractFunction(AuctionProxy.abi, "createAuction");
    return web3.web3js.eth.abi.encodeFunctionCall(functionAbi, parameters);
  };

  const createAuction = () => {
    const inputParams = { ...modalProps.params };
  };

  const toggleModal = () => {
    if (state === STATE.NOPROXY) {
      return <NoProxy />;
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
            <p>
              To:{" "}
              {modalProps.method === "createAuction"
                ? props.proxy
                : addressBook.kovan.auction}
            </p>
            <p>Method: {modalProps.method}</p>
            <span>
              <p>Input: </p>
              <textarea
                readonly="true"
                rows="4"
                cols="50"
                style={{ resize: "none" }}
              >
                {JSON.stringify(modalProps.params)}
              </textarea>
            </span>
          </div>
          <button type="button" class="btn btn-primary">
            Confirm
          </button>
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
