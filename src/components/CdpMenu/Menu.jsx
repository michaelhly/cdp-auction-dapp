import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Spin, Icon } from "antd";
import { Button } from "reactstrap";
import makeBlockie from "ethereum-blockies-base64";

import ListingForm from "./ListingForm";
import { loadCdps } from "../../services/CdpService";

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

function Menu(props) {
  const [proxy, setProxy] = useState("pending");
  const [cdps, setCdps] = useState("pending");
  const [form, setForm] = useState(false);
  const [selected, setSelected] = useState([]);

  const fetchData = async () => {
    await maker.authenticate();
    setProxy(maker.service("proxy").currentProxy());
    if (proxy) {
      var user = maker.currentAccount().address;
      try {
        const result = await loadCdps(
          user,
          maker.service("proxy").currentProxy(),
          0
        );
        setCdps(result);
      } catch (err) {
        console.log(err.message);
        setCdps([]);
      }
    }
  };

  const createProxy = async () => {
    setProxy("pending");
    try {
      const tx = await maker.service("proxy").build();
    } catch (err) {
      console.log(err.message);
      setProxy(null);
    }
  };

  const trimAddress = addr => {
    return [addr.substring(0, 7), "..."];
  };

  const handleClick = (e, cdp) => {
    setSelected(cdp);
    setForm(true);
  };

  const hideListingForm = () => {
    setSelected([]);
    setForm(false);
  };

  const displayCdps = () => {
    if (cdps == "pending") {
      return (
        <div style={{ marginTop: "2em" }}>
          <Spin size="large" />
        </div>
      );
    } else if (cdps.length === 0)
      return <p style={{ marginTop: "2em" }}>No CDPs found.</p>;
    else {
      return (
        <ul class="menu" style={{ marginTop: "2em" }}>
          {cdps.map(cdp => (
            <li class="list-group-item d-flex justify-content-between align-items-center">
              {cdp.id}
              <span>
                <button
                  type="button"
                  class="btn btn-light"
                  onClick={e => handleClick(e, cdp)}
                >
                  List
                </button>
              </span>
            </li>
          ))}
        </ul>
      );
    }
  };

  const displayPanel = () => {
    const spinner = (
      <Icon type="loading" style={{ color: "green" }} theme="outlined" />
    );
    Spin.setDefaultIndicator(spinner);
    if (form) {
      return (
        <React.Fragment>
          <ListingForm onBack={hideListingForm} cdp={selected} />
        </React.Fragment>
      );
    } else {
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
            <Spin size="large" />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <CircleImage src={makeBlockie(proxy)} width="42px" align="middle" />
            <div>
              <font size="1">Proxy: {trimAddress(proxy)}</font>
            </div>
            {displayCdps()}
          </React.Fragment>
        );
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Panel>{displayPanel()}</Panel>;
}

export default Menu;
