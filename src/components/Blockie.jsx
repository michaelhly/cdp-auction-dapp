import React from "react";
import styled from "styled-components";
import makeBlockie from "ethereum-blockies-base64";

const CircleImage = styled.img`
  border-radius: 50%;
  overflow: "hidden";
`;

const Blockie = props => {
  const trimAddress = addr => {
    return [addr.substring(0, 7), "..."];
  };

  return (
    <div>
      <CircleImage
        src={makeBlockie(props.address)}
        width="42px"
        align="middle"
      />
      <div>
        <font size="1">
          {props.label}: {trimAddress(props.address)}
        </font>
      </div>
    </div>
  );
};

export default Blockie;
