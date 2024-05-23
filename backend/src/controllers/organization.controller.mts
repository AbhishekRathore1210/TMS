import { Request, Response } from "express";

import UserService from "../services/user.service.mjs";

class Organization {
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

  public deleteOrg = async (req: Request, res: Response) => {
    const { name } = req.body;
    const ifDeleted = await this.userService.deleteOrg(name);
    if (ifDeleted) {
      return res.status(200).send({ message: "Organization deleted!!" });
    }
    return res.status(400).send({ message: "Not Deleted!" });
  };
}

export default Organization;
