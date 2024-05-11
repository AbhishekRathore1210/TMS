import ErrorHandler from "./error.middleware.mjs";
class Validation {
    validateUser = (userRegisterSchema) => async (req, res, next) => {
        try {
            await userRegisterSchema.parse(req.body);
            next();
        }
        catch (error) {
            ErrorHandler.handleUser(error, req, res, next);
        }
    };
    validateOrgUser = (orgUserRegisterSchema) => async (req, res, next) => {
        try {
            await orgUserRegisterSchema.parse(req.body);
            next();
        }
        catch (error) {
            ErrorHandler.handleOrgUser(error, req, res, next);
        }
    };
}
export default Validation;
//# sourceMappingURL=validator.middleware.mjs.map