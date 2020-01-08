import express from 'express'
import attachmentDao from 'dao/attachmentDao';
import { pool } from '../dao/database'

const router = express.Router();
const dao = new attachmentDao(pool);

// Routes to interact with events.

// Create attachment


// Get singular attachment given id
router.get("/:id", async (request, response) => {
    dao.getEvent(request.params.id, (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})


// Get all
router.get("/", async (request, response) => {
    dao.getAllEvents((status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Update singular event given id
router.put("/:id", async (request, response) => {
    dao.updateEvent(request.params.id, request.body,(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Delete event given id
router.delete("/:id", async (request, response) => {
    attachmentDao.deleteEvent(request.params.id, (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})
