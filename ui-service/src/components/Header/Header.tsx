import React from "react";
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header>
      <h1>
        <NavLink activeClassName="text-indigo-800" exact to="/">
          Home
        </NavLink>
      </h1>
      <nav>
        <NavLink activeClassName="text-indigo-800" to="/about">
          About
        </NavLink>
      </nav>
    </header>
  );
};
