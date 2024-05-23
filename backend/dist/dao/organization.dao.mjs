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
        const organization = Organization.findOne({
            $and: [
                { name: org },
                { is_active: true }
            ]
        });
        return organization;
    };
}
export default OrganizationDao;
//# sourceMappingURL=organization.dao.mjs.map