import { orgUser } from "../models/user.model.mjs";
import { adminUser } from "../models/admin.model.mjs";

import {Organization} from "../models/organization.model.mjs";
import { formatWithOptions } from "util";

async function createUser(firstName:string,lastName:string,org:string,email:string) {
    const newUser = orgUser.create({
        firstName:firstName,
        lastName:lastName,
        org:org,
        email:email,
        organization_list:[org]
    })
    
    return newUser;
}

async function checkAdmin(email:string,otp:string){
    const user = await adminUser.findOne({email:email});
    console.log(user);
    if(!user){
        return false;
    }
    else{
        if(user.otp != otp){return false;}
    }
    return user;
}

async function findOrgByName(org:string){
    const organization = Organization.findOne({name:org});
    return organization;
}

async function createAdmin(firstName:string,lastName:string,email:string){
    const newUser = adminUser.create({
        name:firstName+' '+lastName,
        email:email
    })
    return newUser;
}

export default {
    createUser,
    createAdmin,
    checkAdmin,
    findOrgByName
};