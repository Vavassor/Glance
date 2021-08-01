import express from "express";
import { router as postRoutes } from "./post";

const router = express.Router();

router.use("/post", postRoutes);

export { router };
