import { ValidationError } from "express-validator";
import { TFunction } from "i18next";
import { ErrorAdo, ErrorSingle } from "Types/Ado/ErrorAdo";

export const getErrorAdoFromErrorSingle = (error: ErrorSingle): ErrorAdo => {
  return {
    errors: [error],
  };
};

export const getErrorAdoFromMessage = (message: string): ErrorAdo => {
  return {
    errors: [{ message }],
  };
};

export const getErrorAdoFromValidationErrorArray = (
  errors: ValidationError[],
  t: TFunction
): ErrorAdo => {
  return {
    errors: errors.map((error) => ({
      details: error.msg,
      message: t("validation.invalid_parameter_error", {
        context: error.location,
        parameter: error.param,
      }),
    })),
  };
};
