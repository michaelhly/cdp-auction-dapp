import React, { useState } from "react";
import { useAccountEffect } from "web3-react/hooks";
import { loadUserCdps } from "../../services/TubService";
import ListingForm from "./ListingForm";
import NoProxy from "./NoProxy";
import NoCdp from "./NoCdp";
import CdpList from "./CdpList";
import SidePanel from "../common/SidePanel";
import DisplayLoading from "../common/DisplayLoading";

const Maker = require("@makerdao/dai");

const CdpPanel = () => {
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

  const handleCdpListing = cdp => {
    setSelected(cdp);
    setForm(true);
  };

  const hideListingForm = () => {
    setSelected([]);
    setForm(false);
  };

  const displayPanel = () => {
    if (form)
      return (
        <ListingForm onBack={hideListingForm} cdp={selected} proxy={proxy} />
      );

    if (loading) {
      return <DisplayLoading size="large" />;
    } else {
      if (!proxy) {
        return <NoProxy onCreateProxy={createProxy} />;
      } else {
        return cdps.length === 0 ? (
          <NoCdp proxy={proxy} />
        ) : (
          <CdpList proxy={proxy} cdps={cdps} onListCdp={handleCdpListing} />
        );
      }
    }
  };

  useAccountEffect(() => {
    setLoading(true);
    if (form) {
      setForm(false);
    }
    fetchProxy();
  }, []);
  return <SidePanel>{displayPanel()}</SidePanel>;
};

export default CdpPanel;
