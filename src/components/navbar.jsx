import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light shadow-sm p-3 mb-4">
        <a className="navbar-brand" href="#">
          CDP.Auction
        </a>

        <ul className="navbar-nav navbar-expand mr-auto">
          <li className="nav-item m-2 active">
            <a className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item m-2">
            <a className="nav-link" href="#">
              My Auctions
            </a>
          </li>
          <li className="nav-item m-2">
            <a className="nav-link" href="#">
              My Bids
            </a>
          </li>
        </ul>

        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="AuctionID"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </nav>
    );
  }
}

export default Navbar;
