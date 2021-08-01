import express from "express";
import { getAccountTimelinePosts } from "Controllers/Post";
import { enableCors, handleCorsPreflight } from "Middleware/Cors";

const router = express.Router();

router
  .route("/")
  .get(enableCors, getAccountTimelinePosts)
  .options(handleCorsPreflight);

export { router };
