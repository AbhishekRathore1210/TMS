import express, { NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';


import { orgUser } from '../models/user.model.mjs';
import { Organization } from '../models/organization.model.mjs';
import UserDao from '../dao/user.dao.mjs';
import createDAO from '../dao/organization.dao.mjs';
import { adminUser } from "../models/admin.model.mjs";
import OrganizationDao from '../dao/organization.dao.mjs';

const regOrgRoute = express.Router();
class UserService{
    private userDao = new UserDao();
    private organizationDao = new OrganizationDao();
    private flag = true;

public createUser = async(firstName:string,lastName:string,org:string,email:string,dob:Date,doj:Date) =>{

    const newUser = this.userDao.createUser(firstName,lastName,org,email,dob,doj);
    return newUser;
}
public deleteOrg = async(name:string) =>{
    const ifDeleted = this.organizationDao.deleteOrg(name);
    return ifDeleted;
}

public allOrg = async(req:Request,res:Response,next:NextFunction)=>{
    const allOrg = await this.organizationDao.allOrg(); 
    return allOrg;
}

public allOrganizations = async(req:Request,res:Response,next:NextFunction) =>{
    console.log('query',req.query)
    
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    const skip = ((page-1)*limit);

    const allOrganization = await this.organizationDao.showAllOrganizations(skip,limit);
    return allOrganization;
}

public createAdminUser = async(firstName:string,lastName:string,email:string) =>{
    const newUser = this.userDao.createAdminUser(firstName,lastName,email);
    return newUser;
}

public sendOTP = async(email:string,org:string)=>{

    const user = await orgUser.findOne({email:email});
    const user2 = await adminUser.findOne({email:email})

    if(!user && !user2){
       return 0;
    }
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:'abhishek19229785@gmail.com',
            pass:'inft pvav gugm lqyz' //password  
        }
    });
    const myOtp = Math.floor((Math.random()*1000000)+1);

const mailOptions = {
    from:'abhishek19229785@gmail.com',
    to:email,
    subject:'For Verification Mail',
    text:`Your otp is ${myOtp}`
}
transporter.sendMail(mailOptions,async function(error){
    if(error){
        const err = error as Error
        console.log(err);
    }
    else{
        console.log("Mail sent succesfully");
        var dt = (new Date().getTime());

        if(org){
            // console.log("User is Organizations Usr");
            const updatedUser = await orgUser.updateOne({email:email},{$set:{otp:myOtp,otpExpire:new Date(dt+900000)}});
            // console.log("Updated User ",updatedUser);
        }else{
            // console.log("User is Admin Usr");
            const updateUser = await adminUser.updateOne({email:email},{$set:{otp:myOtp,
                otpExpire:new Date(dt+900000)
            }});
            // console.log("Updated User ",updateUser);
        }
    }
});
console.log("OTP",myOtp);
return myOtp;
}



public createAdmin = async(firstName:string,lastName:string,email:string) =>{
    const newUser = await this.userDao.createAdmin(firstName,lastName,email);
    return newUser;
}

public checkAdmin = async(email:string,otp:string)=>{
    const user = await this.userDao.checkAdmin(email,otp);
    return user;
}

public checkOrganization = async(org:string) =>{

    const organization = await this.organizationDao.findOrgByName(org);
    console.log("org",organization);
    if(organization){
        return false;
    }
    const newOrganization = this.organizationDao.createOrg(org);
    return newOrganization;
}
}

export default UserService;