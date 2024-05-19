import { Router } from 'express';
import { userRegisterSchema } from '../controllers/validators/user.controller.validation.js';
import UserController from "../controllers/user.controller.mjs";
import AdminController from "../controllers/admin.controller.mjs";
import OrganizationController from '../controllers/organization.controller.mjs';
import Validation from '../middleware/validator.middleware.mjs';
import orgUserRegisterSchema from '../controllers/validators/orguser.controller.validation.js';
import Auth from '../middleware/auth.middleware.mjs';
import TicketController from '../controllers/ticket.controller.mjs';
class Routes {
    userPath = '/users';
    adminPath = '/admin';
    router = Router();
    userController = new UserController();
    adminController = new AdminController();
    ticketController = new TicketController();
    validation = new Validation();
    organizationController = new OrganizationController();
    constructor() {
        this.initializeUserRoutes(`${this.userPath}`);
        this.initiaizeAdminRoutes(`${this.adminPath}`);
    }
    initializeUserRoutes(prefix) {
        console.log("Initializing user routes..");
        this.router.post(`${prefix}/register`, this.validation.validate(orgUserRegisterSchema), this.userController.userRegistration);
        this.router.post(`${prefix}/login`, this.userController.userLogin);
        this.router.get(`${prefix}/dashboard`, Auth, this.ticketController.showAllTicketsInOrganization);
        this.router.post(`${prefix}/dashboard/createTicket`, Auth, this.ticketController.createTicket);
        this.router.get(`${prefix}/getAllTicketsInOrg`, Auth, this.ticketController.showAllTicketsInOrganization);
        // this.router.get(`${prefix}/getAllOrg`,this.adminController.showOrganization);
    }
    initiaizeAdminRoutes(prefix) {
        console.log("Admin Route");
        this.router.post(`${prefix}/register`, this.validation.validate(userRegisterSchema), this.adminController.registerAdmin);
        this.router.post(`${prefix}/login`, this.adminController.loginAdmin);
        this.router.post(`${prefix}/otp`, this.adminController.sendOTP);
        this.router.get(`${prefix}/dashboard`, this.adminController.showOrganization);
        this.router.post(`${prefix}/dashboard/createOrg`, this.organizationController.createOrg);
        this.router.post(`${prefix}/dashboard/deleteOrg`, this.organizationController.deleteOrg);
    }
}
export default Routes;
//# sourceMappingURL=index.mjs.map