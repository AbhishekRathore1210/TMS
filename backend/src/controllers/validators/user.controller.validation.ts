import {z, ZodType} from "zod";

export const userRegisterSchema = z.object({
    firstName:z.string({required_error:"First Name is required"})
    .trim()
    .max(20,{message:"Name cannot exceeds more than 20 characters"}),
    lastName:z.string({required_error:"Last Name is required"})
    .trim()
    .max(20,{message:"Name cannot exceeds more than 20 characters"}),
    email:z.string({required_error:"Email is required"}).
    trim().
    email({message:"Invalid Email Address"})
});

export const userLoginSchema = z.object({
    email:z.string({required_error:"Email is required!"})
    .trim()
    .min(5,{message:"Please write valid Email"})
    .max(40,{message:"Invalid Eamil"}),
})
