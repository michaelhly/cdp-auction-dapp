import React from "react";
import Blockie from "../common/Blockie";

const NoCdp = props => {
  return (
    <div>
      <Blockie address={props.proxy} label="Proxy" />
      <div>
        <p style={{ marginTop: "2em" }}>No CDPs found.{"\n"}</p>
        <p style={{ marginTop: "1em" }}>
          Visit the CDP portal to create a CDP.{"\n"}
        </p>
        <a
          href="https://cdp.makerdao.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark btn active mt-1"
          role="button"
          aria-pressed="true"
        >
          CDP Protal
        </a>
      </div>
    </div>
  );
};

export default NoCdp;
