
import express, { Request, Response,NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import errorMiddleWare from "./middleware/error.middleware.mjs";
import { NotFoundError } from "./exceptions/notFoundError.js";

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
    this.initializeResponseSendFormat();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("================");
      console.log(`App running on port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(cookieParser());
  }

  private initializeErrorHandling(){
    this.app.use(errorMiddleWare);   
  }

  private initializeResponseSendFormat(){
      // this.app.use(sendFormatMiddleWare);
  }

  private initializeRoutes(routes: any) {
    routes.forEach((route: any) => {
      this.app.use('/', route.router);
    });

    this.app.use((req:Request,res:Response,next:NextFunction) =>{
      console.log(req.method);
      throw new NotFoundError(`Route not Found Method:${req.method} and URL : ${req.url}`);
    })
  }

}

export default App;
