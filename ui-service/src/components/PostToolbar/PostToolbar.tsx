import React, { useEffect, useRef, useState } from "react";
import { Button } from "./Button";

export interface ToolbarProps {
  ariaLabel: string;
}

enum ButtonKey {
  Reply = "reply",
  Save = "save",
  Share = "share",
}

interface Control {
  buttonKey: ButtonKey;
  label: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({ ariaLabel }) => {
  const [controls, _] = useState<Control[]>([
    { buttonKey: ButtonKey.Reply, label: "Reply" },
    { buttonKey: ButtonKey.Share, label: "Share" },
    { buttonKey: ButtonKey.Save, label: "Save" },
  ]);
  const controlsByKey = useRef<Map<string, HTMLElement>>(new Map());
  const [focusedKey, setFocusedKey] = useState<string>(ButtonKey.Reply);

  const focusControl = (control: Control) => {
    setFocusedKey(control.buttonKey);
    const controlElement = controlsByKey.current.get(control.buttonKey);
    controlElement?.focus();
  };

  const handleFocusEnd = () => {
    focusControl(controls[controls.length - 1]);
  };

  const handleFocusNext = (buttonKey: string) => {
    const controlIndex = controls.findIndex(
      (control) => control.buttonKey === buttonKey
    );
    if (controlIndex === -1) {
      return;
    }
    const nextIndex = Math.min(controlIndex + 1, controls.length - 1);
    focusControl(controls[nextIndex]);
  };

  const handleFocusPrior = (buttonKey: string) => {
    const controlIndex = controls.findIndex(
      (control) => control.buttonKey === buttonKey
    );
    if (controlIndex === -1) {
      return;
    }
    const priorIndex = Math.max(controlIndex - 1, 0);
    focusControl(controls[priorIndex]);
  };

  const handleFocusStart = () => {
    focusControl(controls[0]);
  };

  useEffect(() => {
    const currentControlsByKey = controlsByKey.current;
    return () => {
      currentControlsByKey.clear();
    };
  }, [controls]);

  return (
    <div
      aria-label={ariaLabel}
      className="flex gap-x-1 focus-within:ring-2 focus-within:ring-focus px-3 py-1"
      role="toolbar"
    >
      {controls.map(({ buttonKey, label }) => {
        const handleClick = () => {};

        const handleRef = (instance: HTMLElement | null) => {
          if (instance) {
            controlsByKey.current.set(buttonKey, instance);
          }
        };

        return (
          <Button
            buttonKey={buttonKey}
            label={label}
            onClick={handleClick}
            onFocusEnd={handleFocusEnd}
            onFocusNext={handleFocusNext}
            onFocusPrior={handleFocusPrior}
            onFocusStart={handleFocusStart}
            ref={handleRef}
            tabIndex={buttonKey === focusedKey ? 0 : -1}
          />
        );
      })}
    </div>
  );
};
