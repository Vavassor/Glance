import { Alert } from "Components/Alert";
import {
  SendPasswordResetForm,
  SendPasswordResetFormData,
} from "Components/Forms/SendPasswordResetForm";
import { useAppSelector } from "Hooks/ReduxHooks";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { selectIdentifyAccountResult } from "Slices/PasswordResetSlice";

export const SendPasswordReset: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const { t } = useTranslation();
  const identifyAccountResult = useAppSelector(selectIdentifyAccountResult);

  if (!identifyAccountResult) {
    // @TODO: Handle this scenario. Redirect back to login?
    return null;
  }

  const handleSubmit = async (data: SendPasswordResetFormData) => {
    try {
      setHasError(false);
    } catch (error) {
      setHasError(true);
    }
  };

  return (
    <div className="m-auto max-w-sm px-3">
      {hasError && <Alert>{t("send_password_reset.connection_error")}</Alert>}
      <SendPasswordResetForm
        onSubmit={handleSubmit}
        recoveryMethods={identifyAccountResult.recoveryMethods}
      />
    </div>
  );
};
