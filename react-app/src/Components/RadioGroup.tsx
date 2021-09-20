import React from "react";

interface RadioGroupProps {
  labelId: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  labelId,
}) => {
  return (
    <div aria-labelledby={labelId} role="radiogroup">
      {children}
    </div>
  );
};
