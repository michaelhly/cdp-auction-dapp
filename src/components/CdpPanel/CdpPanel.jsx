import React, { useState } from "react";
import { useAccountEffect } from "web3-react/hooks";
import NoCdp from "./NoCdp";
import CdpList from "./CdpList";
import ListingForm from "./ListingForm";
import NoProxy from "../common/NoProxy";
import SidePanel from "../common/SidePanel";
import DisplayLoading from "../common/DisplayLoading";
import { Icon } from "antd";

const CdpPanel = props => {
  const { maker, proxy, cdps, onSetProxy } = props;
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

  const refreshButton = () => {
    return (
      <button
        type="button"
        className="btn btn-link p-0 float-right"
        onClick={() => props.onRefresh()}
        style={{
          textDecoration: "none",
          marginTop: "-10px"
        }}
      >
        <Icon type="reload" style={{ color: "green" }} theme="outlined" />
      </button>
    );
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

    if (proxy === "pending" || !cdps) {
      return (
        <div className="mt-3">
          <DisplayLoading size="large" />
        </div>
      );
    } else {
      if (!proxy) {
        return (
          <div className="mt-3">
            <NoProxy requestMaker={maker} onSetProxy={onSetProxy} />{" "}
          </div>
        );
      } else {
        return cdps.length === 0 ? (
          <React.Fragment>
            {refreshButton()}
            <NoCdp proxy={proxy} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {refreshButton()}
            <CdpList proxy={proxy} cdps={cdps} onListCdp={handleCdpListing} />
          </React.Fragment>
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
