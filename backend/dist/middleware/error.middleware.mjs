import { ZodError } from 'zod';
import { NotFoundError } from '../exceptions/notFoundError.js';
const errorMiddleWare = (error, req, res, next) => {
    console.log(error);
    try {
        if (error instanceof ZodError) {
            return res.status(501).send({
                code: 501,
                errors: error.issues
            });
        }
        else if (error instanceof NotFoundError) {
            return res.status(404).send({
                code: 404,
                errors: [{
                        error_code: 404,
                        title: `${error.message}`
                    }]
            });
        }
        else {
            return res.status(500).send({
                code: 500,
                errors: [{
                        error_code: 500,
                        title: "Something Went Wrong!"
                    }]
            });
        }
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