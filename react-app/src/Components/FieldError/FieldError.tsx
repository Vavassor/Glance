import clsx from "clsx";
import React from "react";

export interface FieldErrorProps {
  className?: string;
  error?: string;
  id?: string;
}

export const FieldError: React.FC<FieldErrorProps> = ({
  className,
  error,
  id,
}) => {
  if (!error) {
    return null;
  }
  
  return (
    <p className={clsx("text-red-700", className)} id={id}>
      {error}
    </p>
  );
};
