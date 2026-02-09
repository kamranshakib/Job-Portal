import express from "express";
import "dotenv/config";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "uploads/");

import ConnectDB from "./config/db.js";
import authRoutes from "./routes/auth.Routes.js";
import userRoutes from "./routes/user.Routes.js";

const app = express();

// Middleware to hundle cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
  }),
);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Connection database
ConnectDB();
// Middleware
app.use(express.json());

// Routes
app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);

// Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "upload"), {}));

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
