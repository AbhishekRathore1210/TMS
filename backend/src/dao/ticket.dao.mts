import { orgUser } from "../models/user.model.mjs";
import Ticket from "../models/ticket.model.mjs";

class TicketDAO{

    public findUserByEmail = async(assignee:string,organization:string)=>{
        console.log("assignee:",assignee);
        console.log("reporter:",organization);
        const user =  await orgUser.findOne({email:assignee,organization_list:organization});
        // console.log("user",user);
        return user;
    }

    public createticket = async(type: string,
        key: string,
        summary: string,
        description: string,
        assignee: string,
        reporter: string | undefined,
        dueDate: Date,
        files: File)=> {
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
    }
}

export default TicketDAO