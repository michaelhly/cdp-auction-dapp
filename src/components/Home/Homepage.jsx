import React from "react";
import StickyBox from "react-sticky-box";
import ListingContainer from "./ListingContainer";
import CdpMenu from "./Menu";

const Homepage = props => {
  return (
    <React.Fragment>
      <div class="container">
        <div class="row">
          <div class="col-auto">
            <StickyBox offsetTop={50}>
              <CdpMenu />
            </StickyBox>
          </div>
          <div
            class="col-8"
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            <ListingContainer
              auctions={props.auctions}
              loading={props.loading}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
