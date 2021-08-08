import { RequestHandler } from "express";
import { ValidationError, validationResult } from "express-validator";
import { getEnglishT } from "Utilities/Internationalization";
import {
  getErrorAdoFromValidationErrorArray,
  getOAuthErrorAdoFromValidationErrorArray,
} from "Utilities/Mapping/Ado";

const flattenValidationErrors = (errors: ValidationError[]) => {
  let flattenedErrors: ValidationError[] = [];
  for (const error of errors) {
    if (error.param === "_error") {
      const nestedErrors = error.nestedErrors as ValidationError[];
      flattenedErrors = flattenedErrors.concat(nestedErrors);
    } else {
      flattenedErrors.push(error);
    }
  }
  return flattenedErrors;
};

export const handleOAuthValidationError: RequestHandler = (
  request,
  response,
  next
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response
      .status(400)
      .json(
        getOAuthErrorAdoFromValidationErrorArray(
          flattenValidationErrors(errors.array()),
          getEnglishT(),
          request.t
        )
      );
    return;
  }
  next();
};

export const handleValidationError: RequestHandler = (
  request,
  response,
  next
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response
      .status(400)
      .json(
        getErrorAdoFromValidationErrorArray(
          flattenValidationErrors(errors.array()),
          request.t
        )
      );
    return;
  }
  next();
};
