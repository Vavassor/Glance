import {
  EmailVerificationFormData,
  EmailVerificationFrom,
} from "Components/EmailVerificationForm";
import React from "react";

export const VerifyEmail: React.FC = () => {
  const handleSubmit = (data: EmailVerificationFormData) => {};

  return (
    <div className="m-auto max-w-sm px-3">
      <EmailVerificationFrom onSubmit={handleSubmit} />
    </div>
  );
};
