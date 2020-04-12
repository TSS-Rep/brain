import React from "react";
import Nav from "react-bootstrap/Nav";

const SignedInLinks: React.FC = () => {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="/predictive">Predictive</Nav.Link>
      <Nav.Link href="/analytics">Analytics</Nav.Link>
      <Nav.Link href="/scheduler">Scheduler</Nav.Link>
    </Nav>
  );
};

export default SignedInLinks;
