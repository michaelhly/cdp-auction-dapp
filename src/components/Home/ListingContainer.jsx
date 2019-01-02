import React from "react";
import InfoCard from "../common/InfoCard";

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
        <div>
          <h2 className="title mb-4">Live Auctions</h2>
          {props.auctions
            .filter(auction => {
              return auction.state <= 1;
            })
            .map(auction => (
              <InfoCard key={auction.id} auction={auction} type="HOME" />
            ))}
        </div>
      );
    }
  };

  return <div>{displayListings()}</div>;
};

export default ListingContainer;
