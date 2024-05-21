import { Request,Response,NextFunction } from "express-serve-static-core";
import TicketDAO from "../dao/ticket.dao.mjs";
import Ticket from "../models/ticket.model.mjs";
import { orgUser } from "../models/user.model.mjs";
import { Organization } from "../models/organization.model.mjs";

class TicketService{

    private ticketDAO = new TicketDAO();

    public updateTicket = async(req:Request,res:Response,next:NextFunction)=>{
      try{
          return res.send({code:200,data:{
            status:200,
            message:"Successfull"
          }})
      }catch(error){
        res.send({code:500,data:{
          status:500,
          message:"Internal Server Error"
        }})
      }
    }

    public createTicket = async(req:Request,res:Response,next:NextFunction) =>{
        // console.log("JWT user",req.user);
        try{
        const { type, summary, description, assignee, dueDate, files } = req.body;
        // console.log("body me ye aa rha h ",req.body);
        const reporterOrgName = req.user.organization;
        const reporterEmail = req.user.email;
        // console.log(req.user);
        

        const assigneeUser = await this.ticketDAO.findUserByEmail( assignee, reporterOrgName );
        // console.log(assigneeUser,"assigneeUser");
        if (!assigneeUser) {
            return res.status(400).json({ success: false, message: 'Assignee not found in your organization' });
          }
     
          const latestTicket = await Ticket.findOne({ key: { $regex: `^${reporterOrgName}-` } }).sort({ _id: -1 });

          let ticketCount = 1;
      if (latestTicket) {
          const parts = latestTicket.key.split('-');
          const latestCount = parseInt(parts[1]);
          ticketCount = latestCount + 1;
          // console.log("TICKET COUNT : ", ticketCount);
      }
      
      const key = `${reporterOrgName}-${ticketCount}`;
      // console.log("KEY : ", key);

      const ticket = await Ticket.create({
        type,
        key,
        summary,
        description,
        assignee: assignee,
        reporter: reporterEmail,
        dueDate,
        files,
      });

      await orgUser.findOneAndUpdate(
        { email: assignee },
        {
          $push: {
            tickets: {
              ticketId: ticket._id,
              status: 'TOBEPICKED',
              reporter: reporterEmail
            }
          }
        }
      );

      res.status(201).json({ success: true, message: 'Ticket created successfully', ticket });
    }catch (error : any) {
      res.status(500).json({ success: false, error: 'Failed to create ticket', message: error.message });
    }
  }

  public showAllUserInOrganization = async(req:Request,res:Response,next:NextFunction)=>{
    console.log("JWT",req.user);
    try{
        const org = req.user.organization;
        console.log("org",org);
        const users = await orgUser.find({organization_list:org});
        console.log("users",users);
        res.status(200).json({users});
    }catch(error:any){
      console.log(error.message);
    }
  }

  public showTicketsInOrganization = async(req:Request,res:Response,next:NextFunction)=>{
    try{

      const user = req.user;
      if(!user){
        return res.status(403).json({ success: false, message: 'Unauthorized: Only authenticated users can view tickets' });
      }
      // console.log(req.query);

      const page = Number(req.query.page);
      const limit = Number(req.query.limit);

      const skip = ((page-1)*limit);
      // const skip = ((Number(page)-1)*Number(limit));
      // console.log("Page",page);
      // console.log("limit",limit);

      const tickets = await Ticket.find({assignee: req.user.email }).skip(skip).limit(limit);
      const totalTicket = await Ticket.countDocuments({assignee:req.user.email})

      res.status(200).json({ tickets,currentPage:page,totalPages:Math.ceil(totalTicket/limit) });
    }catch(error:any){
      console.log(error.message);
    }
  }
    
}
export default TicketService;