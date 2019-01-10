import React from "react";
import { Icon } from "antd";

const Confirmed = props => {
  return (
    <div>
      <div className="modal-header">
        <h5 className="modal-title">Transaction confirmed!</h5>
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
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex mx-auto mt-5 p-3">
              <Icon
                type="check-circle"
                style={{ fontSize: "82px", color: "green" }}
                theme="outlined"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmed;
