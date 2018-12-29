import React, { useState } from "react";
import styled from "styled-components";
import { Spin, Icon } from "antd";
import makeBlockie from "ethereum-blockies-base64";
import { useAccountEffect } from "web3-react/hooks";

import { loadUserCdps } from "../../services/TubService";
import ListingForm from "./ListingForm";

const Maker = require("@makerdao/dai");

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
`;

const CircleImage = styled.img`
  border-radius: 50%;
  overflow: "hidden";
`;

function Menu(props) {
  const maker = Maker.create("browser");
  const [proxy, setProxy] = useState(null);
  const [cdps, setCdps] = useState(null);
  const [form, setForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  const fetchProxy = async () => {
    await maker.authenticate();
    setProxy(maker.service("proxy").currentProxy());
    if (maker.service("proxy").currentProxy()) {
      var user = maker.currentAccount().address;
      try {
        var result = await loadUserCdps(
          user,
          maker.service("proxy").currentProxy(),
          0
        );
        setCdps(result);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setCdps([]);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const createProxy = async () => {
    setLoading(true);
    try {
      const tx = await maker.service("proxy").build();
    } catch (err) {
      console.log(err.message);
      setLoading(false);
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
    if (cdps.length === 0) {
      return <p style={{ marginTop: "2em" }}>No CDPs found.</p>;
    } else {
      return (
        <div>
          <h6 style={{ marginTop: "2em" }}>Your CDPs</h6>
          <ul class="list-group list-group-flush">
            {cdps.map(cdp => (
              <li class="list-group-item d-flex justify-content-between align-items-center">
                {cdp.id}
                <span>
                  <button
                    type="button"
                    class="btn btn-light btn-sm"
                    onClick={e => handleClick(e, cdp)}
                  >
                    List
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  const displayPanel = () => {
    const spinner = (
      <Icon type="loading" style={{ color: "green" }} theme="outlined" />
    );
    Spin.setDefaultIndicator(spinner);
    if (loading) {
      return (
        <React.Fragment>
          <Spin size="large" />
        </React.Fragment>
      );
    } else if (form) {
      return (
        <React.Fragment>
          <ListingForm onBack={hideListingForm} cdp={selected} proxy={proxy} />
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
            <button
              class="btn btn-primary"
              onClick={() => createProxy()}
              style={{ marginTop: "2em" }}
            >
              Create Proxy
            </button>
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

  useAccountEffect(() => {
    setLoading(true);
    fetchProxy();
  }, []);

  return (
    <Panel>
      <div>{displayPanel()}</div>
    </Panel>
  );
}

export default Menu;
