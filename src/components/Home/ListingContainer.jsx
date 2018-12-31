import React from "react";
import Listing from "./Listing";
import DisplayLoading from "../DisplayLoading";

const ListingContainer = props => {
  const displayListings = () => {
    if (props.loading) {
      return <DisplayLoading />;
    } else if (props.auctions.length === 0) {
      return (
        <h2>
          There are currently no running auctions. Please check back later.{" "}
        </h2>
      );
    } else {
      return (
        <div>
          <h2 class="title mb-4">Live Auctions</h2>
          {props.auctions
            .filter(auction => {
              return auction.state <= 1;
            })
            .map(auction => (
              <Listing
                key={auction.id}
                auction={auction}
                ethPrice={props.ethPrice}
              />
            ))}
        </div>
      );
    }
  };

  return <div>{displayListings()}</div>;
};

export default ListingContainer;
