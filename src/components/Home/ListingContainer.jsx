import React from "react";
import InfoCard from "../common/InfoCard";
import { Icon } from "antd";

const ListingContainer = props => {
  const displayListings = () => {
    if (props.auctions.length === 0) {
      return (
        <h2>
          There are currently no running auctions. Please check back later.
        </h2>
      );
    } else {
      return (
        <React.Fragment>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <h2 className="title mb-3" style={{ display: "inline-block" }}>
                  Live Auctions
                </h2>
                <span className="float-right">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => props.onRefresh()}
                    style={{ textDecoration: "none" }}
                  >
                    <Icon
                      type="reload"
                      style={{ color: "green" }}
                      theme="outlined"
                    />
                  </button>
                </span>
              </div>
            </div>
          </div>

          {props.auctions
            .filter(auction => {
              return auction.state <= 1;
            })
            .map(auction => (
              <div
                className="shadow w-100 float-right bg-white rounded"
                style={{ marginBottom: "2.25em" }}
              >
                <InfoCard key={auction.id} auction={auction} type="HOME" />
              </div>
            ))}
        </React.Fragment>
      );
    }
  };

  return <React.Fragment>{displayListings()}</React.Fragment>;
};

export default ListingContainer;
