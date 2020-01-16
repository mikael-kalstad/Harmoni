// This route is for searchDao which
// it is a function in eventDao class
// Reason to have is to let search path be on the top level in the path
import express from 'express';
import { pool } from '../dao/database'
import searchDao from "../dao/searchDao";

const router = express.Router();
const dao = new searchDao(pool);
// Routes to interact with events.


// Get events given input
router.get("/search/events/:require", async (request, response) => {
    dao.searchForEvents(request.params.require, (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

module.exports = router;