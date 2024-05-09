import { createUser } from '../../services/userService/registerOrgUser.mjs';
import { createAdmin } from '../../services/userService/registerOrgUser.mjs';
import { orgUser } from '../../models/User.mjs';
import { adminUser } from '../../models/Admin.mjs';
const register = async (req, res) => {
    const { firstName, lastName, org, email } = req.body;
    const userExist = await orgUser.findOne({ email: email });
    if (userExist) {
        res.status(400).json({ message: "user is already present"
        });
    }
    else {
        try {
            const userAdded = createUser(firstName, lastName, org, email);
            // await userAdded.save();
            res.status(200).json({ userAdded });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
const registerAdmin = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const userExist = await adminUser.findOne({ email: email });
    if (userExist) {
        res.status(400).json({ message: "User is already present" });
    }
    else {
        try {
            const newUser = createAdmin(firstName, lastName, email);
            res.status(200).json(newUser);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
export { register, registerAdmin };
//# sourceMappingURL=userController.mjs.map