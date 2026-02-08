import express from "express";
import { register, login, getMe } from "../controllers/auth.Controller.js";
import { protect } from "../middlewares/auth.Middleware.js";
import upload from "../middlewares/upload.Middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", protect, login);
router.post("/me", protect, getMe);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

export default router;
