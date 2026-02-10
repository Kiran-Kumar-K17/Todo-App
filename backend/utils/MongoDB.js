import mongoose from "mongoose";

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("Error: MONGO_URI is not defined in your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("🚀 MongoDB Connected Successfully..");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
}

export default connectDB;
