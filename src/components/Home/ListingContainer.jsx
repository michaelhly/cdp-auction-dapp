import React from "react";
import { Spin, Icon } from "antd";
import Listing from "./Listing";
import styled from "styled-components";

const Sdiv = styled.div`
  position: absolute;
  right: 30vh;
  width: 30vh;
`;

const ListingContainer = props => {
  const displayListings = () => {
    if (props.loading) {
      return (
        <Sdiv>
          <Spin
            size="large"
            indicator={
              <Icon
                type="loading"
                style={{ color: "green" }}
                theme="outlined"
              />
            }
          />
        </Sdiv>
      );
    } else if (props.auctions.length === 0) {
      return (
        <h1>
          There are currently no running auctions. Please check back later.{" "}
        </h1>
      );
    } else {
      return (
        <div>
          {props.auctions
            .filter(auction => {
              return auction.state <= 1;
            })
            .map(auction => (
              <Listing key={auction.id} auction={auction} />
            ))}
        </div>
      );
    }
  };

  return <div>{displayListings()}</div>;
};

export default ListingContainer;
