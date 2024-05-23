import UserService from "../services/user.service.mjs";
class Organization {
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
    deleteOrg = async (req, res) => {
        const { name } = req.body;
        const ifDeleted = await this.userService.deleteOrg(name);
        if (ifDeleted) {
            return res.status(200).send({ message: "Organization deleted!!" });
        }
        return res.status(400).send({ message: "Not Deleted!" });
    };
}
export default Organization;
//# sourceMappingURL=organization.controller.mjs.map