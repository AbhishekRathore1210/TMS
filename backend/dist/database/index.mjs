import mongoose from "mongoose";
const connectionString = 'mongodb://localhost:27017/project';
export default async function connectToMongoDB() {
    await mongoose.connect(connectionString);
    console.log("Connect to MongoDB Database!");
}
//# sourceMappingURL=index.mjs.map