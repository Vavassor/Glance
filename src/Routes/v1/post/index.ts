import express from "express";
import { router as accountTimelineRoutes } from "./account_timeline";

const router = express.Router();

router.use("/account_timeline", accountTimelineRoutes);

export { router };
