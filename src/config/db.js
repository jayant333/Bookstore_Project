import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("MongoDB URL:", process.env.MONGODB_URL);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongoose Connected");
  } catch (error) {
    console.log("Database Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};
