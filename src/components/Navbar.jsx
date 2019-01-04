import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");

  const handleInput = e => {
    setSearch(e.currentTarget.value);
  };

  return (
    <nav className="navbar navbar-light bg-light shadow-sm p-3 mb-4">
      <div className="navbar-brand" to="/">
        CDP.Auction
      </div>

      <ul className="navbar-nav navbar-expand mr-auto">
        <li className="nav-item m-2">
          <NavLink exact className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item m-2">
          <NavLink className="nav-link" to="/myauctions">
            My Auctions
          </NavLink>
        </li>
        <li className="nav-item m-2">
          <NavLink className="nav-link" to="/mybids">
            My Bids
          </NavLink>
        </li>
      </ul>

      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="AuctionID"
          aria-label="Search"
          value={search}
          onChange={e => handleInput(e)}
        />
        <Link className="auction-link" to={`/${search}`}>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </Link>
      </form>
    </nav>
  );
};

export default Navbar;
