import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
} from "react";

export interface RadioButtonProps {
  className?: string;
  id: string;
  isChecked: boolean;
  isDisabled?: boolean;
  inputProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  label: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
  value: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  className,
  id,
  inputProps,
  isChecked,
  isDisabled,
  label,
  onClick,
  value,
}) => {
  return (
    <div className={clsx("flex flex-row", className)}>
      <input
        checked={isChecked}
        disabled={isDisabled}
        id={id}
        onClick={onClick}
        type="radio"
        value={value}
        {...inputProps}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
