import express from 'express';
const regOrgRoute = express.Router();
import UserDao from '../dao/user.dao.mjs';
import createDAO from '../dao/organization.dao.mjs';
import nodemailer from 'nodemailer';
import { adminUser } from "../models/admin.model.mjs";
// import otpGenerator from 'otp-generator';
class UserService {
    userDao = new UserDao();
    createUser = async (firstName, lastName, org, email) => {
        const newUser = this.userDao.createUser(firstName, lastName, org, email);
        return newUser;
    };
    createAdminUser = async (firstName, lastName, email) => {
        const newUser = this.userDao.createAdminUser(firstName, lastName, email);
        return newUser;
    };
    sendOTP = async (email) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'abhishek19229785@gmail.com',
                pass: 'inft pvav gugm lqyz' // password is reuired for OTP
            }
        });
        // const myOtp = this.generateOTP();
        const myOtp = Math.floor((Math.random() * 1000000) + 1);
        const mailOptions = {
            from: 'abhishek19229785@gmail.com',
            to: email,
            subject: 'For Verification Mail',
            text: `Your otp is ${myOtp}`
        };
        transporter.sendMail(mailOptions, async function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Mail sent succesfully", info.response);
                const updateUser = await adminUser.updateOne({ email: email }, { $set: { otp: myOtp } });
                console.log("Updated User ", updateUser);
            }
        });
        return myOtp;
    };
    createAdmin = async (firstName, lastName, email) => {
        const newUser = await this.userDao.createAdmin(firstName, lastName, email);
        return newUser;
    };
    checkAdmin = async (email, otp) => {
        const user = await this.userDao.checkAdmin(email, otp);
        return user;
    };
    checkOrg = async (org) => {
        const organization = await this.userDao.findOrgByName(org);
        if (organization) {
            return true;
        }
        createDAO.createOrg(org);
        return false;
    };
}
export default UserService;
//# sourceMappingURL=user.service.mjs.map