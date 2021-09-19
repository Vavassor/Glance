import { Alert } from "Components/Alert";
import {
  BeginPasswordResetData,
  BeginPasswordResetForm,
} from "Components/Forms/BeginPasswordResetForm";
import { useAppDispatch, useAppSelector } from "Hooks/ReduxHooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { identifyAccount } from "Slices/PasswordResetSlice";
import { AsyncStatus } from "Types/AsyncStatus";
import { RoutePath } from "Types/RoutePath";

export const BeginPasswordReset: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const status = useAppSelector(
    (state) => state.passwordReset.identifyAccount.status
  );

  const handleSubmit = async (data: BeginPasswordResetData) => {
    await dispatch(identifyAccount({ query: data.emailOrUsername })).unwrap();
    history.push(RoutePath.SendPasswordReset);
  };

  return (
    <div className="m-auto max-w-sm px-3">
      <header className="py-4">
        <h1>{t("begin_password_reset.main_heading")}</h1>
      </header>
      {status === AsyncStatus.Failure && (
        <Alert>{t("begin_password_reset.connection_error")}</Alert>
      )}
      <BeginPasswordResetForm onSubmit={handleSubmit} />
    </div>
  );
};
