import { Request, Response } from 'express';
import { orgUser } from '../models/user.model.mjs';
import { adminUser } from '../models/admin.model.mjs';
// import { checkAdmin , createUser , createAdmin,checkOrg } from '../services/userService.mjs';
import UserService from '../services/user.service.mjs';

class Organization{

    private userService = new UserService();
    public createOrg = async (req: Request, res: Response) => {
        const { org } = req.body;
        const orgExist = await this.userService.checkOrg(org);
        if (orgExist) {
            res.status(200).send({
                success: false,
                message: 'Organization already Created with same previous users!'
            })
        }
        else {
            res.status(200).send({ success:true, message: 'Organization Created' });
        }
    }

    public deleteOrg = async(req:Request,res:Response) =>{
        
        const {name} = req.body;
        const ifDeleted = await this.userService.deleteOrg(name);
        if(ifDeleted){
        return res.status(200).send({message:"Organization deleted!! hehe"});
        }
        return res.status(400).send({message:"Not Deleted!"});
    }

}

export default Organization;