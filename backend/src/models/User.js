import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },

    password: {
      required: true,
      type: String,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      required: true,
    },
    avatar: String,
    resume: String,

    //for employer
    companyName: String,
    companyLogo: String,
    companyDedcription: String,
  },
  { timestamps: true },
);

// Enctypy password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// compare password
UserSchema.methods.MathPassword = function (condedatePassword) {
  return bcrypt.compare(condedatePassword, this.password);
};

export const User = mongoose.model("User", UserSchema);
