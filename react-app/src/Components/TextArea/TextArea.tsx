import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  FocusEventHandler,
  forwardRef,
  ReactNode,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { createId, joinIds } from "Utilities/HtmlIdAttribute";

export interface TextAreaProps {
  className?: string;
  columnCount?: number;
  endInset?: ReactNode;
  errorId?: string;
  hasError?: boolean;
  helpId?: string;
  id: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  rowCount?: number;
  startInset?: ReactNode;
  textareaProps?: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
}

export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(
  (
    {
      className,
      columnCount = 50,
      endInset,
      errorId,
      hasError,
      helpId,
      id,
      isDisabled,
      isRequired,
      label,
      name,
      placeholder,
      rowCount = 2,
      startInset,
      textareaProps,
    },
    ref
  ) => {
    const { onBlur, onFocus, ...remainingTextareaProps } = textareaProps || {};
    const [isFocused, setIsFocused] = useState(false);
    const textareaId = createId(id, "textarea");

    const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (event) => {
      if (onBlur) {
        onBlur(event);
      }
      setIsFocused(false);
    };

    const handleFocus: FocusEventHandler<HTMLTextAreaElement> = (event) => {
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
        <label className="block px-2 pt-1" htmlFor={textareaId}>
          {label}
          {isRequired && <span aria-hidden="true">&thinsp;*</span>}
        </label>
        <div className="flex flex-row pb-1 px-2">
          {startInset}
          <textarea
            aria-describedby={joinIds(errorId, helpId)}
            aria-invalid={hasError}
            className="block outline-none resize-none rounded w-full"
            cols={columnCount}
            disabled={isDisabled}
            id={textareaId}
            name={name}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder={placeholder}
            required={isRequired}
            rows={rowCount}
            {...remainingTextareaProps}
          />
          {endInset}
        </div>
      </div>
    );
  }
);
