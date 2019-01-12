import React from "react";
import { Icon } from "antd";

const NoProxy = props => {
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
    <div className="text-align-center">
      <Icon
        type="exclamation-circle"
        style={{ fontSize: "42px", color: "red" }}
        theme="outlined"
      />
      <p style={{ marginTop: "2em" }}>No proxy found.</p>
      <p style={{ maringTop: "1em" }}>
        Please create a proxy profile with Maker.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => createProxy()}
        style={{ marginTop: "1em" }}
      >
        Create Proxy
      </button>
    </div>
  );
};

export default NoProxy;
