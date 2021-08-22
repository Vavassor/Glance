import { createAccountRegistration } from "Controllers/AccountRegistrationController";
import express from "express";
import {
  enableCors,
  forDevelopmentEnvironment,
  handleCorsPreflight,
} from "Middleware/Cors";
import { asyncHandler } from "Utilities/AsyncHandler";
import { validateCreateAccountRegistration } from "Validation/AccountRegistrationValidation";

const router = express.Router();

router
  .route("/")
  .post(
    validateCreateAccountRegistration,
    forDevelopmentEnvironment(enableCors),
    asyncHandler(createAccountRegistration)
  )
  .options(handleCorsPreflight);

export { router };
