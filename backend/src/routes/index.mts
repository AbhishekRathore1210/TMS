import express from 'express';
import { Router } from 'express';
import userRegisterSchema from '../controllers/validators/user.controller.validation.js';
import { RequestHandler } from 'express';
import UserController from "../controllers/user.controller.mjs"
import AdminController from "../controllers/admin.controller.mjs";
import OrganizationController from '../controllers/organization.controller.mjs';
import Validation from '../middleware/validator.middleware.mjs';

class Routes{
    public userPath = '/users';
    public adminPath = '/admin';
    public router = Router();
    public userController = new UserController();
    public adminController = new AdminController();
    public validation = new Validation();
    public organizationController = new OrganizationController();


    constructor() {
        this.initializeUserRoutes(`${this.userPath}`);
        this.initiaizeAdminRoutes(`${this.adminPath}`);
    }
    
    private initializeUserRoutes(prefix:string){
        console.log("Initializing user routes..");
        this.router.post(`${prefix}/register`,this.userController.userRegistration);
        // this.router.post(`${prefix}/`)
    }

    private initiaizeAdminRoutes(prefix:string){
        console.log("Admin Route");
        this.router.post(
            `${prefix}/register`,this.validation.validateUser(userRegisterSchema),
            this.adminController.registerAdmin
        );
        this.router.post(`${prefix}/login`,this.adminController.loginAdmin);
        this.router.post(`${prefix}/otp`,this.adminController.sendOTP);
        this.router.get(`${prefix}/dashboard`,this.adminController.showOrganization);
        this.router.post(`${prefix}/createOrg`,this.organizationController.createOrg);
    }
}


export default Routes
