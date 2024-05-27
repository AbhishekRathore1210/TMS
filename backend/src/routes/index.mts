import express from "express";
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
import orgSchema from "../controllers/validators/organization.controller.validation.js";

class Routes {
  public userPath = "/users";
  public adminPath = "/admin";
  public orgPath = "/org";
  public router = Router();
  public userController = new UserController();
  public adminController = new AdminController();
  public ticketController = new TicketController();
  public validation = new Validation();
  public organizationController = new OrganizationController();
  public authentication = new Authentication();

  constructor() {
    this.initializeUserRoutes(`${this.userPath}`);
    this.initializeAdminRoutes(`${this.adminPath}`);
    this.initializeOrganizationRoutes(`${this.orgPath}`);
  }

  private initializeOrganizationRoutes(prefix:string){
    console.log("Initializing Org Routes");
    this.router.get('/org',this.organizationController.allOrg);
  }

  private initializeUserRoutes(prefix: string) {
    console.log("Initializing user routes..");
    this.router.post(
      `${prefix}/register`,
      this.validation.validate(orgUserRegisterSchema),
      this.userController.userRegistration
    );
    this.router.post(`${prefix}/login`,this.validation.validate(userLoginSchema), this.userController.userLogin);

    this.router.post(
      `${prefix}/ticket`,
      this.authentication.Auth,
      this.validation.validate(ticketSchema),
      this.ticketController.createTicket
    );
    this.router.get(
      `${prefix}/tickets`,
      this.authentication.Auth,
      this.ticketController.showAllTicketsInOrganization
    );
    this.router.get(
      `${prefix}/`,
      this.authentication.Auth,
      this.ticketController.showAllUserInOrganization
    );
    this.router.put(`${prefix}/ticket`,this.authentication.Auth,this.ticketController.updateTicket);

  }

  private initializeAdminRoutes(prefix: string) {
    console.log("Admin Route");

    this.router.post(`${prefix}/login`,this.validation.validate(userLoginSchema), this.adminController.loginAdmin);
    this.router.post(`${prefix}/otp`,this.validation.validate(userLoginSchema), this.adminController.sendOTP);
    this.router.get(
      `${prefix}/organizations`,
      this.adminController.showOrganization
    );
    this.router.post(
      `${prefix}/organization`,
      this.authentication.Auth,
      this.organizationController.createOrg
    );
    this.router.post(
      `${prefix}/organization/delete`,
      this.organizationController.deleteOrg
    );
  }
}
export default Routes;
