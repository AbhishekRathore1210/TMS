import dotenv from "dotenv";
dotenv.config({ path: "./env" });
import mongoose from "mongoose";
import { DB_NAME } from "../constants/common.mjs";

console.log(process.env.MONGO_DATABASE_URL);
export default async function connectToMongoDB() {
  console.log(process.env.MONGO_DATABASE_URL);
  await mongoose.connect(`${process.env.MONGO_DATABASE_URL}${DB_NAME}`);
  
  console.log("Connect to MongoDB Database!");
}
