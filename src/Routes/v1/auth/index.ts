import { grantToken } from "Controllers/AuthController";
import express from "express";
import { authenticateClient } from "Middleware/AuthenticateClient";
import {
  enableCors,
  forNonPasswordGrants,
  handleCorsPreflight,
} from "Middleware/Cors";
import { asyncHandler } from "Utilities/AsyncHandler";
import { validateGrantToken } from "Validation/AuthValidation";

const router = express.Router();

router
  .route("/token")
  .options(forNonPasswordGrants(handleCorsPreflight))
  .post(
    validateGrantToken,
    forNonPasswordGrants(enableCors),
    authenticateClient,
    asyncHandler(grantToken)
  );

export { router };
