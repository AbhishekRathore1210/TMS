import {z, ZodType} from "zod";

const orgSchema = z.object({
    Name:z.string({required_error:"Organization Name is required"})
    .trim()
    .min(3,{message:"Organization Name must be of atleast 3 characters"})
    .max(20,{message:"Organization Name cannot exceeds more than 20 characters"}),
});

export default orgSchema;