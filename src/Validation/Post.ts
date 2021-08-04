import { query } from "express-validator";
import { handleValidationError } from "Middleware/ValidationErrorHandling";

const MAX_SEARCH_RESULTS = 100;

export const validateGetAccountTimelinePosts = [
  query("limit")
    .optional()
    .isInt({ allow_leading_zeroes: false, max: MAX_SEARCH_RESULTS, min: 0 }),
  query("since_id").optional().isInt(),
  query("until_id").optional().isInt(),
  handleValidationError,
];
