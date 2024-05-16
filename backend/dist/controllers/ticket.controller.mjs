import TicketService from "../services/ticket.service.mjs";
class ticketController {
    ticketService = new TicketService();
    createTicket = async (req, res, next) => {
        const ticket = await this.ticketService.createTicket(req, res, next);
    };
    showAllTickets = async (req, res, next) => {
        console.log("Tickets are here !!");
    };
}
export default ticketController;
//# sourceMappingURL=ticket.controller.mjs.map