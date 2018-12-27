import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Spin, Icon } from "antd";
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
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  background: white;
  min-width: 200px;
`;

function UserBox() {
  const [proxy, setProxy] = useState(null);

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
          <p style={{ marginTop: "4em" }}>Initializing proxy...</p>
        </React.Fragment>
      );
    }
  };

  useEffect(() => {
    fetchProxy();
  }, []);

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
