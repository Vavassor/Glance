import express from "express";
import { getAccountTimelinePosts } from "@Controllers/Post";

const router = express.Router();

router.route("/").get(getAccountTimelinePosts);

export { router };
