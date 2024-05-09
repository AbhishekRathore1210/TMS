import { Organization } from "../models/organization.model.mjs";
async function createOrg(org) {
    const organization = Organization.create({
        name: org,
    });
    return organization;
}
export default { createOrg };
//# sourceMappingURL=organization.dao.mjs.map