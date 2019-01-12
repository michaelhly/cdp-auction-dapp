import React, { useState } from "react";
import ListingContainer from "./ListingContainer";
import CdpPanel from "../CdpPanel/CdpPanel";
import { paginate } from "../../utils/helpers";
import Pagination from "./Pagination";
import DisplayLoading from "../common/DisplayLoading";

const Homepage = props => {
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const paginatedAuctions = paginate(props.auctions, currentPage, pageSize);

  const toggleListings = () => {
    if (!props.auctions) {
      return (
        <div
          className="mx-auto align-items-center"
          style={{ display: "flex", alignItems: "flex-start", height: "450px" }}
        >
          <DisplayLoading size="large" />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div
            className="col-12"
            style={{ display: "flex", alignItems: "flex-start" }}
          />
          <ListingContainer auctions={paginatedAuctions} />
          <div className="mx-auto">
            <Pagination
              itemCount={props.auctions.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <CdpPanel
              maker={props.maker}
              proxy={props.proxy}
              cdps={props.cdp}
              onSetProxy={props.onSetProxy}
              onModal={props.onModal}
            />
          </div>
          <div className="col-8">
            <div className="row">{toggleListings()}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
