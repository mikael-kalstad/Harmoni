import express from 'express';
import attachmentDao from '../dao/attachmentDao';
import { pool } from '../dao/database';
var multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage })

const router = express.Router();
const dao = new attachmentDao(pool);

function checkIfAccessRights(user_id: number, attachment_id: number): Promise<boolean> {

  return new Promise((resolve, reject) => {
    dao.getAttachmentsForUser(user_id, (status, data: any[]) => {
      if (status == 500)
        resolve(false);
      else
        resolve(data.some(e => { e.attachment_id == attachment_id }));
    })
  })
}


// Routes to interact with attachments.

// Create attachment
router.post('/authorized/attachments/', upload.single("file"), async (request, response) => {
  var attachment =
  {
    data: request.file.buffer,
    filename: request.file.originalname,
    filesize: request.file.size,
    filetype: request.file.mimetype,
  }
  console.log("File: ", request.file)
  console.log(request.body)
  dao.addAttachmentForUserForEvent({ body: request.body.data, attachment: attachment },
    (status, data) => {
      status == 500 ? response.status(500) : response.send(data);
    });
});

// Add user to attachment in attachment_user table i DB
router.post(
  '/authorized/attachments/attachment_user/:attachmentId&:userId',
  async (request, response) => {
    console.log("HERE!")
    checkIfAccessRights(parseInt(request.params.userId), parseInt(request.params.attachmentId)).then(valid => {
      valid ? response.status(401) :
        dao.addUserForAttachment(parseInt(request.params.attachmentId), parseInt(request.params.userId), (status, data) => {
          status == 500 ? response.status(500) : response.send(data);
        });
    })
  }
);

// Get all attachments for event given eventId
router.get('/authorized/attachments/event/:id', async (request, response) => {
  dao.getAttachmentsForEvent(parseInt(request.params.id), (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Get all attachments for user given userId
router.get('/authorized/attachments/user/:id', async (request, response) => {
  dao.getAttachmentsForUser(parseInt(request.params.id), (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Get all attachments for user given eventId,userId
router.get('/authorized/attachments/user/:userId&:eventId', async (request, response) => {
  dao.getAttachmentsForUserForEvent(
    parseInt(request.params.id),
    parseInt(request.params.id),
    (status, data) => {
      status == 500 ? response.status(500) : response.send(data);
    }
  );
});

//Get attachment by id (***for downloading the file***)
router.get('/authorized/attachments/download/:id', async (request, response) => {
  dao.getAttachmentById(parseInt(request.params.id), (status, data) => {
    if (status == 500)
      response.sendStatus(500);
    else {
      response.setHeader('Content-disposition', 'attachment; filename=' + data[0].filename);
      response.setHeader('Content-type', data[0].filetype);
      console.log("Sending attachment download response");
      response.send(data[0].data);
      console.log("Completed sending attachment response.");
    }
  })
})

//TODO: Is this "overwrite"? Path to update file name only?
// Update singular attachment given attachmentId
router.put('/authorized/attachments/:id', async (request, response) => {
  dao.updateAttachment(request.body, (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Delete attachment given id
router.delete('/authorized/attachments/:id', async (request, response) => {
  dao.deleteAttachment(parseInt(request.params.id), (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});
// Delete attachment for user given user and attachment id
router.delete(
  '/authorized/attachments/attachment_user/:attachmentId&:userId',
  async (request, response) => {
    dao.deleteAttachmentForUser(
      parseInt(request.params.id),
      parseInt(request.params.id),
      (status, data) => {
        status == 500 ? response.status(500) : response.send(data);
      }
    );
  }
);

module.exports = router;
