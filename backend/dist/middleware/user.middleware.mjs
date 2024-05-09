const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body);
        next();
    }
    catch (error) {
        console.log(error.message);
    }
};
export default validate;
//# sourceMappingURL=user.middleware.mjs.map