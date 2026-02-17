import Job from "../models/Job.js";
import User from "../models/User.js";
import Application from "../models/Application.js";
import SavedJob from "../models/SavedJob.js";

// @desk  create a new job (Only Employer)
export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      res.status(403).json({ message: "Only Employer can post jobs" });
    }
    const job = await Job.create({ ...req.body, company: req.user._id });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getJobs = async (req, res) => {
  const {
    title,
    keyword,
    location,
    type,
    category,
    minSalary,
    maxSalary,
    userId,
  } = req.query;
  /*
            const query = {
              isClosed: false,
              ...(keyword && { title: { $regex: keyword, $options: "i" } }),
              ...(location && { location: { $regex: location, $options: "i" } }),
              ...(category && { category }),
              ...(type && { type }),
  };
   */

  // serch into the database
  let query = { isClosed: false };
  if (keyword) query.title = { $regex: keyword, $options: "i" };
  if (location) query.location = { $regex: location, $options: "i" };
  if (category) query.category = category;
  if (type) query.type = type;

  if (minSalary || maxSalary) {
    query.$and = [];

    if (minSalary) {
      query.$and.push({ salaryMax: { $gte: Number(minSalary) } });
    }
    if (maxSalary) {
      query.$and.push({ salaryMax: { $lte: Number(maxSalary) } });
    }
    if (query.$and.length === 0) {
      delete query.$and;
    }
  }
  try {
    const jobs = await Job.find(query).populate(
      "company",
      "name companyName companyLogo",
    );
    let savedJobIds = [];
    let appliedJobStatusMap = [];

    if (userId) {
      //saved job
      const savedJob = await SavedJob.find({ jobseeker: userId }).select("job");
      savedJobIds = savedJob.map((s) => String(s.job));

      //Application
      const application = await Application.find({ applicant: userId }).select(
        "job status",
      );
      application.forEach((element) => {
        appliedJobStatusMap[String(element.job)] = element.status;
      });
    }

    const jobsWithExtras = jobs.map((job) => {
      const jobIdStr = String(job._id);
      return {
        ...job.toObject(),
        isSaved: savedJobIds.includes(jobIdStr),
        applicationStatus: appliedJobStatusMap[jobIdStr] || null,
      };
    });
    res.json(jobsWithExtras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobEmployer = async (req, res) => {
  try {
    const userId = req.user._id;
    const { role } = req.user;

    if (role !== "employer") {
      return res.status(500).josn({ message: "Access Denied" });
    }

    const jobs = await Job.find({ company: userId })
      .populate("company", "name companyNmae companyLogo ")
      .lean();

    // count application for each job
    const jobsWithApplicationCounts = await Promise.all(
      jobs.map(async (job) => {
        const applicatonCount = await Application.countDocuments({
          job: job._id,
        });
        return {
          ...job,
          applicatonCount,
        };
      }),
    );
    res.json(jobsWithApplicationCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
