import { getAccountTimelinePosts } from "Controllers/PostController";
import express from "express";
import { authorizeToken } from "Middleware/AuthorizeToken";
import { enableCors, handleCorsPreflight } from "Middleware/Cors";
import { asyncHandler } from "Utilities/AsyncHandler";
import { validateGetAccountTimelinePosts } from "Validation/PostValidation";

const router = express.Router();

router
  .route("/")
  .get(
    enableCors,
    validateGetAccountTimelinePosts,
    authorizeToken,
    asyncHandler(getAccountTimelinePosts)
  )
  .options(handleCorsPreflight);

export { router };
