import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import SignedInLinks from "./signedInLinks";
import SignedOutLinks from "./signedOutLinks";

const Navbar: React.FC = () => {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <BrowserRouter>
          <Link to="/" className="brandLogo">
            Brain
          </Link>
          <SignedInLinks />
          <SignedOutLinks />
        </BrowserRouter>
      </div>
    </nav>
  );
};

export default Navbar;
