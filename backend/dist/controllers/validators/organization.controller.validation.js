import { z } from "zod";
const orgSchema = z.object({
    name: z.string({ required_error: "Organization Name is required" })
        .trim()
        .max(20, { message: "Organization Name cannot exceeds more than 20 characters" }),
});
export default orgSchema;
//# sourceMappingURL=organization.controller.validation.js.map