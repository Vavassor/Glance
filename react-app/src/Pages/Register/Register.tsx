import { Alert } from "Components/Alert";
import {
  RegistrationForm,
  RegistrationFormData,
} from "Components/RegistrationForm";
import { useAccessToken } from "Hooks/useAccessToken";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AccountRegistrationSpec } from "Types/Domain";
import { createAccountRegistration } from "Utilities/Api";

export const Register: React.FC = () => {
  const { t } = useTranslation();
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (data: RegistrationFormData) => {
    try {
      const spec: AccountRegistrationSpec = {
        email: data.email,
        password: data.password,
        username: data.username,
      };
      await createAccountRegistration(spec);
    } catch (error) {
      setHasError(true);
    }
  };

  return (
    <div className="m-auto max-w-sm px-3">
      <header className="py-4">
        <h1>{t("app.title")}</h1>
      </header>
      {hasError && <Alert>{t("register.connection_error")}</Alert>}
      <RegistrationForm onSubmit={handleSubmit} />
    </div>
  );
};
