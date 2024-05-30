import { NextFunction, Request, Response } from "express";
import OrganizationDao from "../dao/organization.dao.mjs";
import UserService from "../services/user.service.mjs";

class Organization {
  private organizationDao = new OrganizationDao();

  private userService = new UserService();
  public createOrg = async (req: Request, res: Response) => {
    const { org } = req.body;
    const newOrg = await this.userService.checkOrganization(org);
    if (newOrg) {
      res.status(200).send({ success: true, message: " New Organization Created" });
    } else {
      res.status(400).send({success:false,message:"Organization already Exists!"});
    }
  };
  public allOrg = async(req:Request,res:Response,next:NextFunction) =>{
    const allOrg = await this.userService.allOrg(req,res,next)
    if(allOrg){
      return res.send({code:200,data:{success:true,allOrg}});
    }
    return res.send({code:400,data:{success:false,message:"Failed to fetch organizations"}});
  }

  public deleteOrg = async (req: Request, res: Response) => {
    const { name } = req.body;
    const ifDeleted = await this.userService.deleteOrg(name);
    if (ifDeleted) {
      return res.status(200).send({ message: "Organization deleted!!" });
    }
    return res.status(400).send({ message: "Not Deleted!" });
  };

  public showUserInOrg = async(req:Request,res:Response)=>{
    // console.log('param',req.params.name);
    const name = req.params.name;
    const newOrg  = await this.organizationDao.findOrgByName(name);
    if(newOrg){
      return res.send({code:200,data:{success:true,userList:newOrg.user_list}});
    }
    return res.send({code:400,data:{success:false,message:"Not Found",userList:[]}});
  }
}

export default Organization;
