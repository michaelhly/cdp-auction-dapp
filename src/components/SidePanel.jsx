import React from "react";
import styled from "styled-components";

const Panel = styled.div`
  position: relative;
  text-align: center;
  height: 60vh;
  width: 15vw;
  padding: 2em;
  margin-right: 3em;
  margin-bottom: 3em;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  background: white;
  min-width: 200px;
  z-index: -1;
`;

const SidePanel = props => {
  return <Panel>{props.display()}</Panel>;
};

export default SidePanel;
