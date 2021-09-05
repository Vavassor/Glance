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
    <header className="dark:text-white m-auto max-w-sm">
      <nav>
        <NavLink
          activeClassName="text-indigo-800 dark:text-indigo-200"
          className="block"
          exact
          to="/home"
        >
          {t("main_nav.home_link_label")}
        </NavLink>
        <NavLink
          activeClassName="text-indigo-800 dark:text-indigo-200"
          className="block"
          to="/about"
        >
          {t("main_nav.about_link_label")}
        </NavLink>
        <NavLink
          activeClassName="text-indigo-800 dark:text-indigo-200"
          className="block"
          to="/post"
        >
          {t("main_nav.post_link_label")}
        </NavLink>
      </nav>

      <Button onClick={handleClickLogOut}>
        {t("home.logout_button_label")}
      </Button>
    </header>
  );
};
