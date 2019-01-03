import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { calcValue, convertExpiryBlocks } from "../../utils/helpers";
import { fetchCdpData } from "../../services/requestMKR";
import DisplayLoading from "./DisplayLoading";

/* This component is very bad */

const InfoCard = props => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const auction = props.auction;

  const fetchInfo = async () => {
    try {
      const cdpInfo = await fetchCdpData(auction.cdpId);
      setInfo(cdpInfo);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  const displayInfo = topic => {
    if (loading) return <DisplayLoading />;

    switch (topic) {
      case "L":
        return info.liquidation ? info.liquidation : "?";
      case "C":
        return info.collateral ? info.collateral : "?";
      case "D":
        return info.debt && info.fee ? info.debt + info.fee : "?";
      case "F":
        return info.fee ? info.fee : "?";
      case "V":
        return info
          ? calcValue(info.collateral, info.debt, info.fee, info.ethPrice)
          : "?";
    }
  };

  const trimAddress = addr => {
    return [addr.substring(0, 21), "..."];
  };

  useEffect(() => {
    fetchInfo();
    setLoading(false);
  }, []);

  console.log(info);

  return props.type === "HOME" ? (
    <Link
      className="auction-link"
      to={`/${auction.id}`}
      style={{ color: "black", textDecoration: "none" }}
    >
      <div className="card-body">
        <div className="container">
          <div className="row flex-nowrap">
            <div className="col-3 p-3">
              <p className="h4">CDP {auction.cdpId}</p>
            </div>
            <div className="col-2 ml-4">
              <h6 style={{ color: "rgb(85, 85, 85)" }}>Value</h6>
              <font size="4">Ξ {displayInfo("V")}</font>
            </div>
            <div className="col-2">
              <h6 style={{ color: "rgb(85, 85, 85)" }}>Bids</h6>
              <font size="4">{auction.bids.length}</font>
            </div>
            <div className="col-2">
              <h6 style={{ color: "rgb(85, 85, 85)" }}>Expire in</h6>
              <font size="4">{convertExpiryBlocks(auction.expiry)}</font>
            </div>
            <div className="col-3 p-2 ml-4">
              <button type="button" className="btn btn-light btn">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <div className="row">
      <div className="col p-0">
        <div className="card shadow-sm mb-3 bg-white rounded">
          <div className="card-body">
            <div className="row">
              <div className="col-8">
                <h6 style={{ color: "rgb(85, 85, 85)" }}>
                  Seller:{" "}
                  <span style={{ color: "black" }}>
                    {trimAddress(auction.seller)}
                  </span>
                </h6>
              </div>
              <div className="col-4">
                <h6 style={{ color: "rgb(85, 85, 85)" }}>
                  Liquidation:{" "}
                  <span style={{ color: "black" }}>${displayInfo("L")}</span>
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <h6 style={{ color: "rgb(85, 85, 85)" }}>
                  Collateral:{" "}
                  <span style={{ color: "black" }}>{displayInfo("C")}</span>
                </h6>
              </div>
              <div className="col-4">
                <h6 style={{ color: "rgb(85, 85, 85)" }}>
                  Debt:{" "}
                  <span style={{ color: "black" }}>{displayInfo("D")}</span>
                </h6>
              </div>
              <div className="col-4">
                <h6 style={{ color: "rgb(85, 85, 85)" }}>
                  Value: Ξ{" "}
                  <span style={{ color: "black" }}>{displayInfo("V")}</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
