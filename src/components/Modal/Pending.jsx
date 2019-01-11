import React from "react";
import { Spin, Icon } from "antd";
import ModalHeader from "../common/ModalHeader";
import ViewTransaction from "./ViewTransaction";

const Pending = props => {
  const spinner = (
    <Icon
      type="loading"
      style={{ fontSize: "68px", color: "green", marginRight: "1em" }}
      theme="outlined"
    />
  );
  Spin.setDefaultIndicator(spinner);

  return (
    <ModalHeader onClose={props.onClose} title="Waiting...">
      <div className="modal-body">
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex mx-auto mt-5 p-3">
              <Spin />
            </div>
          </div>
        </div>
      </div>
      {props.txHash ? (
        <div class="modal-footer" style={{ marginTop: "115px" }}>
          <ViewTransaction network={props.network} txHash={props.txHash} />
        </div>
      ) : null}
    </ModalHeader>
  );
};

export default Pending;
