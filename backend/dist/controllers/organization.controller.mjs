// import { checkAdmin , createUser , createAdmin,checkOrg } from '../services/userService.mjs';
import UserService from '../services/user.service.mjs';
class Organization {
    createOrg = async (req, res) => {
        const { org } = req.body;
        const orgExist = await UserService.checkOrg(org);
        if (orgExist) {
            res.status(400).json({
                success: 'false',
                message: 'Organization already exists!'
            });
        }
        else {
            res.status(200).json({ success: 'true', message: 'Organization Created' });
        }
    };
}
export default Organization;
//# sourceMappingURL=organization.controller.mjs.map