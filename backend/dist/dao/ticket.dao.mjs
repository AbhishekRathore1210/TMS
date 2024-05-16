import { orgUser } from "../models/user.model.mjs";
import Ticket from "../models/ticket.model.mjs";
class TicketDAO {
    findUserByEmail = async (assignee, organization) => {
        console.log("assignee:", assignee);
        console.log("reporter:", organization);
        const user = await orgUser.findOne({ email: assignee, organization_list: organization });
        console.log("user", user);
        return user;
    };
    createticket = async (type, key, summary, description, assignee, reporter, dueDate, files) => {
        return await Ticket.create({
            type,
            key,
            summary,
            description,
            assignee: assignee,
            // reporter: reporterEmail,
            dueDate,
            files,
        });
    };
}
export default TicketDAO;
//# sourceMappingURL=ticket.dao.mjs.map