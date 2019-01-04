import React from "react";
import Blockie from "../common/Blockie";

const CdpList = props => {
  return (
    <div>
      <Blockie address={props.proxy} label="Proxy" />
      <div>
        <h6 style={{ marginTop: "2em" }}>
          {props.cdps.length === 1 ? "Your CDP" : "Your CDPs"}
        </h6>
        <ul className="list-group list-group-flush">
          {props.cdps.map(cdp => (
            <li
              key={cdp.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {cdp.id}
              <span>
                <button
                  type="button"
                  className="btn btn-light btn-sm"
                  onClick={() => props.onListCdp(cdp)}
                >
                  List
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CdpList;
