import express from "express";
import { Router } from "express";
import { userRegisterSchema } from "../controllers/validators/user.controller.validation.js";
import { userLoginSchema } from "../controllers/validators/user.controller.validation.js";
import { RequestHandler } from "express";
import UserController from "../controllers/user.controller.mjs";
import AdminController from "../controllers/admin.controller.mjs";
import OrganizationController from "../controllers/organization.controller.mjs";
import Validation from "../middleware/validator.middleware.mjs";
import errorMiddleWare from "../middleware/error.middleware.mjs";
import orgUserRegisterSchema from "../controllers/validators/orguser.controller.validation.js";
import Auth from "../middleware/auth.middleware.mjs";
import TicketController from "../controllers/ticket.controller.mjs";
import ticketSchema from "../controllers/validators/ticket.controller.validation.js";

class Routes {
  public userPath = "/users";
  public adminPath = "/admin";
  public router = Router();
  public userController = new UserController();
  public adminController = new AdminController();
  public ticketController = new TicketController();
  public validation = new Validation();
  public organizationController = new OrganizationController();

  constructor() {
    this.initializeUserRoutes(`${this.userPath}`);
    this.initiaizeAdminRoutes(`${this.adminPath}`);
  }

  private initializeUserRoutes(prefix: string) {
    console.log("Initializing user routes..");
    this.router.post(
      `${prefix}/register`,
      this.validation.validate(orgUserRegisterSchema),
      this.userController.userRegistration
    );
    this.router.post(`${prefix}/login`, this.userController.userLogin);
    this.router.get(
      `${prefix}/dashboard`,
      Auth,
      this.ticketController.showAllTicketsInOrganization
    );
    this.router.post(
      `${prefix}/dashboard/createTicket`,
      Auth,
      this.ticketController.createTicket
    );
    this.router.get(
      `${prefix}/getAllTicketsInOrg`,
      Auth,
      this.ticketController.showAllTicketsInOrganization
    );
    this.router.get(
      `${prefix}/showAllUsersInOrg`,
      Auth,
      this.ticketController.showAllUserInOrganization
    );
    // this.router.get(`${prefix}/getAllOrg`,this.adminController.showOrganization);
  }

  private initiaizeAdminRoutes(prefix: string) {
    console.log("Admin Route");
    this.router.post(
      `${prefix}/register`,
      this.validation.validate(userRegisterSchema),
      this.adminController.registerAdmin
    );
    this.router.post(`${prefix}/login`, this.adminController.loginAdmin);
    this.router.post(`${prefix}/otp`, this.adminController.sendOTP);
    this.router.get(
      `${prefix}/dashboard`,
      this.adminController.showOrganization
    );
    this.router.post(
      `${prefix}/dashboard/createOrg`,Auth,
      this.organizationController.createOrg
    );
    this.router.post(
      `${prefix}/dashboard/deleteOrg`,Auth,
      this.organizationController.deleteOrg
    );
  }
}

export default Routes;
