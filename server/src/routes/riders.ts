import express from 'express';
import riderDAO from '../dao/riderDao';
import { pool } from '../dao/database'

const router = express.Router();
const dao = new riderDAO(pool);

// Routes to interact with riders.

// Add rider
router.post("/authorized/riders", async (request, response) => {
    dao.addRider(request.body,(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Add rider list
router.post("/authorized/riders/riderlist/:user_id&:event_id", async (request, response) => {
    dao.addRiderList(request.body,(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get singular rider given id
router.get("/riders/:id", async (request, response) => {
    dao.getRider(parseInt(request.params.id), (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})

// Get all riders
router.get("/riders/", async (request, response) => {
    dao.getAllRiders((status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get all riders in event
router.get("/authorized/riders/riderlist/:event_id", async (request, response) => {
    dao.getRiderByEventId(parseInt(request.params.event_id), (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})

// Get all riders of user in event 
router.get("/authorized/riders/riderlist/:user_id&:event_id", async (request, response) => {
    dao.getRiderByUserIdInEvent(parseInt(request.params.event_id), parseInt(request.params.user_id), (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})

// Update singular rider given id
router.put("/authorized/riders/:id", async (request, response) => {
    dao.updateRider(parseInt(request.params.id), request.body,(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Delete rider given id
router.delete("/authorized/riders/:id", async (request, response) => {
    dao.deleteRider(parseInt(request.params.id), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

//delete riderlist
router.delete("/authorized/riders/riderlist/:rider_list_id", async (request, response) => {
    dao.deleteRider(parseInt(request.params.id), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

module.exports = router;