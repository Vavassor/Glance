import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { Button } from "Components/Button";
import { FieldError } from "Components/FieldError";
import { TextField } from "Components/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createId } from "Utilities/HtmlIdAttribute";
import * as yup from "yup";

export interface BeginPasswordResetData {
  emailOrUsername: string;
}

export interface BeginPasswordResetProps {
  className?: string;
  onSubmit: (data: BeginPasswordResetData) => void;
}

const schema = yup.object().shape({
  password: yup.string().required(),
});

export const BeginPasswordResetForm: React.FC<BeginPasswordResetProps> = ({
  className,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BeginPasswordResetData>({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();

  const emailOrUsernameFieldId = "email-or-username";
  const emailOrUsernameErrorId = createId(emailOrUsernameFieldId, "error");

  return (
    <form
      className={clsx("flex flex-col gap-3", className)}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <TextField
          errorId={
            !!errors.emailOrUsername ? emailOrUsernameErrorId : undefined
          }
          hasError={!!errors.emailOrUsername}
          id={emailOrUsernameFieldId}
          inputProps={{ ...register("emailOrUsername") }}
          isRequired={true}
          label={t("begin_password_reset_form.email_or_username_field_label")}
          name="email_or_username"
        />
        <FieldError className="py-1" id={emailOrUsernameErrorId}>
          {errors.emailOrUsername?.message}
        </FieldError>
      </div>
      <Button type="submit">
        {t("begin_password_reset_form.search_button_label")}
      </Button>
    </form>
  );
};
