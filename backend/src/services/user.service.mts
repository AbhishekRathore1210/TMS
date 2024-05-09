import express from 'express';
const regOrgRoute = express.Router();
import { orgUser } from '../models/user.model.mjs';
import { Request, Response } from 'express';
import userDAO from '../dao/user.dao.mjs';
import createDAO from '../dao/organization.dao.mjs';
import nodemailer from 'nodemailer';
import { adminUser } from "../models/admin.model.mjs";
// import otpGenerator from 'otp-generator';


class UserService{
// static sendOTP(email: any) {
//     throw new Error("Method not implemented.");
// }
public static async createUser(firstName:string,lastName:string,org:string,email:string){

    const newUser = userDAO.createUser(firstName,lastName,org,email);
    return newUser;
}

// public static generateOTP = ()=>{
//     const OTP  = otpGenerator.generate(6,{
//         upperCaseAlphabets:false,
//         specialChars:false
//     })
//     return OTP;
// }

public static async sendOTP(email:string)
{
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:'abhishek19229785@gmail.com',
            pass:'inft pvav gugm lqyz'
        }
    });
    // const myOtp = this.generateOTP();
    const myOtp = Math.random();

const mailOptions = {
    from:'abhishek19229785@gmail.com',
    to:email,
    subject:'For Verification Mail',
    text:`Your otp is ${myOtp}`
}
transporter.sendMail(mailOptions,async function(err:any,info:any){
    if(err){
        console.log(err);
    }
    else{
        console.log("Mail sent succesfully",info.response);
        const updateUser = await adminUser.updateOne({email:email},{$set:{otp:myOtp}});
        console.log()
    }
});

return myOtp;
}
static async createAdmin(firstName:string,lastName:string,email:string){

    const newUser = userDAO.createAdmin(firstName,lastName,email);
    return newUser;
}

static async checkAdmin(email:string,otp:string){
    const user = userDAO.checkAdmin(email,otp);
    return user;
}

static async checkOrg(org:string){
    const organization = await userDAO.findOrgByName(org);
    if(organization){
        return true;
    }
    createDAO.createOrg(org);
    return false;
}
}

export default UserService;