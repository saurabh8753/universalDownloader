import express from "express";
import { downloadStory } from "../controllers/instagramStory.js";

const router = express.Router();

router.get("/story", downloadStory);

export default router;
