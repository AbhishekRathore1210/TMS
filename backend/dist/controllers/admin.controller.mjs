import UserService from "../services/user.service.mjs";
import jwt from 'jsonwebtoken';
class AdminController {
    userService = new UserService();
    registerAdmin = async (req, res, next) => {
        const { firstName, lastName, email } = req.body;
        const userExist = await this.userService.createAdminUser(firstName, lastName, email);
        if (userExist) {
            return res.status(400).json({ success: false, message: "User is Already Present Kindly Login!!" });
        }
        else {
            try {
                const newUser = this.userService.createAdmin(firstName, lastName, email);
                return res.status(200).json(newUser);
            }
            catch (error) {
                const err = error;
                return res.status(400).json({ error: err.message });
            }
        }
    };
    sendOTP = async (req, res) => {
        // const {email,org} = req.body;
        // const otpSent = await this.userService.sendOTP(email,org);
        // console.log(otpSent,'value');
        // if(otpSent){
        return res.status(200).send({ success: true, message: "OTP sent succesffuly" });
        // }
        // return res.send({code:400,data:{
        //     success:false,
        //     message:"User is not Pressent"
        // }})
    };
    showOrganization = async (req, res, next) => {
        const allOrganizations = await this.userService.allOrganizations(req, res, next);
        return res.status(200).json(allOrganizations);
    };
    loginAdmin = async (req, res) => {
        const { email, otp } = req.body;
        const adminExist = await this.userService.checkAdmin(email, otp);
        if (!adminExist) {
            return res.status(401).json({ success: false, message: 'Cannot Login' });
        }
        else {
            const token = jwt.sign({ adminExist }, process.env.JWT_SECRET_KEY);
            // console.log(token);
            return res.status(200).json({ accessToken: token, success: true, message: "Login success" });
        }
    };
}
export default AdminController;
//# sourceMappingURL=admin.controller.mjs.map