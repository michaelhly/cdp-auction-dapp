import React from "react";
import { Icon } from "antd";
import ModalHeader from "../common/ModalHeader";

const NoProxyModal = props => {
  const { onSetProxy } = props;
  const maker = props.requestMaker;

  const createProxy = async () => {
    onSetProxy("pending");
    var tx = null;
    try {
      tx = await maker.service("proxy").build();
    } catch (err) {
      onSetProxy(null);
    }
    if (tx) {
      await maker.authenticate();
      onSetProxy(maker.service("proxy").currentProxy());
    }
  };

  return (
    <ModalHeader onClose={props.onClose} title="No Proxy Found">
      <div className="modal-body">
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex mx-auto mt-5 p-3">
              <Icon
                type="exclamation-circle"
                style={{ fontSize: "68px", color: "Red" }}
                theme="outlined"
              />
            </div>
          </div>
          <p className="text-center">
            Please create a proxy profile with Maker.
          </p>
        </div>
      </div>
      <div class="modal-footer" style={{ marginTop: "55px" }}>
        <button
          className="btn btn-primary mx-auto"
          onClick={() => createProxy()}
        >
          Create Proxy
        </button>
      </div>
    </ModalHeader>
  );
};

export default NoProxyModal;
