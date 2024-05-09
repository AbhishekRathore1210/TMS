// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// dotenv.config()
// class App {
//   public app: express.Application
//   public port: string | number
//   private routes: any
//   constructor(routes: any) {
//     this.port = 8555;
//     this.app = express();
//     this.routes = routes;
//     this.initializeMiddlewares()
//   }
//   public listen() {
//     this.app.listen(this.port, () => {
//       console.log("================");
//       console.log(`App running on port ${this.port}`);
//     })
//   }
//   public test() {
//     this.app.get("/", (req: Request, res: any) => {
//       res.status(200).send("Hello World")
//     })
//   }
//   public getServer() {
//     return this.app;
//   }
//   private initializeMiddlewares() {
//     this.app.use(bodyParser.urlencoded({ extended: false }));
//     this.app.use(express.json());
//     this.app.use(express.urlencoded({ extended: true }));
//     this.app.use(cors());
//     this.app.use(cookieParser());
//     this.initializeRoutes(this.routes);
//   }
//   private initializeRoutes(routes: any) {
//     routes.forEach((route: any) => {
//       this.app.use('/', route.router)
//     })
//   }
// }
// export default App
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
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