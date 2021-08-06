import { Button } from "Components/Button";
import { FormControl } from "Components/FormControl";
import { TextField } from "Components/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createId } from "Utilities/HtmlIdAttribute";

export interface LoginFormData {
  username: string;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const usernameInputId = "username";
  const usernameErrorId = createId(usernameInputId, "error");

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        errorId={usernameErrorId}
        inputId={usernameInputId}
        label={t("login_form.username_field_label")}
      >
        <TextField
          errorId={usernameErrorId}
          inputProps={{ id: usernameInputId, ...register("username") }}
        />
      </FormControl>
      <Button type="submit">{t("login_form.login_button_label")}</Button>
    </form>
  );
};
