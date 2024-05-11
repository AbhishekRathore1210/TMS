import { ZodError } from 'zod';
class Validation {
    validate = (schema) => async (req, res, next) => {
        try {
            await schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const checkError = error.errors.map(err => err.message);
                res.status(400).json({ success: false, errors: checkError });
            }
            else {
                res.status(500).json({ success: false, message: "Internal Server Error" });
            }
        }
    };
}
export default Validation;
//# sourceMappingURL=user.middleware.mjs.map