import TicketService from "../services/ticket.service.mjs";
class ticketController {
    ticketService = new TicketService();
    createTicket = async (req, res, next) => {
        const ticket = await this.ticketService.createTicket(req, res, next);
    };
    updateTicket = async (req, res, next) => {
        const updatedTicket = await this.ticketService.updateTicket(req, res, next);
    };
    showAllTicketsInOrganization = async (req, res, next) => {
        const allTicketInOrganization = await this.ticketService.showTicketsInOrganization(req, res, next);
    };
    showAllUserInOrganization = async (req, res, next) => {
        const allUserInOrganization = await this.ticketService.showAllUserInOrganization(req, res, next);
    };
}
export default ticketController;
//# sourceMappingURL=ticket.controller.mjs.map