import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "antd";
import { Button } from "reactstrap";

const Maker = require("@makerdao/dai");
const maker = Maker.create("browser");

const Container = styled.div`
  position: relative;
  text-align: center;
  height: 60vh;
  width: 15vw;
  padding: 3em;
  margin-right: 5em;
  box-shadow: 0 0 20px -5px rgba(0, 0, 0, 0.4);
  background: white;
`;

function UserBox() {
  const [proxy, setProxy] = useState(null);

  const fetchProxy = async () => {
    await maker.authenticate();
    setProxy(maker.service("proxy").currentProxy());
  };

  const createProxy = async () => {
    const proxyService = maker.service("proxy");
    if (!proxyService.currentProxy()) {
      return await proxyService.build();
    }
  };

  const displayBox = () => {
    if (!proxy) {
      return (
        <React.Fragment>
          <Icon
            type="exclamation-circle"
            style={{ fontSize: "48px", color: "red" }}
            theme="outlined"
          />
          <p style={{ marginTop: "3em" }}>
            No proxy found. Please create a profile proxy with Maker.
          </p>
          <Button color="primary" onClick={() => createProxy()}>
            Create Proxy
          </Button>
        </React.Fragment>
      );
    }
  };

  useEffect(() => {
    fetchProxy();
  }, []);
  console.log(proxy);
  return <Container>{displayBox()}</Container>;
}

/*

class UserBox extends Component {
  state = {
    proxy: null,
    account: null,
    cdps: []
  };

  render() {
    return <Container />;
  }
}
*/

export default UserBox;
