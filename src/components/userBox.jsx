import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import styled from "styled-components";

const Maker = require("@makerdao/dai");
const maker = Maker.create("browser");

const Content = styled.div`
  position: relative;
  height: 60vh;
  width: 15vw;
  margin-right: 5em;
  box-shadow: 0 0 20px -5px rgba(0, 0, 0, 0.4);
  background: white;
`;

function UserBox() {
  const [account, setAccount] = useState(null);
  const [proxy, setProxy] = useState(null);
  //const [cdps, setCdps] = useState([]);

  const fetchData = async () => {
    await maker.authenticate();
    console.log(maker);
    setAccount(maker.currentAccount().address);
    setProxy(maker.service("proxy").currentProxy());
    if (proxy) {
      //Fetch cdps
    }
  };

  const trimAddress = addr => {
    if (addr) return [addr.substring(0, 7), "..."];
    return addr;
  };

  const findProxy = proxy => {
    if (!proxy) return <div> Proxy not found </div>;
    return trimAddress(proxy);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Content />;
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
