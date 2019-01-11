import React from "react";
import { Icon } from "antd";
import ModalHeader from "../common/ModalHeader";
import ViewTransaction from "./ViewTransaction";

const Confirmed = props => {
  return (
    <ModalHeader onClose={props.onClose} title="Transaction Confirmed!">
      <div className="modal-body">
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex mx-auto mt-5 p-3">
              <Icon
                type="check-circle"
                style={{ fontSize: "68px", color: "green" }}
                theme="outlined"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer" style={{ marginTop: "95px" }}>
        <ViewTransaction network={props.network} txHash={props.txHash} />
      </div>
    </ModalHeader>
  );
};

export default Confirmed;
