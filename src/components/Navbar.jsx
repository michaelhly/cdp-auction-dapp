import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
    </nav>
  );
};

export default Navbar;
