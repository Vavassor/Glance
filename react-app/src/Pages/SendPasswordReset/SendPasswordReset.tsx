import { Alert } from "Components/Alert";
import {
  SendPasswordResetForm,
  SendPasswordResetFormData,
} from "Components/Forms/SendPasswordResetForm";
import { useAppSelector } from "Hooks/ReduxHooks";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { selectIdentifyAccountResult } from "Slices/PasswordResetSlice";
import { RecoveryMethodType } from "Types/Domain";
import { sendPasswordReset } from "Utilities/Api";

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
      const recoveryMethod = identifyAccountResult.recoveryMethods.find(
        (recoveryMethod) => {
          switch (recoveryMethod.type) {
            case RecoveryMethodType.Email:
              return recoveryMethod.email === data.recoveryMethod;
          }
        }
      )!;
      await sendPasswordReset({
        id: identifyAccountResult.id,
        recovery_method: recoveryMethod,
      });
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
