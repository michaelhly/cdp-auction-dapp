import React, { useState } from "react";
import StickyBox from "react-sticky-box";
import ListingContainer from "./ListingContainer";
import CdpManager from "../CdpManager";
import { paginate } from "../../utils/helpers";
import Pagination from "./Pagination";

const Homepage = props => {
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const paginatedAuctions = paginate(props.auctions, currentPage, pageSize);

  return (
    <React.Fragment>
      <div class="container">
        <div class="row">
          <div class="col-auto">
            <StickyBox offsetTop={50}>
              <CdpManager />
            </StickyBox>
          </div>
          <div
            class="col-8"
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            <div className="row">
              <ListingContainer
                auctions={paginatedAuctions}
                loading={props.loading}
                ethPrice={props.ethPrice}
              />
              <div className="mx-auto">
                <Pagination
                  itemCount={props.auctions.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
