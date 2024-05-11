import { Request, Response } from 'express';
import { orgUser } from '../models/user.model.mjs';
import { adminUser } from '../models/admin.model.mjs';
// import { checkAdmin , createUser , createAdmin,checkOrg } from '../services/userService.mjs';
import {Organization} from '../models/organization.model.mjs';
import UserService from '../services/user.service.mjs';


class UserController {

    private userService = new UserService();

    public userRegistration = async (req: Request, res: Response) => {
        try{
            
        const { firstName, lastName, org, email } = req.body;
        const orgExist = await Organization.findOne({name:org});
        console.log(orgExist);

        if(!orgExist){
            res.status(400).send({success:false,message:"Organization not Exists!"});
        }else{
            const userExist = await orgUser.findOne({ email: email });
            if(userExist){
                if(userExist.organization_list.includes(org)){
                    res.status(400).send({success:false,message:"User is part of this Organization"});
                }
                else{
                    userExist.organization_list.push(org);
                    await userExist.save();

                    orgExist.user_list.push({
                        userId:userExist._id,
                        name:userExist.firstName +' '+ userExist.lastName,
                        email:userExist.email
                    })
                    await orgExist.save();
                    return res.status(200).send({success:true,message:"User is added to Another Organization"});
                }
            }else{
                // create user 
                const user = await this.userService.createUser(firstName,lastName,org,email);
                orgExist.user_list.push({
                    userId:user._id,
                    name:user.firstName +' '+ user.lastName,
                    email:user.email
                })
                await orgExist.save();
                res.status(200).send({success:true,message:"New User is added to the Organization"});
            }
        }

        }catch(error:any){
            console.log(error.message);
        }
    }
}

export default UserController;

