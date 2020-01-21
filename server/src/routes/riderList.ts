// Routes to interact with riderLists.

import express from 'express';
import riderDAO from '../dao/riderListDao';
import { pool } from '../dao/database'

const router = express.Router();
const dao = new riderDAO(pool);

// Add rider list
router.post("/authorized/riders/riderlist/:event_id", async (request, response) => {
    dao.addRiderList(request.body.eventId,request.body.userId, request.body.text,(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get singular rider given id
router.get("/riders/:id", async (request, response) => {
    dao.getRiderList(parseInt(request.params.id), (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})

// Get all riders
router.get("/riders/", async (request, response) => {
    dao.getAllRiderLists((status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get all riders in event
router.get("/authorized/riders/riderlist/:event_id", async (request, response) => {
    dao.getRiderListByEventId(parseInt(request.params.event_id), (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})

// Get all riders of user in event 
router.get("/authorized/riders/riderlist/:event_id/:user_id", async (request, response) => {
    dao.getRiderListByUserIdInEvent(parseInt(request.params.event_id), parseInt(request.params.user_id), (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})

// Update singular rider given id
router.put("/authorized/riders/riderlist/:event_id/:user_id", async (request, response) => {
    dao.updateRiderList(parseInt(request.params.event_id), parseInt(request.params.user_id),(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

//delete riderlist
router.delete("/authorized/riders/riderlist/:rider_list_id", async (request, response) => {
    dao.deleteRiderListById(parseInt(request.params.id), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

module.exports = router;