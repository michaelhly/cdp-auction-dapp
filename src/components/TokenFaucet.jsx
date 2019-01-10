import React from "react";

const TokenFaucet = () => {
  return (
    <React.Fragment>
      <tr>
        <h3 className="mb-3 mt-2 display-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://faucet.kovan.network/"
          >
            Get Ether
          </a>
        </h3>
      </tr>
      <tr>
        <h3 className="mb-3 display-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://cdp.makerdao.com/"
          >
            Get Dai
          </a>
        </h3>
      </tr>
      <tr>
        <h3 className="mb-3 display-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://blog.polymath.network/a-simple-guide-for-getting-kovan-testnet-poly-27ddeb1149cb/"
          >
            Get Poly
          </a>
        </h3>
      </tr>
      <tr>
        <h3 className="mb-3 display-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://0x.org/portal/weth"
          >
            Wrap Ether
          </a>
        </h3>
      </tr>
    </React.Fragment>
  );
};

export default TokenFaucet;
