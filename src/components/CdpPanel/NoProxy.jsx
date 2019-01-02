import React from "react";
import { Icon } from "antd";

const NoProxy = props => {
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
        onClick={() => props.onCreateProxy()}
        style={{ marginTop: "1em" }}
      >
        Create Proxy
      </button>
    </div>
  );
};

export default NoProxy;
