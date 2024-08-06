namespace ticketDemo;
using { ticket as ticketAPI } from './ticket';

entity ServiceRequests as projection on ticketAPI.ServiceRequestCollection {
    key ObjectID,
    ID,
    ProcessingTypeCode as ProcessType,
    Name,
    ServiceRequestLifeCycleStatusCode as Status,
    ServiceRequestLifeCycleStatusCodeText as StatusText,
    MainTicketID
}