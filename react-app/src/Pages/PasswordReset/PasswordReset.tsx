import {
  PasswordResetForm,
  PasswordResetFormData,
} from "Components/Forms/PasswordResetForm";
import React from "react";

export const PasswordReset: React.FC = () => {
  const handleSubmit = (data: PasswordResetFormData) => {};

  return (
    <div className="m-auto max-w-sm px-3">
      <PasswordResetForm onSubmit={handleSubmit} />
    </div>
  );
};
