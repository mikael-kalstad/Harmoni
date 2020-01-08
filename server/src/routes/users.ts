import express from 'express';
import userDAO from 'dao/userDao'
import { pool } from '../dao/database'

const router = express.Router();
const dao = new userDAO(pool);

// Routes to interact with users.

// Create user
router.post("/", async (request, response) => {
    dao.addUser(request.body, (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})
// Get singular user given id
router.get("/:id", async (request, response) => {
    dao.getUser(parseInt(request.params.id), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})
// Get singular user given email
router.get("/email/:email", async (request,response) => {
    dao.getUserByEMail(request.params.email, (status,data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})
// Get singular hash given type
router.get("/type/:type", async (request,response) => {
    dao.getUsersOfType(request.params.type, (status,data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})
// Get singular hash given id
router.get("/:id", async (request,response) => {
    dao.getHashOfUser(parseInt(request.params.id) , (status,data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})
// Get singular user given id
router.get("/organizer/:organizer", async (request,response) => {
    dao.getHashOfUser(parseInt(request.params.id) , (status,data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})
// Get all
router.get("/", async (request, response) => {
    dao.getAllUsers((status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Update singular event given id
router.put("/:id", async (request, response) => {
    dao.updateUser(parseInt(request.params.id) , request.body,(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Delete event given id
router.delete("/:id", async (request, response) => {
    dao.deleteUser(parseInt(request.params.id) , (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

module.exports = router;