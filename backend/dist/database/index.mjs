import dotenv from "dotenv";
dotenv.config({ path: "./env" });
import mongoose from "mongoose";
console.log(process.env.MONGO_DATABASE_URL);
export default async function connectToMongoDB() {
    console.log(process.env.MONGO_DATABASE_URL);
    await mongoose.connect(`${process.env.MONGO_DATABASE_URL}`);
    console.log("Connect to MongoDB Database!");
}
//# sourceMappingURL=index.mjs.map