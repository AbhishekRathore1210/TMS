import { Router } from "express";
import { userLoginSchema, userRegisterSchema } from "../controllers/validators/user.controller.validation.js";
import UserController from "../controllers/user.controller.mjs";
import AdminController from "../controllers/admin.controller.mjs";
import OrganizationController from "../controllers/organization.controller.mjs";
import Validation from "../middleware/validator.middleware.mjs";
import orgUserRegisterSchema from "../controllers/validators/orguser.controller.validation.js";
import TicketController from "../controllers/ticket.controller.mjs";
import ticketSchema from "../controllers/validators/ticket.controller.validation.js";
import Authentication from "../middleware/auth.middleware.mjs";
class Routes {
    userPath = "/users";
    adminPath = "/admin";
    orgPath = "/org";
    router = Router();
    userController = new UserController();
    adminController = new AdminController();
    ticketController = new TicketController();
    validation = new Validation();
    organizationController = new OrganizationController();
    authentication = new Authentication();
    constructor() {
        this.initializeUserRoutes(`${this.userPath}`);
        this.initializeAdminRoutes(`${this.adminPath}`);
        this.initializeOrganizationRoutes(`${this.orgPath}`);
    }
    initializeOrganizationRoutes(prefix) {
        console.log("Initializing Org Routes");
        this.router.get('/org', this.organizationController.allOrg);
    }
    initializeUserRoutes(prefix) {
        console.log("Initializing user routes..");
        this.router.post(`${prefix}/register`, this.validation.validate(orgUserRegisterSchema), this.userController.userRegistration);
        this.router.post(`${prefix}/login`, this.validation.validate(userLoginSchema), this.userController.userLogin);
        this.router.get(`${prefix}/dashboard`, 
        // this.authentication.Auth,
        this.ticketController.showAllTicketsInOrganization);
        this.router.post(`${prefix}/dashboard/create-ticket`, this.authentication.Auth, this.validation.validate(ticketSchema), this.ticketController.createTicket);
        this.router.get(`${prefix}/tickets-in-org`, this.authentication.Auth, this.ticketController.showAllTicketsInOrganization);
        this.router.get(`${prefix}/users-in-organization`, this.authentication.Auth, this.ticketController.showAllUserInOrganization);
        this.router.put(`${prefix}/update-ticket`, this.authentication.Auth, this.ticketController.updateTicket);
        this.router.get(`${prefix}/tickets`, this.ticketController.getTickets);
        // this.router.get(`${prefix}/getAllOrg`,this.adminController.showOrganization);
    }
    initializeAdminRoutes(prefix) {
        console.log("Admin Route");
        this.router.post(`${prefix}/register`, this.validation.validate(userRegisterSchema), this.adminController.registerAdmin);
        this.router.post(`${prefix}/login`, this.validation.validate(userLoginSchema), this.adminController.loginAdmin);
        this.router.post(`${prefix}/otp`, this.validation.validate(userLoginSchema), this.adminController.sendOTP);
        this.router.get(`${prefix}/dashboard`, this.adminController.showOrganization);
        this.router.post(`${prefix}/dashboard/create-org`, this.authentication.Auth, this.organizationController.createOrg);
        this.router.post(`${prefix}/dashboard/delete-org`, this.organizationController.deleteOrg);
        // this.router.get(`/users-in-org`,this.organizationController.showUserInOrg);
    }
}
export default Routes;
//# sourceMappingURL=index.mjs.map