import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

class ErrorHandler {
  static handleUser(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ZodError) {
      const errorMessage = err.errors.map((error) => error.message).join('and');
      res.status(400).json({ error: errorMessage });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static handleOrgUser(err:Error,req:Request,res:Response,next:NextFunction) {
    if(err instanceof ZodError) {
      const errorMessage = err.errors.map((error) => error.message).join(',');
      res.status(400).json({error:errorMessage});
    }
    else{
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  }
}

export default ErrorHandler;
