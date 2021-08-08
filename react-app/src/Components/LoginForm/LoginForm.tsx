import clsx from "clsx";
import { Button } from "Components/Button";
import { FieldError } from "Components/FieldError";
import { TextField } from "Components/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createId } from "Utilities/HtmlIdAttribute";

export interface LoginFormData {
  password: string;
  username: string;
}

export interface LoginFormProps {
  className?: string;
  onSubmit: (data: LoginFormData) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  className,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

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
          errorId={usernameErrorId}
          id={usernameFieldId}
          inputProps={{ ...register("username") }}
          label={t("login_form.username_field_label")}
          name="username"
        />
        <FieldError error={errors.username?.message} />
      </div>
      <div>
        <TextField
          errorId={passwordErrorId}
          id={passwordFieldId}
          inputProps={{ type: "password", ...register("password") }}
          label={t("login_form.password_field_label")}
          name="password"
        />
        <FieldError error={errors.password?.message} />
      </div>
      <Button type="submit">{t("login_form.login_button_label")}</Button>
    </form>
  );
};
