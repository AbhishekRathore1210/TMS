import { orgUser } from "../models/user.model.mjs";
import { adminUser } from "../models/admin.model.mjs";

import {Organization} from "../models/organization.model.mjs";
import { NextFunction } from "express";

class OrganizationDao{
    
public showAllOrganizations = async(skip:number,limit:number) =>{

        console.log('skiip',skip);
        console.log('limit',limit);
                
        const allOrg = await Organization.find({is_active:true}).skip(skip).limit(limit);
        const totalOrg = await Organization.countDocuments({is_active:true});
        const totalPage = Math.ceil(totalOrg/limit);

        // console.log('limit',limit);
        // console.log('totalOrg',totalOrg);
        // console.log(totalPage,'totalPage');
        // console.log('skip',skip);
        
        return {allOrg,totalOrg,totalPage};
}
public allOrg = async()=>{
    try{
    const orgs = await Organization.find({is_active:true}).exec(); // Fetch all organizations
    const orgNames = orgs.map(org => ({ name: org.name })); // Extract the name property from each document
    return orgNames;
    }catch(error){
        const err = error as Error;
        throw new Error('Failed to fetch organizations');
    }
}

public deleteOrg = async(name:string) =>{
    const ifDeleted =await  Organization.updateOne({ $and: [
        { name: name },
        { is_active: true }
      ]},{$set:{is_active:false}});
    console.log(ifDeleted,"deleted");
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
    const organization = Organization.findOne({
        $and: [
            { name: org },
            { is_active: true }
          ]
    });
    return organization;
}
}

export default OrganizationDao;