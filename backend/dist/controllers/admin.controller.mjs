import UserService from "../services/user.service.mjs";
class AdminController {
    userService = new UserService();
    registerAdmin = async (req, res) => {
        const { firstName, lastName, email } = req.body;
        // const userExist = await adminUser.findOne({ email: email });
        const userExist = await this.userService.createAdminUser(firstName, lastName, email);
        if (userExist) {
            res.status(400).json({ message: "User is already present" });
        }
        else {
            try {
                const newUser = this.userService.createAdmin(firstName, lastName, email);
                res.status(200).json(newUser);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        }
    };
    sendOTP = async (req, res) => {
        const { email } = req.body;
        const otpSent = await this.userService.sendOTP(email);
        return res.status(200).send({ success: "true", message: "OTP sent succesffuly" });
    };
    loginAdmin = async (req, res) => {
        const { email, otp } = req.body;
        const adminExist = await this.userService.checkAdmin(email, otp);
        if (!adminExist) {
            return res.status(401).json({ success: 'false', message: 'Cannot Login' });
        }
        else {
            return res.status(200).json({ success: 'true', message: "Login success" });
        }
    };
}
export default AdminController;
//# sourceMappingURL=admin.controller.mjs.map