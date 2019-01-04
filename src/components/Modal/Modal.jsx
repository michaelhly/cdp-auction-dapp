import React, { useState } from "react";
import Modal from "react-modal";
import { getEtherscanLink } from "web3-react/utilities";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import {
  extractFunction,
  BLOCKS_PER_DAY,
  random,
  getTokenAddressBySymbol
} from "../../utils/helpers";
import NoProxy from "../common/NoProxy";
import DisplayLoading from "../common/DisplayLoading";
import Ready from "./Ready";
import Confirmed from "./Confirmed";

Modal.setAppElement(document.getElementById("root"));

const addressBook = require("../../utils/addressBook.json");
const AuctionProxy = require("../../artifacts/AuctionProxy.json");
const Auction = require("../../artifacts/Auction.json");
const DSProxy = require("../../artifacts/DSProxy.json");

const customStyles = {
  content: {
    margin: "auto",
    height: "430px",
    width: "550px"
  }
};

var STATE = Object.freeze({
  READY: 1,
  PENDING: 2,
  CONFIRMED: 3
});

const ConfModal = props => {
  const web3 = useWeb3Context();
  const [state, setState] = useState(STATE.READY);
  const [txHash, setTxHash] = useState(null);
  const modalProps = props.modal;
  console.log(modalProps);
  const BN = web3.web3js.utils.BN;

  const getCallDataForProxy = parameters => {
    const functionAbi = extractFunction(AuctionProxy.abi, "createAuction");
    return web3.web3js.eth.abi.encodeFunctionCall(functionAbi, parameters);
  };

  const createAuction = async () => {
    const inputParams = { ...modalProps.params };

    const expiryBlocks = new BN(Math.floor(BLOCKS_PER_DAY * inputParams.expiry))
      .add(new BN(await web3.web3js.eth.getBlockNumber()))
      .toString();
    const ask = web3.web3js.utils.toWei(inputParams.ask.toString(), "ether");
    const token = getTokenAddressBySymbol(inputParams.token);

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
    console.log(params);

    const calldata = getCallDataForProxy(params);

    const proxyInstance = new web3.web3js.eth.Contract(
      DSProxy.abi,
      props.proxy
    );

    const transaction = await proxyInstance.methods["0x1cff79cd"](
      addressBook.kovan.auctionProxy,
      calldata
    )
      .send({ from: web3.account })
      .on("transactionHash", function(hash) {
        setTxHash(hash);
        setState(STATE.PENDING);
      });
    return transaction;
  };

  const sendTransaction = async () => {
    let tx = null;
    if (modalProps.method === "createAuction") {
      tx = await createAuction();
    }
    if (tx) {
      setState(STATE.CONFIRMED);
      modalProps.callback(tx.events);
    }
  };

  const toggleButtons = () => {
    if (state === STATE.READY) {
      return (
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => sendTransaction()}
        >
          Confirm
        </button>
      );
    } else if (txHash) {
      return (
        <a
          class="btn btn-link"
          href={getEtherscanLink(web3.networkId, "transaction", txHash)}
          target="_blank"
          role="button"
          style={{ marginTop: "307px" }}
        >
          View transaction
        </a>
      );
    }
  };

  const toggleModal = () => {
    if (props.loading || state === STATE.PENDING) {
      return (
        <div style={{ textAlign: "center" }}>
          <DisplayLoading size="large" />
        </div>
      );
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
      console.log(modalProps);
      return state === STATE.READY ? (
        <Ready
          values={modalProps}
          account={web3.account}
          onClose={props.onClose}
          proxy={props.proxy}
          auctionAddr={addressBook.kovan.auction}
        />
      ) : (
        <Confirmed onClose={props.onClose} />
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
      <div style={{ textAlign: "center" }}>{toggleButtons()}</div>
    </Modal>
  );
};

export default ConfModal;
