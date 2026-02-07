import express from "express";
import { register, login, getMe } from "../controllers/auth.Controller.js";
import { protect } from "../middlewares/auth.Middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", protect, login);
router.post("/me", protect, getMe);

export default router;
