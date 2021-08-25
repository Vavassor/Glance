import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { Button } from "Components/Button";
import { FieldError } from "Components/FieldError";
import { PasswordField } from "Components/PasswordField";
import { TextField } from "Components/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createId } from "Utilities/HtmlIdAttribute";
import * as yup from "yup";

export interface LoginFormData {
  password: string;
  username: string;
}

export interface LoginFormProps {
  className?: string;
  onSubmit: (data: LoginFormData) => void;
}

const schema = yup.object().shape({
  password: yup.string().required(),
  username: yup.string().required(),
});

export const LoginForm: React.FC<LoginFormProps> = ({
  className,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

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
          errorId={!!errors.username ? usernameErrorId : undefined}
          hasError={!!errors.username}
          id={usernameFieldId}
          inputProps={{
            autoCapitalize: "off",
            autoComplete: "username",
            ...register("username"),
          }}
          isRequired={true}
          label={t("login_form.username_field_label")}
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
          inputProps={{
            autoComplete: "current-password",
            ...register("password"),
          }}
          isRequired={true}
          label={t("login_form.password_field_label")}
          name="password"
        />
        <FieldError className="pt-1" id={passwordErrorId}>
          {errors.password?.message}
        </FieldError>
      </div>
      <Button type="submit">{t("login_form.login_button_label")}</Button>
    </form>
  );
};
