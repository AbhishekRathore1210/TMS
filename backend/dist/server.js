import App from './app.js';
import Routes from './routes/index.mjs';
import connectToMongoDB from "./database/index.js";
const MongoDB_Connection_String = 'mongodb://localhost:27017/project';
try {
    await connectToMongoDB(MongoDB_Connection_String);
}
catch (e) {
    console.log("Error connecting to MongoDB: ", e);
}
async function startServer() {
    try {
        await connectToMongoDB(MongoDB_Connection_String);
        const app = new App([
            new Routes()
        ]);
        app.listen();
        app.test();
    }
    catch (e) {
        console.error("Error starting server: ", e);
    }
}
startServer();
//# sourceMappingURL=server.js.map