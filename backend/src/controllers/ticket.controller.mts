import { Request,Response,NextFunction } from "express-serve-static-core";
import TicketDAO from "../dao/ticket.dao.mjs";
import UserService from "../services/user.service.mjs";
import TicketService from "../services/ticket.service.mjs";

class ticketController {

    private ticketService = new TicketService();

    public createTicket = async(req:Request,res:Response,next:NextFunction)=>{  
        const ticket =  await this.ticketService.createTicket(req,res,next);
    }

    public showAllTicketsInOrganization = async(req:Request,res:Response,next:NextFunction)=>{  
        const allTicketInOrganization = await this.ticketService.showTicketsInOrganization(req,res,next);
        // console.log("in controller ",allTicketInOrganization);
    }

    public showAllUserInOrganization = async(req:Request,res:Response,next:NextFunction)=>{
        const allUserInOrganization = await this.ticketService.showAllUserInOrganization(req,res,next);
    }

}
export default ticketController;