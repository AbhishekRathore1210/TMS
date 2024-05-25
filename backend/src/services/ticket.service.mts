import { Request,Response,NextFunction } from "express-serve-static-core";
import TicketDAO from "../dao/ticket.dao.mjs";
import Ticket from "../models/ticket.model.mjs";
import { orgUser } from "../models/user.model.mjs";
import { Organization } from "../models/organization.model.mjs";
import { FilterQuery } from "mongoose";
import { statfs } from "fs/promises";
// import Ticket from "../models/ticket.model.mjs";

class TicketService{

    private ticketDAO = new TicketDAO();

    public updateTicket = async(req:Request,res:Response,next:NextFunction)=>{
      try{
        console.log("Req.body",req.body);
        const email =  req.user.email;

        const {type,status,key,summary,description,assignee,reporter} = req.body;
        const ticket = await Ticket.findOne({key:key});

        if(!ticket){
          return res.send({code:400,data:{success:false,message:"Ticket Not Found"}})
        }

        const historyLogs = [];
        if (ticket.type !== type) {
          historyLogs.push({ userName: email, fieldName: 'Type', oldValue: ticket.type, newValue: type });
          ticket.type = type;
        }
        if (ticket.summary !== summary) {
          historyLogs.push({ userName: email, fieldName: 'Summary', oldValue: ticket.summary, newValue: summary });
          ticket.summary = summary;
        }
        if (ticket.description !== description) {
          historyLogs.push({ userName: email, fieldName: 'Description', oldValue: ticket.description, newValue: description });
          ticket.description = description;
        }
        if (ticket.assignee !== assignee) {
          historyLogs.push({ userName: email, fieldName: 'Assignee', oldValue: ticket.assignee, newValue: assignee });
          ticket.assignee = assignee;
        }
        // if (ticket.dueDate !== dueDate) {
        //   historyLogs.push({ userName: email, fieldName: 'Due Date', oldValue: ticket.dueDate, newValue: dueDate });
        //   ticket.dueDate = dueDate;
        // }
        if (ticket.status !== status) {
          historyLogs.push({ userName: email, fieldName: 'Status', oldValue: ticket.status, newValue: status });
          ticket.status = status;
        }

        ticket.updatedDate = new Date();
        if (historyLogs.length > 0) {
          ticket.history.push(...historyLogs);
          await ticket.save();
        }

        res.status(200).send({code:200,data:{ success: true, message: 'Ticket updated successfully', ticket, history: historyLogs }});
        // const updateTicket = await Ticket.updateOne({key:key},{$set:{
        //     type:type,
        //     status:status,
        //     summary:summary,
        //     description:description,
        //     assignee:assignee,
        //     reporter:reporter
        // }});



        // if(updateTicket.modifiedCount){
        //   return res.send({code:200,data:{success:true,message:"Ticket Updated"}});
        // }
      }catch(error){
        return res.send({code:500,data:{
          status:500,
          message:"Internal Server Error"
        }})
      }
    }

    public getTickets = async(req:Request,res:Response,next:NextFunction)=>{
        try{  

          const page = Number(req.query.page) || 1;
          const limit = Number(req.query.limit) || 5;

          const skip = ((page-1)*limit);

          // const tickets = await this.ticketDAO.getTickets()
          const tickets = await Ticket.find({}).skip(skip).limit(limit);
          const totalTicket = await Ticket.countDocuments({})
          if(tickets.length != 0){
            return res.send({code:200,data:{tickets,currentPage:page,totalPage:(Math.ceil(totalTicket/limit)),status:true,message:"Fetched successful"
            }})
          }
          else{
            return res.send({code:400,data:{
              code:400,
              message:"Failed To fetch tickets"
            }})
          }
        }catch(error){
          const err = error as Error;
          console.log(err.message);
          return res.send({code:500,data:{
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
        organization:reporterOrgName,
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
    try{
        const org = req.user.organization;
        const users = await orgUser.find({organization_list:org});
        res.status(200).json({users});
    }catch(error){
      const err = error as Error;
      console.log(err.message);
    }
  }



  public showTicketsInOrganization = async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const user = req.user;
      if(!user){
        return res.status(403).json({ success: false, message: 'Unauthorized: Only authenticated users can view tickets' });
      }
      console.log(req.query);

      const type:string | undefined = req.query.type as string;
      const status:string | undefined = req.query.status as string;
      const cd:string | undefined = req.query.cd as string;
      const ud:string | undefined = req.query.ud as string;
      const dd:string | undefined = req.query.dd as string;

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;

      const skip = ((page-1)*limit);

      const filter: FilterQuery<typeof Ticket> = {$and:[{
        assignee:req.user.email},{organization:req.user.organization}]};
      if(type){
        filter.type = type;
      }
      if(status){
        filter.status = status;
      }

        // { $and: [
  //   { name: name },
  //   { is_active: true }
  // ]}
  
      // if(cd){
      //   const parsedDueDate = new Date(cd);
      //   filter.cd = {
      //     $gte: new Date(parsedDueDate.setHours(0, 0, 0, 0)),
      //     $lt: new Date(parsedDueDate.setHours(23, 59, 59, 999))
      //   };
      // }

      const tickets = await Ticket.find(filter).skip(skip).limit(limit);
      const totalTicket = await Ticket.countDocuments({$and:[{
        assignee:req.user.email},{organization:req.user.organization
      }]})

      res.status(200).json({ tickets,currentPage:page,totalPages:Math.ceil(totalTicket/limit) });
    }catch(error){
      const err = error as Error;
      console.log(err.message);
    }
  }
    
}
export default TicketService;