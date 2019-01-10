import React, { useState } from "react";
import ReactModal from "react-modal";
import { getEtherscanLink } from "web3-react/utilities";
import { useWeb3Context, useAccountEffect } from "web3-react/hooks";
import {
  random,
  extractFunction,
  BLOCKS_PER_DAY,
  getTokenAddressBySymbol
} from "../../utils/helpers";
import NoProxy from "../common/NoProxy";
import DisplayLoading from "../common/DisplayLoading";
import Ready from "./Ready";
import Confirmed from "./Confirmed";
import Failed from "./Failed";

ReactModal.setAppElement(document.getElementById("root"));

const addressBook = require("../../utils/addressBook.json");
const AuctionProxy = require("../../artifacts/AuctionProxy.json");
const Auction = require("../../artifacts/Auction.json");
const DSProxy = require("../../artifacts/DSProxy.json");

const customStyles = {
  content: {
    position: "relative",
    margin: "auto",
    height: "430px",
    width: "600px"
  }
};

var STATE = Object.freeze({
  READY: 1,
  PENDING: 2,
  CONFIRMED: 3,
  FAILED: 4
});

const Modal = props => {
  const web3 = useWeb3Context();
  const [state, setState] = useState(STATE.READY);
  const [txHash, setTxHash] = useState(null);
  const modalProps = props.modal;
  const BN = web3.web3js.utils.BN;

  const handleClose = () => {
    setTxHash(null);
    setState(STATE.READY);
    props.onClose();
  };

  const getCallDataForProxy = parameters => {
    const functionAbi = extractFunction(AuctionProxy.abi, "createAuction");
    return web3.web3js.eth.abi.encodeFunctionCall(functionAbi, parameters);
  };

  const calcExpiryBlocks = async expiry =>
    new BN(Math.floor(BLOCKS_PER_DAY * expiry))
      .add(new BN(await web3.web3js.eth.getBlockNumber()))
      .toString();

  const getSalt = () => new BN(random(100000000)).toString();

  const waitForConfirmation = txHash => {
    setTxHash(txHash);
    setState(STATE.PENDING);
  };

  const createAuction = async () => {
    const inputParams = { ...modalProps.params };

    const expiryBlocks = await calcExpiryBlocks(inputParams.expiry);
    const ask = web3.web3js.utils.toWei(inputParams.ask.toString(), "ether");
    const token = getTokenAddressBySymbol(inputParams.token);
    const salt = getSalt();

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

    try {
      var transaction = await proxyInstance.methods["0x1cff79cd"](
        addressBook.kovan.auctionProxy,
        calldata
      )
        .send({ from: web3.account })
        .on("transactionHash", function(hash) {
          waitForConfirmation(hash);
        });
    } catch (err) {
      console.log(err);
    }
    return transaction;
  };

  const submitBid = async (auctionInstance, params) => {
    const expiryBlocks = await calcExpiryBlocks(params.expiry);
    const token = getTokenAddressBySymbol(params.token);
    const value = web3.web3js.utils.toWei(params.value.toString(), "ether");
    const salt = getSalt();

    try {
      var transaction = await auctionInstance.methods
        .submitBid(params.id, props.proxy, token, value, expiryBlocks, salt)
        .send({ from: web3.account })
        .on("transactionHash", function(hash) {
          waitForConfirmation(hash);
        });
    } catch (err) {
      console.log(err);
    }

    return transaction;
  };

  const sendTransaction = async () => {
    let tx = null;
    if (modalProps.method === "createAuction") {
      tx = await createAuction();
    } else {
      const params = { ...modalProps.params };
      const auctionInstance = new web3.web3js.eth.Contract(
        Auction.abi,
        addressBook.kovan.auction
      );

      switch (modalProps.method) {
        case "submitBid":
          tx = await submitBid(auctionInstance, params);
          break;
        case "resolveAuction":
          const { auctionId, bidId } = params;
          try {
            tx = await auctionInstance.methods
              .resolveAuction(auctionId, bidId)
              .send({ from: web3.account })
              .on("transactionHash", function(hash) {
                waitForConfirmation(hash);
              });
          } catch (err) {
            console.log(err);
          }
          break;
        default:
          try {
            tx = await auctionInstance.methods[modalProps.method](params.id)
              .send({ from: web3.account })
              .on("transactionHash", function(hash) {
                waitForConfirmation(hash);
              });
          } catch (err) {
            console.log(err);
          }
          break;
      }
    }
    if (tx) {
      setState(STATE.CONFIRMED);
      modalProps.callback(tx.events);
    } else {
      setState(STATE.FAILED);
    }
  };

  const toggleButtons = () => {
    if (state === STATE.READY) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => sendTransaction()}
        >
          Confirm
        </button>
      );
    } else if (txHash) {
      return (
        <a
          className="btn btn-link"
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
    if (state === STATE.FAILED) return <Failed />;
    if (props.loading || state === STATE.PENDING || props.proxy === "pending") {
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
      return state === STATE.READY ? (
        <Ready
          values={modalProps}
          account={web3.account}
          onClose={handleClose}
          proxy={props.proxy}
          auctionAddr={addressBook.kovan.auction}
        />
      ) : (
        <Confirmed onClose={handleClose} />
      );
    }
  };

  useAccountEffect(() => {
    handleClose();
  });

  return (
    <ReactModal
      isOpen={modalProps.show}
      onRequestClose={handleClose}
      style={customStyles}
    >
      {toggleModal()}
      <div style={{ textAlign: "center" }}>{toggleButtons()}</div>
    </ReactModal>
  );
};

export default Modal;
