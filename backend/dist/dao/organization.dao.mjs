import { Organization } from "../models/organization.model.mjs";
class OrganizationDao {
    showAllOrganizations = async (skip, limit) => {
        console.log('skiip', skip);
        console.log('limit', limit);
        const allOrg = await Organization.find({ is_active: true }).skip(skip).limit(limit);
        const totalOrg = await Organization.countDocuments({ is_active: true });
        const totalPage = Math.ceil(totalOrg / limit);
        // console.log('limit',limit);
        // console.log('totalOrg',totalOrg);
        // console.log(totalPage,'totalPage');
        // console.log('skip',skip);
        return { allOrg, totalOrg, totalPage };
    };
    allOrg = async () => {
        try {
            const orgs = await Organization.find({ is_active: true }).exec(); // Fetch all organizations
            const orgNames = orgs.map(org => ({ name: org.name })); // Extract the name property from each document
            return orgNames;
        }
        catch (error) {
            const err = error;
            throw new Error('Failed to fetch organizations');
        }
    };
    deleteOrg = async (name) => {
        const ifDeleted = await Organization.updateOne({ $and: [
                { name: name },
                { is_active: true }
            ] }, { $set: { is_active: false } });
        console.log(ifDeleted, "deleted");
        if ((ifDeleted).modifiedCount) {
            return true;
        }
        return false;
    };
    createOrg = async (org) => {
        const organization = Organization.create({
            name: org,
        });
        return organization;
    };
    findOrgByName = async (org) => {
        // console.log('param org',org);
        const organization = await Organization.findOne({ name: org });
        // console.log("organization",organization);
        if (!organization) {
            return false;
        }
        const check2 = await Organization.findOne({
            $and: [
                { name: org },
                { is_active: true }
            ]
        });
        // console.log('check2',check2);
        if (check2) {
            return check2;
        }
        return false;
        // if(organization){
        //     const isActive =  organization.is_active;
        //     console.log("oragnization",organization);
        //     console.log("isActive",isActive)
        //     if(isActive){
        //         console.log("org is active");
        //         return organization;
        //     }
        //     else{
        //         return false;
        //     }
        // }
    };
}
export default OrganizationDao;
//# sourceMappingURL=organization.dao.mjs.map