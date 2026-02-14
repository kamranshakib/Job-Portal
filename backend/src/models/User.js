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
    companyDescription: String,
  },
  { timestamps: true },
);

// Enctypy password before save
UserSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw new Error("Password hashing failed");
  }
});

// compare password
UserSchema.methods.MathPassword = function (condedatePassword) {
  return bcrypt.compare(condedatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;
