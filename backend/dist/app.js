import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
class App {
    app;
    port;
    routes;
    constructor(routes) {
        this.port = 8555;
        this.app = express();
        this.routes = routes;
        this.initializeMiddlewares();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("================");
            console.log(`App running on port ${this.port}`);
        });
    }
    test() {
        this.app.get("/", (req, res) => {
            res.status(200).send("Hello World");
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(cookieParser());
        this.initializeRoutes(this.routes);
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }
}
export default App;
//# sourceMappingURL=app.js.map