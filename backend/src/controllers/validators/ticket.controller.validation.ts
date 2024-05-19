import {z, ZodType} from "zod";

const ticketSchema = z.object({
    type:z.string({required_error:"Type is required"})
    .trim(),
    summary:z.string({required_error:"Summary is required"})
    .trim()
    .min(3,{message:"Summary must be of atleast 3 characters"})
    .max(250,{message:"Summary cannot exceeds more than 10 characters"}),
    assignee:z.string({required_error:"Email is required"}).
    trim().
    email({message:"Invalid Email Address"}),
});

export default ticketSchema;