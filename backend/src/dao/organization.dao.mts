import { orgUser } from "../models/user.model.mjs";
import { adminUser } from "../models/admin.model.mjs";

import {Organization} from "../models/organization.model.mjs";

async function createOrg(org:string){
    const organization = Organization.create({
        name:org,
    })
    return organization;
}

export default {createOrg}