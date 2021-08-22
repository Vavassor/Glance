import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as Visibility } from "Assets/Images/visibility_black_24dp.svg";
import { ReactComponent as VisibilityOff } from "Assets/Images/visibility_off_black_24dp.svg";
import clsx from "clsx";

interface VisibilityButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isShowing: boolean;
}

export const VisibilityButton: React.FC<VisibilityButtonProps> = ({
  className,
  isShowing,
  ...buttonProps
}) => {
  const { t } = useTranslation();
  const hideLabel = t("password_field.hide_button_label");
  const showLabel = t("password_field.show_button_label");

  return (
    <button
      aria-label={isShowing ? hideLabel : showLabel}
      className={clsx(
        "focus:outline-none focus:ring-2 focus:ring-focus rounded-full",
        className
      )}
      type="button"
      {...buttonProps}
    >
      {isShowing ? <VisibilityOff /> : <Visibility />}
    </button>
  );
};
