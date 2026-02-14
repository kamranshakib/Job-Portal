import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: { type: String },
    status: {
      type: String,
      enum: ["Applied", "In Review", "Rejected", "Accepted"],
      defatul: "Applied",
    },
  },
  { timestamps: true },
);

const applicatonSaved = mongoose.model("Application", applicationSchema);
export default applicatonSaved;
