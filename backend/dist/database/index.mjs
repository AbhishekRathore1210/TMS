import dotenv from "dotenv";
dotenv.config({ path: "./env" });
import mongoose from "mongoose";
console.log(process.env.MONGO_DATABASE_URL);
export default async function connectToMongoDB() {
    console.log(process.env.MONGO_DATABASE_URL);
    await mongoose.connect("mongodb+srv://abhishek19229785:43qmdZ4QoDPxDpct@tmscluster.oenvvf8.mongodb.net/test?retryWrites=true&w=majority&appName=TMSCLUSTER");
    console.log("Connect to MongoDB Database!");
}
//# sourceMappingURL=index.mjs.map