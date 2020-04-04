import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks: React.FC = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/">Predictive</NavLink>
      </li>
      <li>
        <NavLink to="/">Analytics</NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          ES
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedInLinks;
