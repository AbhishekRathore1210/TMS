// import { checkAdmin , createUser , createAdmin,checkOrg } from '../services/userService.mjs';
import UserService from '../services/user.service.mjs';
class Organization {
    userService = new UserService();
    createOrg = async (req, res) => {
        const { org } = req.body;
        const orgExist = await this.userService.checkOrg(org);
        if (orgExist) {
            res.status(400).send({
                success: false,
                message: 'Organization already exists!'
            });
        }
        else {
            res.status(200).send({ success: true, message: 'Organization Created' });
        }
    };
}
export default Organization;
//# sourceMappingURL=organization.controller.mjs.map