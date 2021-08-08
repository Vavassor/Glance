import { body } from "express-validator";
import { handleValidationError } from "Middleware/ValidationErrorHandling";
import { isUri } from "Utilities/Validation/Uri";

export const validateCreateApp = [
  body("name").exists(),
  body("redirect_uri").exists().custom(isUri),
  body("website").exists().isURL(),
  handleValidationError,
];
