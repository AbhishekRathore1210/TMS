import { Request, Response, NextFunction } from "express";
import { z, ZodError } from 'zod';
import ErrorHandler from "./error.middleware.mjs";
import userRegisterSchema from "../controllers/validators/user.controller.validation.js";

class Validation {

    public validateUser = (userRegisterSchema: z.ZodTypeAny) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            await userRegisterSchema.parse(req.body)
        next();
        } catch (error:any) {
            ErrorHandler.handleUser(error,req,res,next);
        }
        
    }

    public validateOrgUser = (orgUserRegisterSchema:z.ZodTypeAny)=> async(req:Request,res:Response,next:NextFunction) => {
       try {
        await orgUserRegisterSchema.parse(req.body)
        next();
       } catch (error:any) {
        ErrorHandler.handleOrgUser(error,req,res,next);
       }
    }

}

export default Validation;