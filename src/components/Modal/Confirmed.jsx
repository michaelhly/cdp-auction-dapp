import React from "react";
import { Icon } from "antd";

const Confirmed = props => {
  return (
    <div>
      <div class="modal-header">
        <h5 class="modal-title">Transaction confirmed!</h5>
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
        <div className="container-fluid">
          <div className="row">
            <div class="d-flex mx-auto mt-5 p-3">
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
