import OrganizationDao from "../dao/organization.dao.mjs";
import UserService from "../services/user.service.mjs";
class Organization {
    organizationDao = new OrganizationDao();
    userService = new UserService();
    createOrg = async (req, res) => {
        const { org } = req.body;
        const newOrg = await this.userService.checkOrganization(org);
        if (newOrg) {
            res.status(200).send({ success: true, message: " New Organization Created" });
        }
        else {
            res.status(400).send({ success: false, message: "Organization already Exists!" });
        }
    };
    allOrg = async (req, res, next) => {
        const allOrg = await this.userService.allOrg(req, res, next);
        if (allOrg) {
            return res.send({ code: 200, data: { success: true, allOrg } });
        }
        return res.send({ code: 400, data: { success: false, message: "Failed to fetch organizations" } });
    };
    deleteOrg = async (req, res) => {
        const { name } = req.body;
        const ifDeleted = await this.userService.deleteOrg(name);
        if (ifDeleted) {
            return res.status(200).send({ message: "Organization deleted!!" });
        }
        return res.status(400).send({ message: "Not Deleted!" });
    };
    showUserInOrg = async (req, res) => {
        // console.log('param',req.params.name);
        const name = req.params.name;
        const newOrg = await this.organizationDao.findOrgByName(name);
        if (newOrg) {
            return res.send({ code: 200, data: { success: true, userList: newOrg.user_list } });
        }
        return res.send({ code: 400, data: { success: false, message: "Not Found", userList: [] } });
    };
}
export default Organization;
//# sourceMappingURL=organization.controller.mjs.map