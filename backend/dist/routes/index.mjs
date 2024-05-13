import { Router } from 'express';
import { userRegisterSchema } from '../controllers/validators/user.controller.validation.js';
import { userLoginSchema } from '../controllers/validators/user.controller.validation.js';
import UserController from "../controllers/user.controller.mjs";
import AdminController from "../controllers/admin.controller.mjs";
import OrganizationController from '../controllers/organization.controller.mjs';
import Validation from '../middleware/validator.middleware.mjs';
import orgUserRegisterSchema from '../controllers/validators/orguser.controller.validation.js';
class Routes {
    userPath = '/users';
    adminPath = '/admin';
    router = Router();
    userController = new UserController();
    adminController = new AdminController();
    validation = new Validation();
    organizationController = new OrganizationController();
    constructor() {
        this.initializeUserRoutes(`${this.userPath}`);
        this.initiaizeAdminRoutes(`${this.adminPath}`);
    }
    initializeUserRoutes(prefix) {
        console.log("Initializing user routes..");
        this.router.post(`${prefix}/register`, this.validation.validate(orgUserRegisterSchema), this.userController.userRegistration);
    }
    initiaizeAdminRoutes(prefix) {
        console.log("Admin Route");
        this.router.post(`${prefix}/register`, this.validation.validate(userRegisterSchema), this.adminController.registerAdmin);
        this.router.post(`${prefix}/login`, this.validation.validate(userLoginSchema), this.adminController.loginAdmin);
        this.router.post(`${prefix}/otp`, this.adminController.sendOTP);
        this.router.get(`${prefix}/dashboard`, this.adminController.showOrganization);
        this.router.post(`${prefix}/createOrg`, this.organizationController.createOrg);
    }
}
export default Routes;
//# sourceMappingURL=index.mjs.map