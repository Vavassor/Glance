import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import { createId, joinIds } from "Utilities/HtmlIdAttribute";

interface TextFieldProps {
  className?: string;
  errorId?: string;
  hasError?: boolean;
  helpId?: string;
  id: string;
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  isDisabled?: boolean;
  isRequired?: boolean;
  label: string;
  name: string;
  placeholder?: string;
}

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      className,
      errorId,
      hasError,
      helpId,
      id,
      inputProps,
      isDisabled,
      isRequired,
      label,
      name,
      placeholder,
    },
    ref
  ) => {
    const inputId = createId(id, "input");

    return (
      <div
        className={clsx(
          "border border-gray-500 flex-col focus-within:border-focus focus-within:ring-2 focus-within:ring-focus rounded",
          !!hasError && "border-red-700",
          className
        )}
        id={id}
        ref={ref}
      >
        <label className="block px-2 pt-1" htmlFor={inputId}>
          {label}
          {isRequired && <span aria-hidden="true">&thinsp;*</span>}
        </label>
        <input
          aria-describedby={joinIds(errorId, helpId)}
          aria-invalid={hasError}
          className="block outline-none px-2 pb-1 rounded w-full"
          disabled={isDisabled}
          id={inputId}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          type="text"
          {...inputProps}
        />
      </div>
    );
  }
);
