import React from "react";
import { Icon } from "antd";
import ModalHeader from "../common/ModalHeader";

const Failed = props => {
  return (
    <ModalHeader onClose={props.onClose} title="Transaction Failed">
      <div className="modal-body">
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex mx-auto mt-5 p-3">
              <Icon
                type="close-circle"
                style={{ fontSize: "68px", color: "red" }}
                theme="outlined"
              />
            </div>
          </div>
          <p className="text-center mt-5">Please try again.</p>
        </div>
      </div>
    </ModalHeader>
  );
};

export default Failed;
