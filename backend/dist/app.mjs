import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import errorMiddleware from "./middleware/error.middleware.mjs";
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
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("================");
            console.log(`App running on port ${this.port}`);
        });
    }
    initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(cookieParser());
    }
    initializeErrorHandling() {
        this.app.use(errorMiddleware.handleUser);
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
        // Example error handling middleware
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });
    }
}
export default App;
//# sourceMappingURL=app.mjs.map