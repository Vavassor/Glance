import { Alert } from "Components/Alert";
import {
  RegistrationForm,
  RegistrationFormData,
} from "Components/Forms/RegistrationForm";
import { useAppDispatch, useAppSelector } from "Hooks/ReduxHooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { createAccountRegistration } from "Slices/AccountRegistrationSlice";
import { AsyncStatus } from "Types/AsyncStatus";
import { AccountRegistrationSpec } from "Types/Domain";
import { RoutePath } from "Types/RoutePath";

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const createRegistrationStatus = useAppSelector(
    (state) => state.accountRegistration.createRegistration.status
  );

  const handleSubmit = async (data: RegistrationFormData) => {
    const spec: AccountRegistrationSpec = {
      email: data.email,
      password: data.password,
      username: data.username,
    };
    await dispatch(createAccountRegistration(spec)).unwrap();
    history.push(RoutePath.VerifyEmail);
  };

  return (
    <div className="m-auto max-w-sm px-3">
      <header className="py-4">
        <h1>{t("register.main_heading")}</h1>
      </header>
      {createRegistrationStatus === AsyncStatus.Failure && (
        <Alert>{t("register.connection_error")}</Alert>
      )}
      <RegistrationForm onSubmit={handleSubmit} />
    </div>
  );
};
