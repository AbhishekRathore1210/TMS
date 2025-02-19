import { orgUser } from "../models/user.model.mjs";
import { adminUser } from "../models/admin.model.mjs";

import { Organization } from "../models/organization.model.mjs";
import { formatWithOptions } from "util";

class UserDao {

    public createUser = async (firstName: string, lastName: string, org: string, email: string,dob:Date,doj:Date) => {
        const newUser = orgUser.create({
            firstName: firstName,
            lastName: lastName,
            org: org,
            email: email,
            dob:dob,
            doj:doj,
            organization_list: [org]
        })

        return newUser;
    }

    public createAdminUser = async(firstName:string,lastName:string,email:string) =>{
        const user = await adminUser.findOne({email:email});
        if(user){
            return true;
        }
        return false;
    }

    public checkAdmin = async (email: string, otp: string) => {
        const user = await adminUser.findOne({ email: email });

        var dt = (new Date().getTime());
        // console.log(user);
        if (!user) {
            return false;
        }
        else {
            if (user.otp != otp || user.otpExpire && user.otpExpire.getTime() < Date.now()) { return false; }
        }
        return user;
    }

    public createAdmin = async(firstName: string, lastName: string, email: string)=>{
        const newUser = adminUser.create({
            name: firstName + ' ' + lastName,
            email: email
        })
        return newUser;
    }
}

export default UserDao;