// This route is for searchDao which
// it is a function in eventDao class
// Reason to have is to let search path be on the top level in the path
import express from 'express';
import eventDao from '../dao/eventDao'
import userDao from "../dao/userDao";
import { pool } from '../dao/database'

const router = express.Router();
const dao = new eventDao(pool);
// Routes to interact with events.


// Get events given input
router.get("/search/events/:require", async (request, response) => {
    dao.searchForEvents(request.params.require, (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

module.exports = router;