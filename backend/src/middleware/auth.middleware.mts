import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secretKey } from "../constants/common.mjs";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload['user'][0]; 
        }
    }
}
class Authentication {

// public AdminAuth = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(" ")[1];
//     if (!token) {
//         // return res.status(401).json({ status: false, msg: "Token is missing" });
//         return res.status(401).json({code:401,data:{status:false,message:"Token is missing"}});
//     }
public Auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        // return res.status(401).json({ status: false, msg: "Token is missing" });
        return res.status(401).json({code:401,data:{status:false,message:"Token is missing"}});
    }

    jwt.verify(token,secretKey, (err, decoded) => {
        console.log(err);
        if (err) {
            return res.status(400).json({ status: false, msg: `Invalid token: ${err.message}` });
        }
        req.user = decoded;
        next();
    });
};
}
export default Authentication;
