import { Button } from "Components/Button";
import { useAppDispatch } from "Hooks/ReduxHooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { logOut } from "Slices/AuthSlice";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClickLogOut = () => {
    dispatch(logOut());
  };

  return (
    <header className="dark:text-white">
      <nav>
        <h1>
          <NavLink
            activeClassName="text-indigo-800 dark:text-indigo-200"
            exact
            to="/"
          >
            {t("main_nav.home_link_label")}
          </NavLink>
        </h1>
        <NavLink
          activeClassName="text-indigo-800 dark:text-indigo-200"
          to="/about"
        >
          {t("main_nav.about_link_label")}
        </NavLink>
      </nav>

      <Button onClick={handleClickLogOut}>
        {t("home.logout_button_label")}
      </Button>
    </header>
  );
};
