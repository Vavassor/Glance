import { TextField, TextFieldProps } from "Components/TextField";
import React, { useState } from "react";
import { VisibilityButton } from "./VisibilityButton";

interface PasswordFieldProps extends TextFieldProps {}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  inputProps,
  ...rest
}) => {
  const [isShowing, setIsShowing] = useState(false);

  const handleClickVisibilityButton = () => {
    setIsShowing((priorIsShowing) => !priorIsShowing);
  };

  return (
    <TextField
      endInset={
        <VisibilityButton
          className="ms-2"
          isShowing={isShowing}
          onClick={handleClickVisibilityButton}
        />
      }
      inputProps={{
        type: isShowing ? "text" : "password",
        ...inputProps,
      }}
      {...rest}
    />
  );
};
