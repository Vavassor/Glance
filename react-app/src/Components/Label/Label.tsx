import clsx from "clsx";
import React, { ElementType, PropsWithChildren } from "react";

export interface LabelClassNames {
  label?: string;
  labelDisabled?: string;
  labelError?: string;
  labelRequired?: string;
}

interface BaseLabelProps {
  className?: string;
  classNames?: LabelClassNames;
  Component?: ElementType;
  hasError?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
}

interface RequiresId {
  htmlFor?: string;
  id: string;
}

interface RequiresInputId {
  htmlFor: string;
  id?: string;
}

export type LabelProps = BaseLabelProps & (RequiresId | RequiresInputId);

const defaultClassNames: LabelClassNames = {
  label: "block",
  labelError: "text-red-700",
};

export const Label = ({
  children,
  className,
  classNames = defaultClassNames,
  Component = "label",
  hasError,
  htmlFor,
  id,
  isDisabled,
  isRequired,
}: PropsWithChildren<LabelProps>) => {
  return (
    <Component
      className={clsx(
        classNames.label,
        isDisabled && classNames.labelDisabled,
        hasError && classNames.labelError,
        isRequired && classNames.labelRequired,
        className
      )}
      htmlFor={htmlFor}
      id={id}
    >
      {children}
      {isRequired && <span aria-hidden="true">&thinsp;*</span>}
    </Component>
  );
};
