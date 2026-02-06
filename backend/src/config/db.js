import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");
  } catch (error) {
    console.error("Error Connecting to Database");
    process.exit(1);
  }
};

export default ConnectDB;
