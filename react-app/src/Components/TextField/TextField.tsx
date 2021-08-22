import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { createId, joinIds } from "Utilities/HtmlIdAttribute";

export interface TextFieldProps {
  className?: string;
  endInset?: ReactNode;
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
  startInset?: ReactNode;
}

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      className,
      endInset,
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
      startInset,
    },
    ref
  ) => {
    const { onBlur, onFocus, ...remainingInputProps } = inputProps || {};
    const [isFocused, setIsFocused] = useState(false);
    const inputId = createId(id, "input");

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      if (onBlur) {
        onBlur(event);
      }
      setIsFocused(false);
    };

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      if (onFocus) {
        onFocus(event);
      }
      setIsFocused(true);
    };

    return (
      <div
        className={clsx(
          "border border-gray-500 flex-col rounded",
          !!hasError && "border-red-700",
          isFocused && "border-focus ring-2 ring-focus",
          className
        )}
        id={id}
        ref={ref}
      >
        <label className="block px-2 pt-1" htmlFor={inputId}>
          {label}
          {isRequired && <span aria-hidden="true">&thinsp;*</span>}
        </label>
        <div className="flex flex-row pb-1 px-2">
          {startInset}
          <input
            aria-describedby={joinIds(errorId, helpId)}
            aria-invalid={hasError}
            className="block outline-none rounded w-full"
            disabled={isDisabled}
            id={inputId}
            name={name}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder={placeholder}
            required={isRequired}
            type="text"
            {...remainingInputProps}
          />
          {endInset}
        </div>
      </div>
    );
  }
);
