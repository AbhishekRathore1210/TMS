
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import errorMiddleWare from "./middleware/error.middleware.mjs";


dotenv.config();

class App {
  public app: express.Application;
  public port: string | number;
  private routes: any;

  constructor(routes: any, port?: string | number) {
    this.port = port || process.env.PORT || 8555;
    this.app = express();
    this.routes = routes;
    this.initializeMiddlewares();
    this.initializeRoutes(this.routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("================");
      console.log(`App running on port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(cookieParser());
  }

  private initializeErrorHandling(){
    this.app.use(errorMiddleWare);   
  }

  private initializeRoutes(routes: any) {
    routes.forEach((route: any) => {
      this.app.use('/', route.router);
    });
  }
}

export default App;
