import UserService from "../services/user.service.mjs";
import { NextFunction, Request, Response } from 'express';
import { orgUser } from '../models/user.model.mjs';
import { adminUser } from '../models/admin.model.mjs';
import { Organization } from "../models/organization.model.mjs";
import jwt from 'jsonwebtoken';

class AdminController{

    private userService = new UserService();
    private secret = "Abhishek@123$";

    public registerAdmin = async (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, email } = req.body;

        const userExist = await this.userService.createAdminUser(firstName,lastName,email);
        if (userExist) {
            return res.status(400).json({ success:false,message: "User is Already Present Kindly Login!!" });
        }
        else {
            try {
                const newUser = this.userService.createAdmin(firstName, lastName, email);
                return res.status(200).json(newUser);

            } catch (error: any) {
                return res.status(400).json({ error: error.message });
            }
        }
    }
    public sendOTP = async(req:Request,res:Response) =>{
        const {email,org} = req.body;
        // console.log(req.body ,"req.body");
        const otpSent = await this.userService.sendOtpBetter(email,org);
        return res.status(200).send({success:true,message:"OTP sent succesffuly"});
    }

    public showOrganization = async(req:Request,res:Response) =>{
        const allOrganizations = await this.userService.allOrganizations();
        return res.status(200).json(allOrganizations);
    }

    public loginAdmin = async (req: Request, res: Response) => {
        const { email, otp } = req.body;
        const adminExist = await this.userService.checkAdmin(email, otp);
        console.log(adminExist);
        if (!adminExist) {
            return res.status(401).json({ success:false,message: 'Cannot Login' });
        }
        else {
            const token = jwt.sign({adminExist},this.secret);
            console.log(token);
           return res.status(200).json({accessToken:token,success:true, message: "Login success" });
        }
      } 
}
export default AdminController;