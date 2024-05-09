import { orgUser } from '../models/User.mjs';
// import { checkAdmin , createUser , createAdmin,checkOrg } from '../services/userService.mjs';
import UserService from '../services/userService.mjs';
class UserController {
    userRegistration = async (req, res) => {
        const { firstName, lastName, org, email } = req.body;
        const userExist = await orgUser.findOne({ email: email });
        if (userExist) {
            res.status(400).json({
                message: "user is already present"
            });
        }
        else {
            try {
                const userAdded = UserService.createUser(firstName, lastName, org, email);
                // await userAdded.save();
                res.status(200).json({ userAdded });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        }
    };
}
export default UserController;
//# sourceMappingURL=userController.mjs.map