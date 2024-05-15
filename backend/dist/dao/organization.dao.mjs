import { Organization } from "../models/organization.model.mjs";
class OrganizationDao {
    showAllOrganizations = async () => {
        const allOrg = Organization.find();
        return allOrg;
    };
    deleteOrg = async (name) => {
        const ifDeleted = await Organization.updateOne({ name: name }, { $set: { is_active: false } });
        console.log("ifDeleted", ifDeleted);
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
        const organization = Organization.findOne({ name: org });
        return organization;
    };
}
export default OrganizationDao;
//# sourceMappingURL=organization.dao.mjs.map