import { Link } from "Components/Link";
import { LoginForm, LoginFormData } from "Components/LoginForm";
import React from "react";
import { useTranslation } from "react-i18next";
import { RoutePath } from "Types/RoutePath";

export const Login: React.FC = () => {
  const { t } = useTranslation();

  const handleSubmit = (data: LoginFormData) => {};

  return (
    <div className="m-auto max-w-sm px-3">
      <header className="py-4">
        <h1>{t("app.title")}</h1>
      </header>
      <LoginForm onSubmit={handleSubmit} />
      <div className="flex flex-col items-start">
        <Link to={RoutePath.BeginPasswordReset}>
          {t("login.begin_password_reset_link")}
        </Link>
        <Link to={RoutePath.Register}>{t("login.register_link")}</Link>
      </div>
    </div>
  );
};
