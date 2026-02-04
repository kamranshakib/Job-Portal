import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/27017/job-portal");
    console.log("Database Connected");
  } catch (error) {
    console.error("Error Connecting to Database");
    process.exit(1);
  }
};

export default ConnectDB;
