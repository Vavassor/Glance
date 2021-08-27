import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { Button } from "Components/Button";
import { FieldError } from "Components/FieldError";
import { RadioButton } from "Components/RadioButton";
import { RadioGroup } from "Components/RadioGroup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RecoveryMethod, RecoveryMethodType } from "Types/Domain";
import { createId } from "Utilities/HtmlIdAttribute";
import * as yup from "yup";

interface RadioOption {
  label: string;
  value: string;
}

export interface SendPasswordResetFormData {
  recoveryMethod: string;
}

export interface SendPasswordResetFormProps {
  className?: string;
  onSubmit: (data: SendPasswordResetFormData) => void;
  recoveryMethods: RecoveryMethod[];
}

const schema = yup.object().shape({
  recoveryMethod: yup.string().required(),
});

const getRadioOptionFromRecoveryMethod = (recoveryMethod: RecoveryMethod) => {
  switch (recoveryMethod.type) {
    case RecoveryMethodType.Email: {
      const option: RadioOption = {
        label: recoveryMethod.email,
        value: recoveryMethod.email,
      };
      return option;
    }
  }
};

export const SendPasswordResetForm: React.FC<SendPasswordResetFormProps> = ({
  className,
  onSubmit,
  recoveryMethods,
}) => {
  const [selectedRecoveryMethod, setSelectedRecoveryMethod] =
    useState<RecoveryMethod>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendPasswordResetFormData>({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();

  const recoveryMethodGroupId = "recovery-method";
  const recoveryMethodErrorId = createId(recoveryMethodGroupId, "error");
  const recoveryMethodLabelId = createId(recoveryMethodGroupId, "label");

  return (
    <form
      className={clsx("flex flex-col gap-3", className)}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <RadioGroup labelId={recoveryMethodLabelId}>
          <div id={recoveryMethodLabelId}>
            {t("send_password_reset_form.recovery_method_group_label")}
          </div>
          {recoveryMethods.map((recoveryMethod) => {
            const option = getRadioOptionFromRecoveryMethod(recoveryMethod);

            const handleClick = () => {
              setSelectedRecoveryMethod(recoveryMethod);
            };

            return (
              <RadioButton
                id={createId(recoveryMethodGroupId, recoveryMethod.id)}
                inputProps={{ ...register("recoveryMethod") }}
                isChecked={recoveryMethod === selectedRecoveryMethod}
                key={recoveryMethod.id}
                onClick={handleClick}
                {...option}
              />
            );
          })}
        </RadioGroup>
        <FieldError className="py-1" id={recoveryMethodErrorId}>
          {errors.recoveryMethod?.message}
        </FieldError>
      </div>
      <Button type="submit">
        {t("send_password_reset_form.send_button_label")}
      </Button>
    </form>
  );
};
