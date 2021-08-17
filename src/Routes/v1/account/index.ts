import {
  createAccount,
  deleteAccount,
  getAccountById,
  identifyAccount,
} from "Controllers/Account";
import express from "express";
import {
  enableCors,
  forDevelopmentEnvironment,
  handleCorsPreflight,
} from "Middleware/Cors";
import { asyncHandler } from "Utilities/AsyncHandler";
import {
  validateCreateAccount,
  validateDeleteAccount,
  validateGetAccountById,
  validateIdentifyAccount,
} from "Validation/Account";

const router = express.Router();

router.route("/").post(validateCreateAccount, asyncHandler(createAccount));
router.route("/:id").delete(validateDeleteAccount, asyncHandler(deleteAccount));
router.route("/:id").get(validateGetAccountById, asyncHandler(getAccountById));
router
  .route("/identify")
  .post(
    validateIdentifyAccount,
    forDevelopmentEnvironment(enableCors),
    asyncHandler(identifyAccount)
  )
  .options(handleCorsPreflight);

export { router };
