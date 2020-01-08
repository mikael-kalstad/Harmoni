import express from 'express';
import ticketDAO from 'dao/ticketDao'
import { pool } from '../dao/database'

const router = express.Router();
const dao = new ticketDAO(pool);

//Get all tickets
router.get("/", async (request, response) => {
    dao.getAllTickets((status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

//Get all tickets for a given event
router.get("/event/:id", async (request, response) => {
    dao.getTicketsByEventId(parseInt(request.params.id), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})
//Add tickets
router.post("/", async (request, response) => {
    dao.addTicket(request.body, (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

//Delete ticket given id
router.delete("/:id", async (request, response) => {
    dao.deleteTicket(parseInt(request.params.id), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

//Delete  all tickets given event id¨
router.delete("event/:id", async(request, response) =>{
    dao.deleteAllTicketsForEvent(parseInt(request.params.id), (status, data) =>
    status == 500 ? response.status(500) : response.send(data))
})

module.exports = router;

