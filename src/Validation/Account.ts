import {
  MAX_CHARS_PASSWORD,
  MAX_CHARS_USERNAME,
  MIN_CHARS_PASSWORD,
  MIN_CHARS_USERNAME,
} from "Constants";
import { body, param } from "express-validator";
import { handleValidationError } from "Middleware/ValidationErrorHandling";
import { isObjectId, isPassword, isUsername } from "Utilities/Validation";

export const validateCreateAccount = [
  body("email").exists().isEmail(),
  body("password")
    .exists()
    .isLength({ max: MAX_CHARS_PASSWORD, min: MIN_CHARS_PASSWORD })
    .custom(isPassword),
  body("username")
    .exists()
    .isLength({ max: MAX_CHARS_USERNAME, min: MIN_CHARS_USERNAME })
    .custom(isUsername),
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
