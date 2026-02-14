import jwt from "jsonwebtoken";
import User from "../models/User.js";
 
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "60d" });
};
 
export const register = async (req, res) => {
  try {
    const { email, name, password, avatar, role } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // cheak email is exist
    const cheakUser = await User.findOne({ email });
    if (cheakUser) {
      return res.status(400).json({ message: "email already exist" });
    }
    const user = await User.create({
      email,
      name,
      password,
      role,
      avatar,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      token: generateToken(user._id),
      companyName: user.companyName || "",
      companyLogo: user.companyLogo || "",
      companyDescription: user.companyDescription || "",
      resume: user.resume || "",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "all fields are required" });
    // cheak email is exist or no
    const user = await User.findOne({ email });
    if (!user || !(await user.MathPassword(password)))
      return res.status(401).json({ message: " Invalid Email or Password" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      avatar: user.avatar || "",
      companyName: user.companyName || "",
      companyLogo: user.companyLogo || "",
      companyDescription: user.companyDescription || "",
      resume: user.resume || "",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
