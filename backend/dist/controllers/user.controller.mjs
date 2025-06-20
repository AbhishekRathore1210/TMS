import { orgUser } from '../models/user.model.mjs';
import { Organization } from '../models/organization.model.mjs';
import UserService from '../services/user.service.mjs';
import jwt from 'jsonwebtoken';
class UserController {
    userService = new UserService();
    secretKey = 'Abhishek@123$';
    userRegistration = async (req, res) => {
        try {
            const { firstName, lastName, org, email, dob, doj } = req.body;
            console.log(req.body);
            const orgExist = await Organization.findOne({ name: org });
            // console.log(orgExist);
            if (!orgExist) {
                res.status(400).send({ success: false, message: "Organization not Exists!" });
            }
            else {
                const userExist = await orgUser.findOne({ email: email });
                if (userExist) {
                    if (userExist.organization_list.includes(org)) {
                        res.status(400).send({ success: false, message: "User is part of this Organization" });
                    }
                    else {
                        userExist.organization_list.push(org);
                        await userExist.save();
                        orgExist.user_list.push({
                            userId: userExist._id,
                            name: userExist.firstName + ' ' + userExist.lastName,
                            email: userExist.email
                        });
                        await orgExist.save();
                        return res.status(200).send({ success: true, message: "User is added to Another Organization" });
                    }
                }
                else {
                    // create user 
                    const user = await this.userService.createUser(firstName, lastName, org, email, dob, doj);
                    orgExist.user_list.push({
                        userId: user._id,
                        name: user.firstName + ' ' + user.lastName,
                        email: user.email
                    });
                    await orgExist.save();
                    res.status(200).send({ success: true, message: "New User is added to the Organization" });
                }
            }
        }
        catch (error) {
            const err = error;
            console.log(err.message);
        }
    };
    userLogin = async (req, res) => {
        try {
            const { email, org, otp } = req.body;
            const orgExist = await Organization.findOne({ name: org });
            if (!orgExist) {
                res.status(400).send({ success: false, message: "Organization not Exists!" });
            }
            else {
                if (!orgExist.is_active) {
                    res.status(400).send({ success: false, message: "Organization is delived!!" });
                }
                const userExist = await orgUser.findOne({ email: email });
                if (userExist) {
                    if (!userExist.organization_list.includes(org)) {
                        res.status(501).send({ success: false, message: "User is Not Part of this Organization" });
                    }
                    else {
                        const myOTP = userExist.otp;
                        // console.log("otp",otp);
                        if (otp == undefined || myOTP != otp || userExist.otpExipre && userExist.otpExipre.getTime() < Date.now()) {
                            res.status(501).send({ success: false, message: "Incorrect OTP" });
                        }
                        else {
                            const token = jwt.sign({ email: email, is_admin: userExist.is_admin, organization: org }, this.secretKey);
                            res.status(200).send({ accessToken: token, success: true, message: "Login Successfully!" });
                        }
                    }
                }
                else {
                    res.status(501).send({ success: false, message: "User not Exist kindly Login!!" });
                }
            }
        }
        catch (error) {
            const err = error;
            console.log(err.message);
        }
    };
}
export default UserController;
//# sourceMappingURL=user.controller.mjs.map