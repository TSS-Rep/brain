import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="nav-wrapper black lighten-1">
      <div className="container">
        <BrowserRouter>
          <Link to="/" className="brandLogo">
            <img
              src={process.env.PUBLIC_URL + "/img/watson.gif"}
              alt="Logo"
              id="brainLogo"
            />
          </Link>
          <Link to="/">
            <span className="brand-logo" id="brainTitle">
              BRAIN
            </span>
          </Link>
          <SignedInLinks />
          <SignedOutLinks />
        </BrowserRouter>
      </div>
    </nav>
  );
};

export default Navbar;
