import express from 'express';
import eventDao from 'dao/eventDao';

const router = express.Router();

// Routes to interact with events.

// Create event
router.post("/", async (request, response) => {
    eventDao.addEvent(request.params.id, request.body,(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get singular event given id
router.get("/:id", async (request, response) => {
     eventDao.getEvent(request.params.id, (status, data)=>{
         status==500 ? response.status(500):response.send(data)
     });
})

// Get singular event given address
router.get("/:address", async (request, response) => {
    eventDao.getEvent(request.params.address, (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})

// Get singular event given address
router.get("/:address", async (request, response) => {
    eventDao.getEventsByAddress(request.params.address, (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})
// Get singular event given status
router.get("/:status", async (request, response) => {
    eventDao.getEventsByStatus(request.params.status, (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})

// Get singular event given organizer
router.get("/:organizer", async (request, response) => {
    eventDao.getEventsByOrganizer(request.params.organizer, (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})
// Get all
router.get("/", async (request, response) => {
    eventDao.getAllEvents((status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Update singular event given id
router.put("/:id", async (request, response) => {
    eventDao.updateEvent(request.params.id, request.body,(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Delete event given id
router.delete("/:id", async (request, response) => {
    eventDao.deleteEvent(request.params.id, (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})
