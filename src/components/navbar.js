import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-light bg-light shadow-sm p-3 mb-4">
        <a class="navbar-brand" href="#">
          CDP.Auction
        </a>

        <ul class="navbar-nav navbar-expand-lg mr-auto">
          <li class="nav-item m-2 active">
            <a class="nav-link" href="#">
              Home <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item m-2">
            <a class="nav-link" href="#">
              My Auctions
            </a>
          </li>
          <li class="nav-item m-2">
            <a class="nav-link" href="#">
              My Bids
            </a>
          </li>
        </ul>

        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </nav>
    );
  }
}

export default Navbar;
