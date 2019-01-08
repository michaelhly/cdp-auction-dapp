import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  calcValue,
  convertExpiryBlocks,
  trimHexString,
  round2Decimals
} from "../../utils/helpers";
import { fetchCdpData } from "../../services/requestMKR";
import DisplayLoading from "./DisplayLoading";

const InfoCard = props => {
  const [info, setInfo] = useState(null);
  const auction = props.auction;

  const fetchInfo = async () => {
    try {
      const cdpInfo = await fetchCdpData(auction.cdpId);
      setInfo(cdpInfo);
    } catch (err) {
      console.log(err.reason);
    }
  };

  const displayInfo = topic => {
    if (!info) return <DisplayLoading />;

    switch (topic) {
      case "L":
        return info.liquidation ? round2Decimals(info.liquidation) : "0";
      case "C":
        return info.collateral ? round2Decimals(info.collateral) : "0";
      case "D":
        return info.debt ? round2Decimals(info.debt) : "0";
      case "F":
        return info.fee ? round2Decimals(info.fee) : "0";
      case "V":
        return info
          ? calcValue(info.collateral, info.debt, info.fee, info.ethPrice)
          : "0";
      default:
        return info.debt && info.fee
          ? round2Decimals(info.debt + info.fee)
          : "0";
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return props.type === "HOME" ? (
    <Link
      className="auction-link"
      to={{ pathname: `/${auction.id}`, state: { auction: auction } }}
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
              <h6 style={{ color: "rgb(85, 85, 85)" }}>
                {convertExpiryBlocks(auction.expiry) === "Expired"
                  ? ""
                  : "Expire in"}
              </h6>
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
                    {trimHexString(auction.seller, 21)}
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
                  Debt: <span style={{ color: "black" }}>{displayInfo()}</span>
                </h6>
              </div>
              <div className="col-4">
                <h6 style={{ color: "rgb(85, 85, 85)" }}>
                  Face Value: Ξ{" "}
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
