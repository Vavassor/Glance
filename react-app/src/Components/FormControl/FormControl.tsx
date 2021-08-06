import { Label, LabelProps } from "Components/Label";
import React, { forwardRef, PropsWithChildren } from "react";
import { createId } from "Utilities/HtmlIdAttribute";

interface FormControlProps {
  className?: string;
  label: string;
  error?: string;
  errorId?: string;
  help?: string;
  helpId?: string;
  inputId: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  labelProps?: Partial<LabelProps>;
}

export const FormControl = forwardRef<
  HTMLDivElement,
  PropsWithChildren<FormControlProps>
>(
  (
    {
      children,
      className,
      error,
      errorId,
      help,
      helpId,
      inputId,
      isDisabled,
      isRequired,
      label,
      labelProps,
    },
    ref
  ) => {
    const labelId = createId(inputId, "label");

    return (
      <div className={className} ref={ref}>
        <Label
          hasError={!!error}
          htmlFor={inputId}
          id={labelId}
          isDisabled={isDisabled}
          isRequired={isRequired}
          {...labelProps}
        >
          {label}
        </Label>
        {children}
        {help && (
          <small className="text-sm" id={helpId}>
            {help}
          </small>
        )}
        {error && (
          <div className="text-red-700" id={errorId}>
            {error}
          </div>
        )}
      </div>
    );
  }
);
