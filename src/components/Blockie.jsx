import React from "react";
import styled from "styled-components";
import makeBlockie from "ethereum-blockies-base64";

const CircleImage = styled.img`
  border-radius: 50%;
  overflow: "hidden";
`;

const Blockie = props => {
  return (
    <CircleImage src={makeBlockie(props.address)} width="42px" align="middle" />
  );
};

export default Blockie;
