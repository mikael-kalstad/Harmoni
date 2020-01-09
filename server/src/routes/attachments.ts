import express from 'express'
import attachmentDao from 'dao/attachmentDao';
import { pool } from '../dao/database'

const router = express.Router();
const dao = new attachmentDao(pool);

// Routes to interact with attachments.

// Create attachment
router.post("/", async (request, response) => {
    dao.addAttachmentForUserForEvent(request.body, (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Add user to attachment in attachment_user table i DB
router.post("/attachment_user/:attachmentId&:userId", async (request, response) => {
    dao.addUserForAttachment(request.body, request.body, (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get all attachments for event given eventId
router.get("/event/:id", async (request, response) => {
    dao.getAttachmentsForEvent(parseInt(request.params.id), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get all attachments for user given userId
router.get("/user/:id", async (request, response) => {
    dao.getAttachmentsForUser(parseInt(request.params.id), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get all attachments for user given eventId,userId
router.get("/attachment/:userId/:eventId", async (request, response) => {
    dao.getAttachmentsForUserForEvent(parseInt(request.params.id), parseInt(request.params.id),(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Update singular attachment given attachmentId
router.put("/:id", async (request, response) => {
    dao.updateAttachment(request.body,  (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Delete attachment given id
router.delete("/:id", async (request, response) => {
    dao.deleteAttachment(parseInt(request.params.id), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})
// Delete attachment for user given user and attachment id
router.delete("/attachment_user/:attachmentId&:userId", async (request, response) => {
    dao.deleteAttachmentForUser(parseInt(request.params.id), parseInt(request.params.id),(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

module.exports = router;