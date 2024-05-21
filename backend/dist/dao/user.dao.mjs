import { orgUser } from "../models/user.model.mjs";
import { adminUser } from "../models/admin.model.mjs";
class UserDao {
    createUser = async (firstName, lastName, org, email, dob, doj) => {
        const newUser = orgUser.create({
            firstName: firstName,
            lastName: lastName,
            org: org,
            email: email,
            dob: dob,
            doj: doj,
            organization_list: [org]
        });
        return newUser;
    };
    createAdminUser = async (firstName, lastName, email) => {
        const user = await adminUser.findOne({ email: email });
        if (user) {
            return true;
        }
        return false;
    };
    checkAdmin = async (email, otp) => {
        const user = await adminUser.findOne({ email: email });
        // console.log(user);
        if (!user) {
            return false;
        }
        else {
            if (user.otp != otp) {
                return false;
            }
        }
        return user;
    };
    createAdmin = async (firstName, lastName, email) => {
        const newUser = adminUser.create({
            name: firstName + ' ' + lastName,
            email: email
        });
        return newUser;
    };
}
export default UserDao;
//# sourceMappingURL=user.dao.mjs.map