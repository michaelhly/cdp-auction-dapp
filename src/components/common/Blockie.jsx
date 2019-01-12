import React from "react";
import styled from "styled-components";
import makeBlockie from "ethereum-blockies-base64";
import { trimHexString } from "../../utils/helpers";

const CircleImage = styled.img`
  border-radius: 50%;
  overflow: "hidden";
`;

const Blockie = props => {
  return (
    <div className="mt-4">
      <CircleImage
        src={makeBlockie(props.address)}
        width="42px"
        align="middle"
      />
      <div>
        <font size="1">
          {props.label}: {trimHexString(props.address, 7)}
        </font>
      </div>
    </div>
  );
};

export default Blockie;
