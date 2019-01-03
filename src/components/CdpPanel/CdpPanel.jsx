import React, { useState } from "react";
import { useAccountEffect } from "web3-react/hooks";
import NoCdp from "./NoCdp";
import CdpList from "./CdpList";
import ListingForm from "./ListingForm";
import NoProxy from "../common/NoProxy";
import SidePanel from "../common/SidePanel";
import DisplayLoading from "../common/DisplayLoading";

const CdpPanel = props => {
  const { maker, proxy, cdps, onSetProxy, onSetLoading } = props;
  const { initialLoad, effectsLoad } = props.loading;
  const [form, setForm] = useState(false);
  const [selected, setSelected] = useState([]);

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
        <ListingForm
          onBack={hideListingForm}
          cdp={selected}
          proxy={proxy}
          onModal={props.onModal}
        />
      );

    if (
      initialLoad ||
      effectsLoad ||
      proxy === "pending" ||
      cdps === "pending"
    ) {
      return <DisplayLoading size="large" />;
    } else {
      if (!proxy) {
        return (
          <NoProxy
            requestMaker={maker}
            loading={props.loading}
            onSetLoading={onSetLoading}
            onSetProxy={onSetProxy}
          />
        );
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
    if (form) {
      setForm(false);
    }
  });

  return <SidePanel>{displayPanel()}</SidePanel>;
};

export default CdpPanel;
