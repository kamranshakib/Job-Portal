import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token && token.startsWith("bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({ message: " Not authorized, no token" });
    }
  } catch (error) {
    res.status(401).json({ message: "No token", error: error.message });
  }
};
