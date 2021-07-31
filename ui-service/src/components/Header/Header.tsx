import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
    <header>
      <nav>
        <h1>
          <NavLink activeClassName="text-indigo-800" exact to="/">
            {t("main_nav.home_link_label")}
          </NavLink>
        </h1>
        <NavLink activeClassName="text-indigo-800" to="/about">
          {t("main_nav.about_link_label")}
        </NavLink>
      </nav>
    </header>
  );
};
