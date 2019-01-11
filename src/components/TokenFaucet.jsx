import React from "react";

const TokenFaucet = () => {
  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-3">
          <ul class="list-group">
            <li class="list-group-item list-group-item-action">
              <h4 className="mb-3 mt-2 display-5">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://faucet.kovan.network/"
                  style={{ textDecoration: "none" }}
                >
                  Get Ether
                </a>
              </h4>
            </li>
            <li class="list-group-item list-group-item-action">
              <h4 className="mb-3 display-5">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdp.makerdao.com/"
                  style={{ textDecoration: "none" }}
                >
                  Get Dai
                </a>
              </h4>
            </li>
            <li class="list-group-item list-group-item-action">
              <h4 className="mb-3 display-5">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://blog.polymath.network/a-simple-guide-for-getting-kovan-testnet-poly-27ddeb1149cb/"
                  style={{ textDecoration: "none" }}
                >
                  Get Poly
                </a>
              </h4>
            </li>
            <li class="list-group-item list-group-item-action">
              <h4 className="mb-3 display-5">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://0x.org/portal/weth"
                  style={{ textDecoration: "none" }}
                >
                  Wrap Ether
                </a>
              </h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TokenFaucet;
