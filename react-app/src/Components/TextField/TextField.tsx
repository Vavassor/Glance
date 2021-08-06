import clsx from "clsx";
import React, {
  ChangeEventHandler,
  DetailedHTMLProps,
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { useState } from "react";
import { joinIds } from "Utilities/HtmlIdAttribute";

type InputType = "email" | "password" | "search" | "text";

export interface TextFieldProps {
  className?: string;
  endInsert?: ReactNode;
  errorId?: string;
  hasError?: boolean;
  helpId?: string;
  id?: string;
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  isDisabled?: boolean;
  isRequired?: boolean;
  maxLength?: number;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  startInsert?: ReactNode;
  type?: InputType;
  value?: string;
}

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      className,
      endInsert,
      errorId,
      hasError,
      helpId,
      id,
      inputProps = {},
      isDisabled,
      isRequired,
      maxLength,
      name,
      onChange,
      placeholder,
      startInsert,
      type = "text",
      value,
    },
    ref
  ) => {
    const { onBlur, ...otherInputProps } = inputProps;
    const [isFocused, setIsFocused] = useState(false);

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(event);
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    return (
      <div
        // className={clsx(
        //   styles.container,
        //   isDisabled && styles.containerDisabled,
        //   isFocused && styles.containerFocused,
        //   hasError && styles.containerError,
        //   hasError && !isFocused && styles.containerErrorBlurred
        // )}
        ref={ref}
      >
        {startInsert}
        <input
          aria-describedby={joinIds(errorId, helpId)}
          aria-invalid={hasError}
          autoComplete="off"
        //   className={clsx(styles.input, className)}
          disabled={isDisabled}
          id={id}
          maxLength={maxLength}
          name={name}
          onBlur={handleBlur}
          onChange={onChange}
          onFocus={handleFocus}
          required={isRequired ? true : undefined}
          placeholder={placeholder}
          spellCheck={false}
          type={type}
          value={value}
          {...otherInputProps}
        />
        {endInsert}
      </div>
    );
  }
);
