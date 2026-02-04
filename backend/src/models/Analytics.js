import mongoose from "mongoose";
const analyticsSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalJobPosted: { type: Number, default: 0 },
    totalApplicationReceived: { type: Number, default: 0 },
    totalHired: { type: Number, default: 0 },
  },
  { timestamps: true },
);
export const analytics = mongoose.model("Analytics", analyticsSchema);
