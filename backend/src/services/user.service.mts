import express from 'express';
const regOrgRoute = express.Router();
import { orgUser } from '../models/user.model.mjs';
import { Organization } from '../models/organization.model.mjs';
import { Request, Response } from 'express';
import UserDao from '../dao/user.dao.mjs';
import createDAO from '../dao/organization.dao.mjs';
import nodemailer from 'nodemailer';
import { adminUser } from "../models/admin.model.mjs";

import OrganizationDao from '../dao/organization.dao.mjs';
import jwt from 'jsonwebtoken';

class UserService{
    private userDao = new UserDao();
    private organizationDao = new OrganizationDao();
    private flag = true;

public createUser = async(firstName:string,lastName:string,org:string,email:string) =>{

    const newUser = this.userDao.createUser(firstName,lastName,org,email);
    return newUser;
}
public deleteOrg = async(name:string) =>{
    const ifDeleted = this.organizationDao.deleteOrg(name);
    return ifDeleted;
}

public allOrganizations = async() =>{
    const allOrganization = await this.organizationDao.showAllOrganizations();
    return allOrganization;
}

public createAdminUser = async(firstName:string,lastName:string,email:string) =>{

    const newUser = this.userDao.createAdminUser(firstName,lastName,email);
    return newUser;
}



public sendOTP = async(email:string,org:string)=>{
    // console.log("sentOTP called");
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:'abhishek19229785@gmail.com',
            pass:''
            // password is reuired for OTP
        }
    });
    const myOtp = Math.floor((Math.random()*1000000)+1);

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
        if(org){
            // console.log("User is Organizations Usr");
            const updatedUser = await orgUser.updateOne({email:email},{$set:{otp:myOtp}});
            // console.log("Updated User ",updatedUser);
        }else{
            // console.log("User is Admin Usr");
            const updateUser = await adminUser.updateOne({email:email},{$set:{otp:myOtp}});
            // console.log("Updated User ",updateUser);
        }
    }
});

return myOtp;
}


public throttle = async(func:any,limit:number,email:string,org:string)=>{
        if(this.flag){
            func(email,org);
            this.flag= false;
            setTimeout(()=>{
                this.flag = true;
            },limit)
        }
        else{
            console.log("Wait for some seconds");
        }
}

public sendOtpBetter= async(email:string,org:string) =>{ 
    if(this.flag){
    this.throttle(this.sendOTP,10000,email,org);
    }
    else{
        console.log("kindly wait for some time");
    }
}

public createAdmin = async(firstName:string,lastName:string,email:string) =>{
    const newUser = await this.userDao.createAdmin(firstName,lastName,email);
    return newUser;
}

public checkAdmin = async(email:string,otp:string)=>{
    const user = await this.userDao.checkAdmin(email,otp);
    return user;
}

public checkOrg = async(org:string) =>{

    const organization = await this.organizationDao.findOrgByName(org);
    // console.log("org",organization);
    if(organization){
        const updateOrg = await Organization.updateOne({name:org},{$set:{is_active:true}});
        return true;
    }
    this.organizationDao.createOrg(org);
    return false;
}
}

export default UserService;