import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import errorMiddleWare from "./middleware/error.middleware.mjs";
// import sendFormatMiddleWare from "./middleware/sendFormat.middleware.mjs";
import { NotFoundError } from "./exceptions/notFoundError.js";
dotenv.config();
class App {
    app;
    port;
    routes;
    constructor(routes, port) {
        this.port = port || process.env.PORT || 8555;
        this.app = express();
        this.routes = routes;
        this.initializeMiddlewares();
        this.initializeRoutes(this.routes);
        this.initializeErrorHandling();
        this.initializeResponseSendFormat();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("================");
            console.log(`App running on port ${this.port}`);
        });
    }
    initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(cookieParser());
    }
    initializeErrorHandling() {
        this.app.use(errorMiddleWare);
    }
    initializeResponseSendFormat() {
        // this.app.use(sendFormatMiddleWare);
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
        this.app.use((req, res, next) => {
            console.log(req.method);
            throw new NotFoundError(`Route not Found Method:${req.method} and URL : ${req.url}`);
        });
    }
}
export default App;
//# sourceMappingURL=app.mjs.map