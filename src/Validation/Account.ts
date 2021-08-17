import { EMAIL_VERIFICATION_CODE_CHAR_COUNT } from "Constants";
import { body, param } from "express-validator";
import { handleValidationError } from "Middleware/ValidationErrorHandling";
import { isObjectId } from "Utilities/Validation";

export const validateCreateAccount = [
  body("account_registration_id").exists().custom(isObjectId),
  body("email_verification_code")
    .exists()
    .isLength({
      max: EMAIL_VERIFICATION_CODE_CHAR_COUNT,
      min: EMAIL_VERIFICATION_CODE_CHAR_COUNT,
    })
    .isInt(),
  handleValidationError,
];

export const validateDeleteAccount = [
  param("id").exists().custom(isObjectId),
  handleValidationError,
];

export const validateGetAccountById = [
  param("id").custom(isObjectId),
  handleValidationError,
];
