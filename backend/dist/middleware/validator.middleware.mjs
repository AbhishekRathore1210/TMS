// import {userRegisterSchema} from "../controllers/validators/user.controller.validation.js";
class Validation {
    validate(schema) {
        return (req, res, next) => {
            schema.parse(req.body);
            next();
        };
    }
}
export default Validation;
//# sourceMappingURL=validator.middleware.mjs.map