import React, { useState } from "react";
import { Icon } from "antd";
import { useAccountEffect } from "web3-react/hooks";
import { loadUserCdps } from "../../services/TubService";
import SidePanel from "../common/SidePanel";
import ListingForm from "./ListingForm";
import Blockie from "../common/Blockie";
import DisplayLoading from "../common/DisplayLoading";

const Maker = require("@makerdao/dai");

function CdpManager(props) {
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

    var tx = null;
    try {
      tx = await maker.service("proxy").build();
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
    if (tx) {
      setProxy(maker.service("proxy").currentProxy());
      setLoading(false);
    }
  };

  const handleClick = cdp => {
    setSelected(cdp);
    setForm(true);
  };

  const hideListingForm = () => {
    setSelected([]);
    setForm(false);
  };

  const displayCdps = () => {
    if (cdps.length === 0) {
      return (
        <div>
          <p style={{ marginTop: "2em" }}>No CDPs found.{"\n"}</p>
          <p style={{ marginTop: "1em" }}>
            Visit the CDP portal to create a CDP.{"\n"}
          </p>
          <a
            href="https://cdp.makerdao.com/"
            class="btn btn-dark btn active mt-1"
            role="button"
            aria-pressed="true"
          >
            CDP Protal
          </a>
        </div>
      );
    } else {
      return (
        <div>
          <h6 style={{ marginTop: "2em" }}>Your CDPs</h6>
          <ul className="list-group list-group-flush">
            {cdps.map(cdp => (
              <li
                key={cdp.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {cdp.id}
                <span>
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => handleClick(cdp)}
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
    if (loading) {
      return <DisplayLoading size="large" />;
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
            <p style={{ marginTop: "2em" }}>No proxy found.</p>
            <p style={{ maringTop: "1em" }}>
              Please create a proxy profile with Maker before listing your CDP
              to auction.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => createProxy()}
              style={{ marginTop: "1em" }}
            >
              Create Proxy
            </button>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Blockie address={proxy} label="Proxy" />
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

  return <SidePanel>{displayPanel()}</SidePanel>;
}

export default CdpManager;
