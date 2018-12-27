import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Spin, Icon } from "antd";
import { Button } from "reactstrap";
import makeBlockie from "ethereum-blockies-base64";

const Maker = require("@makerdao/dai");
const maker = Maker.create("browser");

const Panel = styled.div`
  position: relative;
  text-align: center;
  height: 60vh;
  width: 15vw;
  padding: 2em;
  margin-right: 5em;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  background: white;
  min-width: 200px;
`;

const CircleImage = styled.img`
  border-radius: 50%;
  overflow: "hidden";
`;

function UserPanel() {
  const [proxy, setProxy] = useState("pending");

  const fetchProxy = async () => {
    await maker.authenticate();
    setProxy(maker.service("proxy").currentProxy());
  };

  const createProxy = async () => {
    setProxy("pending");
    try {
      const tx = await maker.service("proxy").build();
    } catch {
      setProxy(null);
    }
  };

  const trimAddress = addr => {
    return [addr.substring(0, 7), "..."];
  };

  const displayBox = () => {
    if (!proxy) {
      return (
        <React.Fragment>
          <Icon
            type="exclamation-circle"
            style={{ fontSize: "42px", color: "red" }}
            theme="outlined"
          />
          <p style={{ marginTop: "2em" }}>
            No proxy found. Please create a profile proxy with Maker.
          </p>
          <Button
            color="primary"
            onClick={() => createProxy()}
            style={{ marginTop: "2em" }}
          >
            Create Proxy
          </Button>
        </React.Fragment>
      );
    } else if (proxy === "pending") {
      return (
        <React.Fragment>
          <Spin
            size="large"
            indicator={
              <Icon
                type="loading"
                style={{ color: "green" }}
                theme="outlined"
              />
            }
          />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CircleImage src={makeBlockie(proxy)} width="42px" align="middle" />
          <div>
            <font size="1"> Proxy: {trimAddress(proxy)}</font>
          </div>
        </React.Fragment>
      );
    }
  };

  useEffect(() => {
    fetchProxy();
  }, []);

  return <Panel>{displayBox()}</Panel>;
}

export default UserPanel;
