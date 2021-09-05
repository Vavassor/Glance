import { Alert } from "Components/Alert";
import {
  EmailVerificationFormData,
  EmailVerificationFrom,
} from "Components/Forms/EmailVerificationForm";
import { useAppDispatch, useAppSelector } from "Hooks/ReduxHooks";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  completeAccountRegistration,
  selectAccountRegistration,
} from "Slices/AccountRegistrationSlice";
import { AccountSpec } from "Types/Domain";
import { RoutePath } from "Types/RoutePath";
import { createAccount } from "Utilities/Api";

export const VerifyEmail: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const { t } = useTranslation();
  const accountRegistration = useAppSelector(selectAccountRegistration);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSubmit = async (data: EmailVerificationFormData) => {
    try {
      setHasError(false);
      if (!accountRegistration) {
        throw new Error(
          "Missing account registration when creating an account."
        );
      }
      const spec: AccountSpec = {
        accountRegistrationId: accountRegistration.id,
        verificationCode: data.verificationCode,
      };
      await createAccount(spec);
      dispatch(completeAccountRegistration());
      history.push(RoutePath.Login);
    } catch (error) {
      setHasError(true);
    }
  };

  return (
    <div className="m-auto max-w-sm px-3">
      <header className="py-4">
        <h1>{t("verify_email.main_heading")}</h1>
      </header>
      {hasError && <Alert>{t("verify_email.connection_error")}</Alert>}
      <EmailVerificationFrom onSubmit={handleSubmit} />
    </div>
  );
};
