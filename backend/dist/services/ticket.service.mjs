import TicketDAO from "../dao/ticket.dao.mjs";
import Ticket from "../models/ticket.model.mjs";
import { orgUser } from "../models/user.model.mjs";
class TicketService {
    ticketDAO = new TicketDAO();
    createTicket = async (req, res, next) => {
        // console.log("JWT user",req.user);
        try {
            const { type, summary, description, assignee, dueDate, files } = req.body;
            console.log("body me ye aa rha h ", req.body);
            const reporterOrgName = req.user.organization;
            const reporterEmail = req.user.email;
            // console.log(req.user);
            const assigneeUser = await this.ticketDAO.findUserByEmail(assignee, reporterOrgName);
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
                console.log("TICKET COUNT : ", ticketCount);
            }
            const key = `${reporterOrgName}-${ticketCount}`;
            console.log("KEY : ", key);
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
            // await orgUser.findOneAndUpdate(
            //   { email: reporterEmail },
            //   {
            //     $inc: { ticketCount: 1 }, // Increment ticket count
            //     $set: { ticketStatus: 'TOBEPICKED' } // Set ticket status to TOBEPICKED
            //   }
            // );
            await orgUser.findOneAndUpdate({ email: assignee }, {
                $push: {
                    tickets: {
                        ticketId: ticket._id,
                        status: 'TOBEPICKED',
                        reporter: reporterEmail
                    }
                }
            });
            res.status(201).json({ success: true, message: 'Ticket created successfully', ticket });
        }
        catch (error) {
            res.status(500).json({ success: false, error: 'Failed to create ticket', message: error.message });
        }
    };
    showTicketsInOrganization = async (req, res, next) => {
        try {
            const user = req.user;
            console.log("user", user.email);
            if (!user) {
                return res.status(403).json({ success: false, message: 'Unauthorized: Only authenticated users can view tickets' });
            }
            const tickets = await Ticket.find({ assignee: req.user.email });
            res.status(200).json({ tickets });
        }
        catch (error) {
            console.log(error.message);
        }
    };
}
export default TicketService;
//# sourceMappingURL=ticket.service.mjs.map