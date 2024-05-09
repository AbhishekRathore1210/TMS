import UserService from "../services/user.service.mjs";
import { Request, Response } from 'express';
import { orgUser } from '../models/user.model.mjs';
import { adminUser } from '../models/admin.model.mjs';

class AdminController{
    public registerAdmin = async (req: Request, res: Response) => {
        const { firstName, lastName, email } = req.body;
        const userExist = await adminUser.findOne({ email: email });
        if (userExist) {
            res.status(400).json({ message: "User is already present" });
        }
        else {
            try {
                const newUser = UserService.createAdmin(firstName, lastName, email);

                res.status(200).json(newUser);

            } catch (error: any) {
                res.status(400).json({ error: error.message });
            }
        }
    }

    public sendOTP = async(req:Request,res:Response) =>{
        const {email} = req.body;
        const otpSent = await UserService.sendOTP(email);
        return res.status(200).send({success:"true",message:"OTP sent succesffuly"});
    }

    public loginAdmin = async (req: Request, res: Response) => {
        const { email, otp } = req.body;
        const adminExist = await UserService.checkAdmin(email, otp);
        if (!adminExist) {
            res.status(400).json({ message: 'Cannot Login' });
        }
        else {
            res.status(200).send({ message: "Login success" })
        }
    }


}

export default AdminController;