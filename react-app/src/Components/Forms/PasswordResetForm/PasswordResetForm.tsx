import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { Button } from "Components/Button";
import { FieldError } from "Components/FieldError";
import { PasswordField } from "Components/PasswordField";
import { PASSWORD_MAX_CHARS, PASSWORD_MIN_CHARS } from "Constants";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createId } from "Utilities/HtmlIdAttribute";
import * as yup from "yup";

export interface PasswordResetFormProps {
  className?: string;
  onSubmit: (data: PasswordResetFormData) => void;
}

export interface PasswordResetFormData {
  password: string;
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required()
    .max(PASSWORD_MAX_CHARS)
    .min(PASSWORD_MIN_CHARS),
});

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  className,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();

  const passwordFieldId = "password";
  const passwordErrorId = createId(passwordFieldId, "error");

  return (
    <form
      className={clsx("flex flex-col gap-3", className)}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <PasswordField
          errorId={!!errors.password ? passwordErrorId : undefined}
          hasError={!!errors.password}
          id={passwordFieldId}
          inputProps={{ autoComplete: "new-password", ...register("password") }}
          isRequired={true}
          label={t("password_reset_form.password_field_label")}
          name="password"
        />
        <FieldError className="py-1" id={passwordErrorId}>
          {errors.password?.message}
        </FieldError>
      </div>
      <Button type="submit">
        {t("password_reset_form.reset_password_button_label")}
      </Button>
    </form>
  );
};
