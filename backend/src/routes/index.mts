import express from 'express';
import { Router } from 'express';
import userRegisterSchema from '../controllers/validators/user.controller.validation.js';
import validate from '../middleware/user.middleware.mjs';
import { RequestHandler } from 'express';
import UserController from "../controllers/user.controller.mjs"
import AdminController from "../controllers/admin.controller.mjs";

class Routes{
    public userPath = '/users';
    public adminPath = '/admin';
    public router = Router();
    public userController = new UserController();
    public adminController = new AdminController();


    constructor() {
        this.initializeUserRoutes(`${this.userPath}`);
        this.initiaizeAdminRoutes(`${this.adminPath}`);
    }
    
    private initializeUserRoutes(prefix:string){
        console.log("Initializing user routes..");
        this.router.post(`users/register`,this.userController.userRegistration);
        // this.router.post(`${prefix}/`)
    }

    private initiaizeAdminRoutes(prefix:string){
        console.log("Admin Route");
        this.router.post(`${prefix}/register`,this.adminController.registerAdmin);
        this.router.post(`${prefix}/login`,this.adminController.loginAdmin);
        this.router.post(`${prefix}/otp`,this.adminController.sendOTP);
    }
}


export default Routes
