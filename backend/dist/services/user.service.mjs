import express from 'express';
const regOrgRoute = express.Router();
import userDAO from '../dao/user.dao.mjs';
import createDAO from '../dao/organization.dao.mjs';
import nodemailer from 'nodemailer';
// import otpGenerator from 'otp-generator';
class UserService {
    // static sendOTP(email: any) {
    //     throw new Error("Method not implemented.");
    // }
    static async createUser(firstName, lastName, org, email) {
        const newUser = userDAO.createUser(firstName, lastName, org, email);
        return newUser;
    }
    // public static generateOTP = ()=>{
    //     const OTP  = otpGenerator.generate(6,{
    //         upperCaseAlphabets:false,
    //         specialChars:false
    //     })
    //     return OTP;
    // }
    static async sendOTP(email) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'abhishek19229785@gmail.com',
                pass: 'inft pvav gugm lqyz'
            }
        });
        // const myOtp = this.generateOTP();
        const myOtp = Math.random();
        const mailOptions = {
            from: 'abhishek19229785@gmail.com',
            to: email,
            subject: 'For Verification Mail',
            text: `Your otp is ${myOtp}`
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Mail sent succesfully", info.response);
            }
        });
        return myOtp;
    }
    static async createAdmin(firstName, lastName, email) {
        const newUser = userDAO.createAdmin(firstName, lastName, email);
        return newUser;
    }
    static async checkAdmin(email, otp) {
        const user = userDAO.checkAdmin(email, otp);
        return user;
    }
    static async checkOrg(org) {
        const organization = await userDAO.findOrgByName(org);
        if (organization) {
            return true;
        }
        createDAO.createOrg(org);
        return false;
    }
}
export default UserService;
//# sourceMappingURL=user.service.mjs.map