import React from "react";
import { NavLink } from "react-router-dom";
import "./SignedInLinks";

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
      <li>
        <a className="dropdown-trigger" href="#!" data-target="dropdown1">
          <i className="material-icons right">arrow_drop_down</i>
        </a>
      </li>
      <ul id="dropdown1" className="dropdown-content">
        <li>
          <a href="#!">one</a>
        </li>
        <li>
          <a href="#!">two</a>
        </li>
        <li className="divider"></li>
        <li>
          <a href="#!">three</a>
        </li>
      </ul>
    </ul>
  );
};

export default SignedInLinks;
