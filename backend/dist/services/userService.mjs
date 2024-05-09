import express from 'express';
const regOrgRoute = express.Router();
import userDAO from '../dao/userDAO.mjs';
import createDAO from '../dao/createDAO.mjs';
class UserService {
    static async createUser(firstName, lastName, org, email) {
        const newUser = userDAO.createUser(firstName, lastName, org, email);
        return newUser;
    }
    static async createAdmin(firstName, lastName, email) {
        const newUser = userDAO.createAdmin(firstName, lastName, email);
        return newUser;
    }
    static async checkAdmin(email, otp) {
        const user = userDAO.checkAdmin(email, otp);
        return user;
    }
    static async checkOrg(org) {
        const organization = await userDAO.findOrgByName(org);
        if (organization) {
            return true;
        }
        createDAO.createOrg(org);
        return false;
    }
}
export default UserService;
//# sourceMappingURL=userService.mjs.map