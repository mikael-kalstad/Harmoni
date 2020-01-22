/**
 * Routes to interact with search
   Reason to have it is to let search path be on the top level in the path
 */
import express from 'express';
import { pool } from '../dao/database'
import searchDao from "../dao/searchDao";

const router = express.Router();
const dao = new searchDao(pool);

// Get events given input
router.get("/search/events/:require", async (request, response) => {
    dao.searchForEvents(request.params.require, (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

module.exports = router;