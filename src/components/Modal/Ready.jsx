import React from "react";

const Ready = props => {
  const modalProps = props.values;
  console.log(modalProps);
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
