import clsx from "clsx";
import React from "react";

export interface FieldErrorProps {
  className?: string;
  id?: string;
}

export const FieldError: React.FC<FieldErrorProps> = ({
  children,
  className,
  id,
}) => {
  if (!children) {
    return null;
  }

  return (
    <p className={clsx("text-red-700", className)} id={id}>
      {children}
    </p>
  );
};
