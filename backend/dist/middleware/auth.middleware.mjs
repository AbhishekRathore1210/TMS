import jwt from "jsonwebtoken";
import { secretKey } from "../constants/common.mjs";
class Authentication {
    AdminAuth = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            // return res.status(401).json({ status: false, msg: "Token is missing" });
            return res.status(401).json({ code: 401, data: { status: false, message: "Token is missing" } });
        }
        jwt.verify(token, secretKey, (err, decoded) => {
            console.log(err);
            if (err) {
                return res.send({ code: 200, data: {
                        status: false,
                        message: "Invalid Token"
                    } });
            }
            req.user = decoded;
            if (!req.user.is_admin) {
                return res.send({ code: 401, data: {
                        status: false,
                        message: "UnAuthorized"
                    } });
            }
            next();
        });
    };
    Auth = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            // return res.status(401).json({ status: false, msg: "Token is missing" });
            return res.status(401).json({ code: 401, data: { status: false, message: "Token is missing" } });
        }
        jwt.verify(token, secretKey, (err, decoded) => {
            console.log(err);
            if (err) {
                return res.status(400).json({ status: false, msg: `Invalid token: ${err.message}` });
            }
            req.user = decoded;
            if (req.user.is_admin) {
                return res.send({ code: 401, data: {
                        status: false,
                        message: "UnAuthorized"
                    } });
            }
            next();
        });
    };
}
export default Authentication;
//# sourceMappingURL=auth.middleware.mjs.map