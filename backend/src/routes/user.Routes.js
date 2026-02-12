import express from "express";
import { protect } from "../middlewares/auth.Middleware.js";
import {
  updateProfile,
  deleteResume,
  getPublicProfile,
} from "../controllers/user.Controller.js";
const router = express.Router();

router.put("/profile", protect, updateProfile);
router.delete("/resume", protect, deleteResume);
router.get("/:id", getPublicProfile);

export default router;
