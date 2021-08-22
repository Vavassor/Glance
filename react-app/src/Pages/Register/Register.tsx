import { Alert } from "Components/Alert";
import {
  RegistrationForm,
  RegistrationFormData,
} from "Components/RegistrationForm";
import { useAppDispatch } from "Hooks/ReduxHooks";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { setAccountRegistration } from "Slices/AccountRegistrationSlice";
import { AccountRegistrationSpec } from "Types/Domain";
import { RoutePath } from "Types/RoutePath";
import { createAccountRegistration } from "Utilities/Api";

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (data: RegistrationFormData) => {
    try {
      const spec: AccountRegistrationSpec = {
        email: data.email,
        password: data.password,
        username: data.username,
      };
      const accountRegistration = await createAccountRegistration(spec);
      dispatch(setAccountRegistration(accountRegistration));
      history.push(RoutePath.VerifyEmail);
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
