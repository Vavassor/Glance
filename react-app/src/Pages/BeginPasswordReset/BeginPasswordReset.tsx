import { Alert } from "Components/Alert";
import {
  BeginPasswordResetData,
  BeginPasswordResetForm,
} from "Components/Forms/BeginPasswordResetForm";
import { useAppDispatch } from "Hooks/ReduxHooks";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { setIdentifyAccountResult } from "Slices/PasswordResetSlice";
import { RoutePath } from "Types/RoutePath";
import { identifyAccount } from "Utilities/Api";

export const BeginPasswordReset: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = async (data: BeginPasswordResetData) => {
    try {
      setHasError(false);
      const result = await identifyAccount({ query: data.emailOrUsername });
      dispatch(setIdentifyAccountResult(result));
      history.push(RoutePath.SendPasswordReset);
    } catch (error) {
      setHasError(true);
    }
  };

  return (
    <div className="m-auto max-w-sm px-3">
      {hasError && <Alert>{t("begin_password_reset.connection_error")}</Alert>}
      <BeginPasswordResetForm onSubmit={handleSubmit} />
    </div>
  );
};
