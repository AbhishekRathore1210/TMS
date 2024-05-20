import express from 'express';
import nodemailer from 'nodemailer';
import { orgUser } from '../models/user.model.mjs';
import { Organization } from '../models/organization.model.mjs';
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
    allOrganizations = async () => {
        const allOrganization = await this.organizationDao.showAllOrganizations();
        return allOrganization;
    };
    createAdminUser = async (firstName, lastName, email) => {
        const newUser = this.userDao.createAdminUser(firstName, lastName, email);
        return newUser;
    };
    sendOTP = async (email, org) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'abhishek19229785@gmail.com',
                pass: '' // password is required!
            }
        });
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
                if (org) {
                    // console.log("User is Organizations Usr");
                    const updatedUser = await orgUser.updateOne({ email: email }, { $set: { otp: myOtp } });
                    // console.log("Updated User ",updatedUser);
                }
                else {
                    // console.log("User is Admin Usr");
                    const updateUser = await adminUser.updateOne({ email: email }, { $set: { otp: myOtp } });
                    // console.log("Updated User ",updateUser);
                }
            }
        });
        return myOtp;
    };
    throttle = async (func, limit, email, org) => {
        if (this.flag) {
            func(email, org);
            this.flag = false;
            setTimeout(() => {
                this.flag = true;
            }, limit);
        }
        else {
            console.log("Wait for some seconds");
        }
    };
    sendOtpBetter = async (email, org) => {
        if (this.flag) {
            this.throttle(this.sendOTP, 10000, email, org);
        }
        else {
            console.log("kindly wait for some time");
        }
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
            const updateOrg = await Organization.updateOne({ name: org }, { $set: { is_active: true } });
            return true;
        }
        this.organizationDao.createOrg(org);
        return false;
    };
}
export default UserService;
//# sourceMappingURL=user.service.mjs.map