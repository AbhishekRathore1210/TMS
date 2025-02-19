import { orgUser } from "../models/user.model.mjs";
import Ticket from "../models/ticket.model.mjs";
class TicketDAO {
    findUserByEmail = async (assignee, organization) => {
        // console.log("assignee:",assignee);
        // console.log("reporter Organization:",organization);
        const user = await orgUser.findOne({ email: assignee, organization_list: organization });
        return user;
    };
    getTickets = async () => {
        const tickets = await Ticket.find({});
        return tickets;
    };
}
export default TicketDAO;
//# sourceMappingURL=ticket.dao.mjs.map