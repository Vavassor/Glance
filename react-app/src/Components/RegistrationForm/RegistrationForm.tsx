import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { Button } from "Components/Button";
import { FieldError } from "Components/FieldError";
import { PasswordField } from "Components/PasswordField";
import { TextField } from "Components/TextField";
import {
  EMAIL_MAX_CHARS,
  EMAIL_MIN_CHARS,
  PASSWORD_MAX_CHARS,
  PASSWORD_MIN_CHARS,
  USERNAME_MAX_CHARS,
  USERNAME_MIN_CHARS,
} from "Constants";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createId } from "Utilities/HtmlIdAttribute";
import * as yup from "yup";

export interface RegistrationFormData {
  email: string;
  password: string;
  username: string;
}

export interface RegistrationFormProps {
  className?: string;
  onSubmit: (data: RegistrationFormData) => void;
}

const schema = yup.object().shape({
  email: yup.string().required().email().trim(),
  password: yup
    .string()
    .required()
    .max(PASSWORD_MAX_CHARS)
    .min(PASSWORD_MIN_CHARS),
  username: yup
    .string()
    .required()
    .max(USERNAME_MAX_CHARS)
    .min(USERNAME_MIN_CHARS)
    .trim(),
});

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  className,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();

  const emailFieldId = "email";
  const emailErrorId = createId(emailFieldId, "error");
  const passwordFieldId = "password";
  const passwordErrorId = createId(passwordFieldId, "error");
  const usernameFieldId = "username";
  const usernameErrorId = createId(usernameFieldId, "error");

  return (
    <form
      className={clsx("flex flex-col gap-3", className)}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <TextField
          errorId={!!errors.email ? emailErrorId : undefined}
          hasError={!!errors.email}
          id={emailFieldId}
          inputProps={{
            autoComplete: "email",
            maxLength: EMAIL_MAX_CHARS,
            minLength: EMAIL_MIN_CHARS,
            ...register("email"),
          }}
          isRequired={true}
          label={t("registration_form.email_field_label")}
          name="email"
        />
        <FieldError className="py-1" id={emailErrorId}>
          {errors.email?.message}
        </FieldError>
      </div>
      <div>
        <TextField
          errorId={!!errors.username ? usernameErrorId : undefined}
          hasError={!!errors.username}
          id={usernameFieldId}
          inputProps={{
            autoCapitalize: "off",
            autoComplete: "username",
            maxLength: USERNAME_MAX_CHARS,
            minLength: USERNAME_MIN_CHARS,
            ...register("username"),
          }}
          isRequired={true}
          label={t("registration_form.username_field_label")}
          name="username"
        />
        <FieldError className="py-1" id={usernameErrorId}>
          {errors.username?.message}
        </FieldError>
      </div>
      <div>
        <PasswordField
          errorId={!!errors.password ? passwordErrorId : undefined}
          hasError={!!errors.password}
          id={passwordFieldId}
          inputProps={{ autoComplete: "new-password", ...register("password") }}
          isRequired={true}
          label={t("registration_form.password_field_label")}
          name="password"
        />
        <FieldError className="py-1" id={passwordErrorId}>
          {errors.password?.message}
        </FieldError>
      </div>
      <Button type="submit">
        {t("registration_form.send_verification_button_label")}
      </Button>
    </form>
  );
};
