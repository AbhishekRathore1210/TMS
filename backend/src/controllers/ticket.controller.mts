import { Request,Response,NextFunction } from "express-serve-static-core";
import TicketDAO from "../dao/ticket.dao.mjs";
import UserService from "../services/user.service.mjs";
import TicketService from "../services/ticket.service.mjs";

class ticketController {

    private ticketService = new TicketService();

    public createTicket = async(req:Request,res:Response,next:NextFunction)=>{  
        const ticket =  await this.ticketService.createTicket(req,res,next);
    }


    public showAllTickets = async(req:Request,res:Response,next:NextFunction)=>{  
        console.log("Tickets are here !!");
    }

}
export default ticketController;