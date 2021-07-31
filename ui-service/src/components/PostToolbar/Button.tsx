import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  KeyboardEventHandler,
} from "react";
import { useAppSelector } from "ReduxHooks";
import { selectLayoutDirection } from "Slices/ThemeSlice";
import { Key } from "Types/Key";
import { LayoutDirection } from "Types/Theme";

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
    const layoutDirection = useAppSelector(selectLayoutDirection);

    const handleKeyDown: KeyboardEventHandler<HTMLButtonElement> = (event) => {
      switch (event.key) {
        case Key.ArrowLeft:
          if (layoutDirection === LayoutDirection.LTR) {
            onFocusPrior(buttonKey);
          } else {
            onFocusNext(buttonKey);
          }
          break;

        case Key.ArrowRight:
          if (layoutDirection === LayoutDirection.LTR) {
            onFocusNext(buttonKey);
          } else {
            onFocusPrior(buttonKey);
          }
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
