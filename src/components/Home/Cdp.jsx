import React from "react";
import { Link } from "react-router-dom";

const Cdp = props => {
  return (
    <div class="shadow float-right w-100 mb-5 bg-white rounded">
      <Link
        className="auction-link"
        to={`/${props.auction.id}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        <div className="card-body">
          <h5 className="card-title">CDP {props.auction.cdp}</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Cdp;
