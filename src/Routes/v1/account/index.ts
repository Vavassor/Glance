import {
  createAccount,
  deleteAccount,
  getAccountById,
} from "Controllers/Account";
import express from "express";
import { asyncHandler } from "Utilities/AsyncHandler";
import {
  validateCreateAccount,
  validateDeleteAccount,
  validateGetAccountById,
} from "Validation/Account";

const router = express.Router();

router.route("/").post(validateCreateAccount, asyncHandler(createAccount));
router.route("/:id").delete(validateDeleteAccount, asyncHandler(deleteAccount));
router.route("/:id").get(validateGetAccountById, asyncHandler(getAccountById));

export { router };
