const cds = require('@sap/cds');
const { run } = require('node:test');

module.exports = cds.service.impl(async (srv) => {
    const service = await cds.connect.to('ticket');

    srv.on('READ', 'ServiceReq', async req => {
        console.log('>>>> Passing request to remote system...');
        return service.run(req.query);
    })
    
    srv.on('updateParentTicketStatus', 'ServiceReq', async req => {
		console.log("Step 1: retrieving ticket ID")
		const curTicket = await service.run(SELECT.from('TicketService.ServiceReq').where({ ID: req.params[0]['ObjectID'] }));

		if(curTicket.length > 0){
        	if(curTicket[0].MainTicketID) {
				const parentTicket = await service.run(SELECT.from('TicketService.ServiceReq').where({ ID: curTicket[0].MainTicketID }));
				if(curTicket.length > 0){
					console.log("Step 2: updating ticket's status for id: " + parentTicket[0].ID)
					let payload = { "ServiceRequestUserLifeCycleStatusCode": "5" } // 5: Completed
					let res =  await service.run(UPDATE('TicketService.ServiceReq').set(payload).where( { ObjectID: parentTicket[0].ObjectID } ));
					console.log(`Parent Ticket updated in C4C Backend`,res);
				}
				else {
					console.log("ERROR ===>>> Parent Ticket not found")
					return;
				}					
			}
		}
		else {
			console.log("ERROR ===>>> Current Ticket not found!")
			return;
		}
	});
})