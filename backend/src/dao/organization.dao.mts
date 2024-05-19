import { orgUser } from "../models/user.model.mjs";
import { adminUser } from "../models/admin.model.mjs";

import {Organization} from "../models/organization.model.mjs";

class OrganizationDao{
    
public showAllOrganizations = async() =>{
        const allOrg = Organization.find({});
    return allOrg;
}

public deleteOrg = async(name:string) =>{
    const ifDeleted =await  Organization.updateOne({name:name},{$set:{is_active:false}});
    // console.log("ifDeleted",ifDeleted);
    if((ifDeleted).modifiedCount){
    return true;
    }
    return false;
}

public createOrg = async(org:string) =>{
    const organization = Organization.create({
        name:org,
    })
    return organization;
}

public findOrgByName = async(org: string)=>{
    const organization = Organization.findOne({ name: org });
    return organization;
}
}

export default OrganizationDao;