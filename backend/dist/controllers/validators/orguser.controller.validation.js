import { z } from "zod";
const orgUserRegisterSchema = z.object({
    firstName: z.string({ required_error: "First Name is required" })
        .trim()
        .min(3, { message: "Name must be of atleast 3 characters ha yrr" })
        .max(10, { message: "Name cannot exceeds more than 10 characters" }),
    lastName: z.string({ required_error: "Last Name is required" })
        .trim()
        .min(3, { message: "Name must be of atleast 3 characters" })
        .max(10, { message: "Name cannot exceeds more than 10 characters" }),
    email: z.string({ required_error: "Email is required" }).
        trim().
        email({ message: "Invalid Email Address" }),
    org: z.string({ required_error: "Organization Name is required" })
        .trim()
});
// const login
export default orgUserRegisterSchema;
//# sourceMappingURL=orguser.controller.validation.js.map