import { createPost } from "Controllers/PostController";
import express from "express";
import { authorizeToken } from "Middleware/AuthorizeToken";
import { enableCors, handleCorsPreflight } from "Middleware/Cors";
import { asyncHandler } from "Utilities/AsyncHandler";
import { validateCreatePost } from "Validation/PostValidation";
import { router as accountTimelineRoutes } from "./account_timeline";

const router = express.Router();

router
  .route("/")
  .post(
    enableCors,
    validateCreatePost,
    authorizeToken,
    asyncHandler(createPost)
  )
  .options(handleCorsPreflight);
router.use("/account_timeline", accountTimelineRoutes);

export { router };
