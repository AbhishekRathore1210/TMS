import { orgUser } from "../models/user.model.mjs";
import { adminUser } from "../models/admin.model.mjs";
import { Organization } from "../models/organization.model.mjs";
async function createUser(firstName, lastName, org, email) {
    const newUser = orgUser.create({
        firstName: firstName,
        lastName: lastName,
        org: org,
        email: email,
        organization_list: [org]
    });
    return newUser;
}
async function checkAdmin(email, otp) {
    const user = await adminUser.findOne({ email: email });
    console.log(user);
    if (!user) {
        return false;
    }
    else {
        const updateUser = await adminUser.updateOne({ _id: user._id }, { $set: { otp: otp } });
        if (user.otp != otp) {
            return false;
        }
    }
    return user;
}
async function findOrgByName(org) {
    const organization = Organization.findOne({ name: org });
    return organization;
}
async function createAdmin(firstName, lastName, email) {
    const newUser = adminUser.create({
        name: firstName + ' ' + lastName,
        email: email
    });
    return newUser;
}
export default {
    createUser,
    createAdmin,
    checkAdmin,
    findOrgByName
};
//# sourceMappingURL=user.dao.mjs.map