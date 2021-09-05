import {
  createPost,
  getAccountTimelinePosts,
} from "Controllers/PostController";
import express from "express";
import { authorizeToken } from "Middleware/AuthorizeToken";
import { enableCors, handleCorsPreflight } from "Middleware/Cors";
import { asyncHandler } from "Utilities/AsyncHandler";
import {
  validateCreatePost,
  validateGetAccountTimelinePosts,
} from "Validation/PostValidation";

const router = express.Router();

router
  .route("/")
  .get(
    enableCors,
    validateGetAccountTimelinePosts,
    authorizeToken,
    asyncHandler(getAccountTimelinePosts)
  )
  .post(
    enableCors,
    validateCreatePost,
    authorizeToken,
    asyncHandler(createPost)
  )
  .options(handleCorsPreflight);

export { router };
