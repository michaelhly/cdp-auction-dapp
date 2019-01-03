import React from "react";
import { Icon } from "antd";

const NoProxy = props => {
  const maker = props.requestMaker;

  const createProxy = async () => {
    var copy = { ...props.loading };
    copy.effectsLoad = true;
    props.onSetLoading(copy);
    var tx = null;
    try {
      tx = await maker.service("proxy").build();
    } catch (err) {
      copy.effectsLoad = false;
      props.onSetLoading(copy);
    }
    if (tx) {
      await maker.authenticate();
      props.onSetProxy(maker.service("proxy").currentProxy());
      copy.effectsLoad = false;
      props.onSetLoading(copy);
    }
  };

  return (
    <div>
      <Icon
        type="exclamation-circle"
        style={{ fontSize: "42px", color: "red" }}
        theme="outlined"
      />
      <p style={{ marginTop: "2em" }}>No proxy found.</p>
      <p style={{ maringTop: "1em" }}>
        Please create a proxy profile with Maker before listing your CDP to
        auction.
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
