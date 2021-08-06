import clsx from "clsx";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
} from "react";

type ButtonType = "button" | "submit" | "reset";

interface ButtonVariantClassNames {
  button?: string;
}

const primaryClassNames: ButtonVariantClassNames = {
  button: "bg-primary font-bold px-2 py-1 text-white",
};

export interface ButtonProps {
  buttonProps?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variantClassNames?: ButtonVariantClassNames;
  type?: ButtonType;
}

export const Button: React.FC<ButtonProps> = ({
  buttonProps,
  children,
  className,
  onClick,
  type = "button",
  variantClassNames = primaryClassNames,
}) => {
  return (
    <button
      className={clsx(variantClassNames.button, className)}
      onClick={onClick}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
