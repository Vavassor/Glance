import { createApp } from "Controllers/AppController";
import express from "express";
import { asyncHandler } from "Utilities/AsyncHandler";
import { validateCreateApp } from "Validation/AppValidation";

const router = express.Router();

router.route("/").post(validateCreateApp, asyncHandler(createApp));

export { router };
