import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import SearchBar from "./SearchBar";
import "./Navbar.css";

const BrainNav: React.FC = () => {
  return (
    <Navbar id="brainNav" expand="lg" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Brand href="/">
        <img
          src={process.env.PUBLIC_URL + "/img/watson.gif"}
          alt="Logo"
          id="brainLogo"
        />
        BRAIN
      </Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Col xs={2}></Col>
        <SearchBar />
        <SignedInLinks />
        <SignedOutLinks />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default BrainNav;
