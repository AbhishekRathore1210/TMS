import dotenv from "dotenv";
dotenv.config({ path: "./env" });
import mongoose from "mongoose";
import { LOCAL_DB_NAME } from "../constants/common.mjs";

console.log(process.env.LOCAL_MONGO_DATABASE_URL);
export default async function connectToMongoDB() {
  console.log(process.env.LOCAL_MONGO_DATABASE_URL);
  await mongoose.connect(`${process.env.LOCAL_MONGO_DATABASE_URL}${LOCAL_DB_NAME}`);
  console.log("Connect to MongoDB Database!");
}
