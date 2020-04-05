import React from "react";
import Nav from "react-bootstrap/Nav";

const SignedOutLinks: React.FC = () => {
  return (
    <Nav>
      <Nav.Link href="#home">Sign In</Nav.Link>
      <Nav.Link href="#features">Sign Up</Nav.Link>
    </Nav>
  );
};

export default SignedOutLinks;
