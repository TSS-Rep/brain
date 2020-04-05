import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks: React.FC = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/">Sign In</NavLink>
      </li>
      <li>
        <NavLink to="/">Sign Up</NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
