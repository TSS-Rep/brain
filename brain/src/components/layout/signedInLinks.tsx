import React from "react";
import Nav from "react-bootstrap/Nav";

const SignedInLinks: React.FC = () => {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="#home">Predictive</Nav.Link>
      <Nav.Link href="#features">Analytics</Nav.Link>
      <Nav.Link href="#features">Scheduler</Nav.Link>
    </Nav>
  );
};

export default SignedInLinks;
