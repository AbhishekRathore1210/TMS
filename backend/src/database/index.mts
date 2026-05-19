import dotenv from "dotenv";
dotenv.config({ path: "./env" });
import mongoose from "mongoose";

const MONGO_DATABASE_URL = process.env.MONGO_DATABASE_URL;

export default async function connectToMongoDB() {
  await mongoose.connect(MONGO_DATABASE_URL || "");

  console.log("Connect to MongoDB Database!");
}
