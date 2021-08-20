import {
  RegistrationForm,
  RegistrationFormData,
} from "Components/RegistrationForm";
import React from "react";
import { useTranslation } from "react-i18next";

export const Register: React.FC = () => {
  const { t } = useTranslation();

  const handleSubmit = (data: RegistrationFormData) => {};

  return (
    <div className="m-auto max-w-sm px-3">
      <header className="py-4">
        <h1>{t("app.title")}</h1>
      </header>
      <RegistrationForm onSubmit={handleSubmit} />
    </div>
  );
};
