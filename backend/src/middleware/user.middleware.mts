import { NextFunction } from "express";

const validate = (schema:any) => async(req:Request,res:Response,next:NextFunction) =>{
    try {
        await schema.parseAsync(req.body);
        next();

    } catch (error:any) {
        console.log(error.message);
    }
}

export default validate;