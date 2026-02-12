import fs from "fs";
import { User } from "../models/User.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// update user profile (name, avatat , company datails)
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      avatar,
      resume,
      companyName,
      companyDescription,
      companyLogo,
    } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.avatar = avatar || user.avatar;
    user.resume = resume || user.resume;

    // if employer allowed updating company info;
    if (user.role === "employer") {
      user.companyName = companyName || user.companyName;
      user.companyDescription = companyDescription || user.companyDescription;
      user.companyLogo = companyLogo || user.companyLogo;
    }
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      companyName: user.companyName,
      companyDescription: user.companyDescription,
      companyLogo: user.companyLogo,
      resume: user.resume || "",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete resume file jush jobseeker
export const deleteResume = async (req, res) => {
  try {
    const { resumeUrl } = req.body;

    const fileName = resumeUrl?.split("/")?.pop();
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "jobseeker") {
      return res
        .status(400)
        .json({ message: "Only jobseeker can delete resume" });
    }

    const filePath = path.join(__dirname, "../uploads", fileName);

    // cheak if the file exists and then delete
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); //delete the file
    }
    user.resume = "";
    await user.save();
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user public profile
export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
