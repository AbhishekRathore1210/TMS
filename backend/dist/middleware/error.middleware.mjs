import { ZodError } from 'zod';
const errorMiddleWare = (error, req, res, next) => {
    try {
        if (error instanceof ZodError) {
            return res.status(501).send({
                code: 501,
                errors: error.issues
            });
        }
        return res.status(500).send({
            code: 500,
            errors: [{
                    error_code: 500,
                    title: "Something Went Wrong!"
                }]
        });
    }
    catch (error) {
        res.status(501).send({
            code: 500,
            errors: [{
                    error_code: 500,
                    title: "Something Went Wrong!"
                }]
        });
    }
};
export default errorMiddleWare;
//# sourceMappingURL=error.middleware.mjs.map