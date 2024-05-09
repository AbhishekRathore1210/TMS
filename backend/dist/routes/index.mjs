import { Router } from 'express';
import UserController from "../controllers/user.controller.mjs";
import AdminController from "../controllers/admin.controller.mjs";
class Routes {
    userPath = '/users';
    adminPath = '/admin';
    router = Router();
    userController = new UserController();
    adminController = new AdminController();
    constructor() {
        this.initializeUserRoutes(`${this.userPath}`);
        this.initiaizeAdminRoutes(`${this.adminPath}`);
    }
    initializeUserRoutes(prefix) {
        console.log("Initializing user routes..");
        this.router.post(`users/register`, this.userController.userRegistration);
        // this.router.post(`${prefix}/`)
    }
    initiaizeAdminRoutes(prefix) {
        console.log("Admin Route");
        this.router.post(`${prefix}/register`, this.adminController.registerAdmin);
        this.router.post(`${prefix}/login`, this.adminController.loginAdmin);
        this.router.post(`${prefix}/otp`, this.adminController.sendOTP);
    }
}
export default Routes;
//# sourceMappingURL=index.mjs.map