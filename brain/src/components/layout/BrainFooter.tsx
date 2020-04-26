import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

const BrainFooter: React.FC = () => {
  return (
    <Navbar id="brainNavFooter" variant="dark" className="fixed-bottom">
      <span className="text-center text-light">
        Eduardo Santos - TSS - Copyright 2020
      </span>
    </Navbar>
  );
};

export default BrainFooter;
