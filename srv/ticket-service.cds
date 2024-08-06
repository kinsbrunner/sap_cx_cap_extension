using { ticketDemo as tckt } from './external';

service TicketService {
    @readonly
    entity ServiceReq as projection on tckt.ServiceRequests
      actions {
        action updateParentTicketStatus();
      }
}