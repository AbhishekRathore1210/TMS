import UserService from "../services/userService.mjs";
import { adminUser } from '../models/admin.model.mjs';
class AdminController {
    registerAdmin = async (req, res) => {
        const { firstName, lastName, email } = req.body;
        const userExist = await adminUser.findOne({ email: email });
        if (userExist) {
            res.status(400).json({ message: "User is already present" });
        }
        else {
            try {
                const newUser = UserService.createAdmin(firstName, lastName, email);
                res.status(200).json(newUser);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        }
    };
    loginAdmin = async (req, res) => {
        const { email, otp } = req.body;
        const adminExist = await UserService.checkAdmin(email, otp);
        if (!adminExist) {
            res.status(400).json({ message: 'Cannot Login' });
        }
        else {
            res.status(200).send({ message: "Login success" });
        }
    };
}
export default AdminController;
//# sourceMappingURL=admin.controller.js.map