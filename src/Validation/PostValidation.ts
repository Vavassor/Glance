import { MAX_SEARCH_RESULTS } from "Constants";
import { body, query } from "express-validator";
import { handleValidationError } from "Middleware/ValidationErrorHandling";
import { isObjectId } from "Utilities/Validation";

export const validateCreatePost = [
  body("content").exists().isString(),
  handleValidationError,
];

export const validateGetAccountTimelinePosts = [
  query("limit")
    .optional()
    .isInt({ allow_leading_zeroes: false, max: MAX_SEARCH_RESULTS, min: 0 }),
  query("since_id").optional().custom(isObjectId),
  query("until_id").optional().custom(isObjectId),
  handleValidationError,
];
