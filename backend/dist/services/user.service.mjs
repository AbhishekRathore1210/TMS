import express from 'express';
import nodemailer from 'nodemailer';
import { orgUser } from '../models/user.model.mjs';
import UserDao from '../dao/user.dao.mjs';
import { adminUser } from "../models/admin.model.mjs";
import OrganizationDao from '../dao/organization.dao.mjs';
const regOrgRoute = express.Router();
class UserService {
    userDao = new UserDao();
    organizationDao = new OrganizationDao();
    flag = true;
    createUser = async (firstName, lastName, org, email, dob, doj) => {
        const newUser = this.userDao.createUser(firstName, lastName, org, email, dob, doj);
        return newUser;
    };
    deleteOrg = async (name) => {
        const ifDeleted = this.organizationDao.deleteOrg(name);
        return ifDeleted;
    };
    allOrganizations = async (req, res, next) => {
        console.log('query', req.query);
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        const skip = ((page - 1) * limit);
        const allOrganization = await this.organizationDao.showAllOrganizations(skip, limit);
        return allOrganization;
    };
    createAdminUser = async (firstName, lastName, email) => {
        const newUser = this.userDao.createAdminUser(firstName, lastName, email);
        return newUser;
    };
    sendOTP = async (email, org) => {
        const user = await orgUser.findOne({ email: email });
        const user2 = await adminUser.findOne({ email: email });
        if (!user && !user2) {
            return 0;
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'abhishek19229785@gmail.com',
                pass: 'inft pvav gugm lqyz' // password is required!
            }
        });
        const myOtp = Math.floor((Math.random() * 1000000) + 1);
        const mailOptions = {
            from: 'abhishek19229785@gmail.com',
            to: email,
            subject: 'For Verification Mail',
            text: `Your otp is ${myOtp}`
        };
        transporter.sendMail(mailOptions, async function (error) {
            if (error) {
                const err = error;
                console.log(err);
            }
            else {
                console.log("Mail sent succesfully");
                var dt = (new Date().getTime());
                if (org) {
                    // console.log("User is Organizations Usr");
                    const updatedUser = await orgUser.updateOne({ email: email }, { $set: { otp: myOtp, otpExpire: new Date(dt + 900000) } });
                    // console.log("Updated User ",updatedUser);
                }
                else {
                    // console.log("User is Admin Usr");
                    const updateUser = await adminUser.updateOne({ email: email }, { $set: { otp: myOtp,
                            otpExpire: new Date(dt + 900000)
                        } });
                    // console.log("Updated User ",updateUser);
                }
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
    checkOrganization = async (org) => {
        const organization = await this.organizationDao.findOrgByName(org);
        if (organization) {
            return false;
        }
        const newOrganization = this.organizationDao.createOrg(org);
        return newOrganization;
    };
}
export default UserService;
//# sourceMappingURL=user.service.mjs.map