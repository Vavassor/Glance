import { Alert } from "Components/Alert";
import {
  SendPasswordResetForm,
  SendPasswordResetFormData,
} from "Components/Forms/SendPasswordResetForm";
import { useAppDispatch, useAppSelector } from "Hooks/ReduxHooks";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  selectIdentifyAccountResult,
  sendPasswordReset,
} from "Slices/PasswordResetSlice";
import { AsyncStatus } from "Types/AsyncStatus";
import { RecoveryMethodType } from "Types/Domain";

export const SendPasswordReset: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const identifyAccountResult = useAppSelector(selectIdentifyAccountResult);
  const sendStatus = useAppSelector(
    (state) => state.passwordReset.sendPasswordReset.status
  );

  if (!identifyAccountResult) {
    // @TODO: Handle this scenario. Redirect back to login?
    return null;
  }

  const handleSubmit = (data: SendPasswordResetFormData) => {
    const recoveryMethod = identifyAccountResult.recoveryMethods.find(
      (recoveryMethod) => {
        switch (recoveryMethod.type) {
          default:
          case RecoveryMethodType.Email:
            return recoveryMethod.email === data.recoveryMethod;
        }
      }
    )!;
    dispatch(
      sendPasswordReset({
        id: identifyAccountResult.id,
        recovery_method: recoveryMethod,
      })
    );
  };

  return (
    <div className="m-auto max-w-sm px-3">
      <header className="py-4">
        <h1>{t("send_password_reset.main_heading")}</h1>
      </header>
      {sendStatus === AsyncStatus.Failure && (
        <Alert>{t("send_password_reset.connection_error")}</Alert>
      )}
      <SendPasswordResetForm
        onSubmit={handleSubmit}
        recoveryMethods={identifyAccountResult.recoveryMethods}
      />
    </div>
  );
};
