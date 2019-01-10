import React from "react";

const Ready = props => {
  const modalProps = props.values;
  return (
    <div>
      <div className="modal-header">
        <h5 className="modal-title">Submitting transaction</h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={() => props.onClose()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
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
    </div>
  );
};

export default Ready;
