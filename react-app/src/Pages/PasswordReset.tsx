import { Alert } from "Components/Alert";
import {
  PasswordResetForm,
  PasswordResetFormData,
} from "Components/Forms/PasswordResetForm";
import { useQuery } from "Hooks/useQuery";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { RoutePath } from "Types/RoutePath";
import { updatePassword } from "Utilities/Api";

export const PasswordReset: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  const query = useQuery();
  const { t } = useTranslation();

  const handleSubmit = async (data: PasswordResetFormData) => {
    try {
      setHasError(false);

      const token = query.get("token");
      if (!token) {
        throw new Error('"token" query parameter is missing.');
      }

      await updatePassword(token, { password: data.password });
      history.push(RoutePath.Login);
    } catch (error) {
      setHasError(true);
    }
  };

  return (
    <div className="m-auto max-w-sm px-3">
      <header className="py-4">
        <h1>{t("password_reset.main_heading")}</h1>
      </header>
      {hasError && <Alert>{t("password_reset.connection_error")}</Alert>}
      <PasswordResetForm onSubmit={handleSubmit} />
    </div>
  );
};
