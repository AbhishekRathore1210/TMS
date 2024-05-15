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
    deleteOrg = async (req, res) => {
        // console.log(req.body);
        const { name } = req.body;
        const ifDeleted = await this.userService.deleteOrg(name);
        if (ifDeleted) {
            return res.status(200).send({ message: "Organization deleted!! hehe" });
        }
        return res.status(400).send({ message: "Not Deleted!" });
    };
}
export default Organization;
//# sourceMappingURL=organization.controller.mjs.map