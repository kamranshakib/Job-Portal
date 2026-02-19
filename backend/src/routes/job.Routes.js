import express from "express";
import { protect } from "../middlewares/auth.Middleware.js";
import {
  createJob,
  getJobs,
  getJobEmployer,
  getJobById,
  updateJob,
  deleteJob,
  // toggleCloseJob,
} from "../controllers/job.Controller.js";
const router = express.Router();

router.route("/").post(protect, createJob).get(getJobs);
router.route("/get-jobs-employer").get(protect, getJobEmployer);
router
  .route("/:id")
  .get(getJobById)
  .put(protect, updateJob)
  .delete(protect, deleteJob);
// router.put("/:id/toggle-closed", protect, toggleCloseJob);

export default router;
