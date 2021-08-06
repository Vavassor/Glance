import { LoginForm, LoginFormData } from "Components/LoginForm";
import React from "react";
import { useTranslation } from "react-i18next";

export const Login: React.FC = () => {
  const { t } = useTranslation();

  const handleSubmit = (data: LoginFormData) => {

  }

  return (
    <>
      <h1>{t("app.title")}</h1>
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
};
