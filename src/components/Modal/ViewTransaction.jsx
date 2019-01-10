import React from "react";
import { getEtherscanLink } from "web3-react/utilities";

const ViewTransaction = props => {
  return (
    <a
      className="btn btn-link mx-auto"
      href={getEtherscanLink(props.network, "transaction", props.txHash)}
      target="_blank"
      rel="noopener noreferrer"
      role="button"
    >
      View transaction
    </a>
  );
};

export default ViewTransaction;
