import React from "react";
import ModalHeader from "../common/ModalHeader";

const Ready = props => {
  const modalProps = props.values;
  return (
    <ModalHeader onClose={props.onClose} title="Submitting Transaction">
      <div className="modal-body">
        <p className="text-nowrap">From: {props.account}</p>
        <p className="text-nowrap">
          To:{" "}
          {modalProps.method === "createAuction"
            ? props.proxy
            : props.auctionAddr}
        </p>
        <p>Method: {modalProps.method}</p>
        <p>Input: </p>
        <textarea readOnly={true} rows="3" cols="50" style={{ resize: "none" }}>
          {JSON.stringify(modalProps.params)}
        </textarea>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          className="btn btn-primary mx-auto"
          onClick={() => props.onSend()}
        >
          Confirm
        </button>
      </div>
    </ModalHeader>
  );
};

export default Ready;
