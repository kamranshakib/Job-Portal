import Job from "../models/Job.js";
import User from "../models/User.js";
import Application from "../models/Application.js";
import SavedJob from "../models/SavedJob.js";

// @desk  create a new job (Only Employer)
export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "Employer") {
      res.status(403).json({ message: "Only Employer can post jobs" });
    }
    const job = await Job.create({ ...req.body, company: req.user._id });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
