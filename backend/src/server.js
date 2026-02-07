import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import ConnectDB from "./config/db.js";
import authRoutes from "./routes/auth.Routes.js";

const app = express();

// Middleware to hundle cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
  }),
);

// Connection database
ConnectDB()
// Middleware
app.use(express.json());

// Routes
app.use("/api/auth/", authRoutes);

// Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "upload"), {}));

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
