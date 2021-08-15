import {
  MAX_CHARS_PASSWORD,
  MAX_CHARS_USERNAME,
  MIN_CHARS_PASSWORD,
  MIN_CHARS_USERNAME,
} from "Constants";
import { body } from "express-validator";
import { handleValidationError } from "Middleware/ValidationErrorHandling";
import { isPassword, isUsername } from "Utilities/Validation";

export const validateCreateAccountRegistration = [
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
