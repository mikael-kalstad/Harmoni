// Routes to interact with attachments.

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
    dao.getAttachmentsForUploader(user_id, (status, data: any[]) => {
      if (status == 500)
        resolve(false);
      else
        resolve(data.some(e => { e.attachment_id == attachment_id }));
    })
  })
}

// Create attachment
router.post('/authorized/attachments/', upload.single("attachment"), async (request, response) => {
  var attachment =
  {
    data: request.file.buffer,
    filename: request.file.originalname,
    filesize: request.file.size,
    filetype: request.file.mimetype,
  }
  dao.addAttachmentForUserForEvent({ body: request.body, attachment: attachment },
    (status, data) => {
      status == 500 ? response.status(500) : response.send(data);
    });
});

// Add user to attachment in attachment_user table i DB
router.post(
  '/authorized/attachments/attachment_user/:attachmentId/:userId',
  async (request, response) => {
    checkIfAccessRights(parseInt(request.params.userId), parseInt(request.params.attachmentId)).then(valid => {
      valid ? response.status(401) :
        dao.addUserForAttachment(parseInt(request.params.attachmentId), parseInt(request.params.userId), (status, data) => {
          status == 500 ? response.status(500) : response.send(data);
        });
    })
  }
);

//Get attachment given its id
router.get('/authorized/attachments/:id', async (request, response) => {
  dao.getAttachmentById(parseInt(request.params.id), (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Get all attachments for event given eventId
router.get('/authorized/attachments/event/:eventId', async (request, response) => {
  dao.getAttachmentsForEvent(parseInt(request.params.eventId), (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Get all attachments a user has uploaded given UserId
router.get('/authorized/attachments/user/:userId', async (request, response) => {
  dao.getAttachmentsForUploader(parseInt(request.params.userId), (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Get all attachments a user has uploaded to an event given eventId,userId
router.get('/authorized/attachments/user/event/:userId&:eventId', async (request, response) => {
  dao.getAttachmentsForUploaderForEvent(
    parseInt(request.params.userId),
    parseInt(request.params.eventId),
    (status, data) => {
      status == 500 ? response.status(500) : response.send(data);
    }
  );
});

//Get all attachments an user has access to 
router.get('/authorized/attachments/user/access/:userId', async (request, response) => {
  dao.getAttachmentsForUser(
    parseInt(request.params.userId),  (status, data) => {
      status == 500 ? response.status(500) : response.send(data);
    }
  );
})

//Get all attachments an user has access to for an event
router.get('/authorized/attachments/user/access/event/:userId&:eventId', async (request, response) => {
  dao.getAttachmentsForUserForEvent(
    parseInt(request.params.userId), parseInt(request.params.eventId),  (status, data) => {
      status == 500 ? response.status(500) : response.send(data);
    }
  );
})

//Get attachment by id (***for downloading the file***)
router.get('/authorized/attachments/download/:id', async (request, response) => {
  dao.getAttachmentById(parseInt(request.params.id), (status, data) => {
    if (status == 500)
      response.sendStatus(500);
    else {
      response.setHeader('Content-disposition', 'attachment; filename=' + data[0].filename);
      response.setHeader('Content-type', data[0].filetype);
      response.send(data[0].data);
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
      parseInt(request.params.attachmentId),
      parseInt(request.params.userId),
      (status, data) => {
        status == 500 ? response.status(500) : response.send(data);
      }
    );
  }
);

module.exports = router;
