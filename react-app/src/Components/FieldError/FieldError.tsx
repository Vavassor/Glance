import React from "react";

export interface FieldErrorProps {
  error?: string;
}

export const FieldError: React.FC<FieldErrorProps> = ({ error }) => {
  if (!error) {
    return null;
  }
  return <p>{error}</p>;
};
