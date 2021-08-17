import { createAccountRegistration } from "Controllers/AccountRegistrationController";
import express from "express";
import { asyncHandler } from "Utilities/AsyncHandler";
import { validateCreateAccountRegistration } from "Validation/AccountRegistrationValidation";

const router = express.Router();

router
  .route("/")
  .post(
    validateCreateAccountRegistration,
    asyncHandler(createAccountRegistration)
  );

export { router };

