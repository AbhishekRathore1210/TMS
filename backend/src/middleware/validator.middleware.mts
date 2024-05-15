import { Request, Response, NextFunction } from "express";
import { z, ZodError } from 'zod';
import ErrorHandler from "./error.middleware.mjs";

class Validation {
    public validate(schema: z.ZodTypeAny){

        return (req:Request,res:Response,next:NextFunction) =>{
            schema.parse(req.body);
            next();
        } 
    }
}
export default Validation;