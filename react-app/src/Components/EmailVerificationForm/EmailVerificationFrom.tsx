import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { Button } from "Components/Button";
import { FieldError } from "Components/FieldError";
import { TextField } from "Components/TextField";
import { EMAIL_VERIFICATION_CODE_CHARS } from "Constants";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createId } from "Utilities/HtmlIdAttribute";
import * as yup from "yup";

export interface EmailVerificationFormData {
  verificationCode: string;
}

export interface EmailVerificationFromProps {
  className?: string;
  onSubmit: (data: EmailVerificationFormData) => void;
}

const schema = yup.object().shape({
  verificationCode: yup
    .string()
    .required()
    .max(EMAIL_VERIFICATION_CODE_CHARS)
    .min(EMAIL_VERIFICATION_CODE_CHARS)
    .trim(),
});

export const EmailVerificationFrom: React.FC<EmailVerificationFromProps> = ({
  className,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailVerificationFormData>({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();

  const verificationCodeFieldId = "verification-code";
  const verificationCodeErrorId = createId(verificationCodeFieldId, "email");

  return (
    <form
      className={clsx("flex flex-col gap-3", className)}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <TextField
          errorId={
            !!errors.verificationCode ? verificationCodeErrorId : undefined
          }
          hasError={!!errors.verificationCode}
          id={verificationCodeFieldId}
          inputProps={{
            inputMode: "numeric",
            maxLength: EMAIL_VERIFICATION_CODE_CHARS,
            minLength: EMAIL_VERIFICATION_CODE_CHARS,
            ...register("verificationCode"),
          }}
          isRequired={true}
          label={t("email_verification_form.verification_code_field_label")}
          name="verification_code"
        />
        <FieldError className="py-1" id={verificationCodeErrorId}>
          {errors.verificationCode?.message}
        </FieldError>
      </div>
      <Button type="submit">
        {t("email_verification_form.submit_button_label")}
      </Button>
    </form>
  );
};
