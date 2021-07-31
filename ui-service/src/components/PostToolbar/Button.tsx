import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  KeyboardEventHandler,
} from "react";
import { Key } from "Types/Key";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  buttonKey: string;
  label: string;
  onFocusEnd: () => void;
  onFocusNext: (key: string) => void;
  onFocusPrior: (key: string) => void;
  onFocusStart: () => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonKey,
      label,
      onFocusEnd,
      onFocusNext,
      onFocusPrior,
      onFocusStart,
      ...remainingProps
    },
    ref
  ) => {
    const handleKeyDown: KeyboardEventHandler<HTMLButtonElement> = (event) => {
      switch (event.key) {
        case Key.ArrowLeft:
          onFocusPrior(buttonKey);
          break;

        case Key.ArrowRight:
          onFocusNext(buttonKey);
          break;

        case Key.End:
          event.preventDefault();
          onFocusEnd();
          break;

        case Key.Home:
          event.preventDefault();
          onFocusStart();
          break;
      }
    };

    return (
      <button
        className="bg-primary focus:outline-none focus:ring-2 focus:ring-focus px-2 py-1 rounded-sm text-black"
        onKeyDown={handleKeyDown}
        ref={ref}
        {...remainingProps}
      >
        {label}
      </button>
    );
  }
);
