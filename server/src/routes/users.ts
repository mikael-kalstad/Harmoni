import express from "express";
import userDAO, { sanitizeUser } from "../dao/userDao";
import { pool } from "../dao/database";

const router = express.Router();
const dao = new userDAO(pool);

// Routes to interact with users.

// Create user
router.post("/users/", async (request, response) => {
  dao.addUser(request.body, (status, data) => {
    status == 500 ? response.status(500) : response.send(sanitizeUser(data));
  });
});

// Get singular user given id
router.get("/users/:id", async (request, response) => {
  dao.getUser(parseInt(request.params.id), (status, data) => {
    status == 500 ? response.status(500) : response.send(sanitizeUser(data));
  });
});
// Get singular user given name
router.get('/name/:name', async (request, response) => {
  dao.getUserByName(request.params.name, (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});
// Get singular user given email
router.get("/users/email/:email", async (request, response) => {
  dao.getUserByEMail(request.params.email, (status, data) => {
    let user=data[0];
    if (typeof user != "undefined") {
      response.status(200);
      response.send(sanitizeUser(data))
    }else{
      response.json({ error: "brukeren finnes ikke" });
    }
  });
});

// Get all users given type
router.get("/authorized/users/type/:type", async (request, response) => {
  dao.getUsersOfType(request.params.type, (status, data) => {
    status == 500 ? response.status(500) : response.send(sanitizeUser(data));
  });
});

// Get singular hash given id
router.get("/users/hash/:email", async (request, response) => {
  dao.getHashOfUser(request.params.email, (status, data) => {
    status == 500 ? response.status(500) : response.send(sanitizeUser(data));
  });
});

// Get singular organizer for event given id
router.get("/users/organizer/:id", async (request, response) => {
  dao.getOrganizerForEvent(parseInt(request.params.id), (status, data) => {
    status == 500 ? response.status(500) : response.send(sanitizeUser(data));
  });
});

// Get all artists from event given eventId
router.get("/users/artists/:id", async (request, response) => {
  dao.getArtistsForEvent(parseInt(request.params.id), (status, data) => {
    status == 500 ? response.status(500) : response.send(sanitizeUser(data));
  });
});

// Get all volunteers from event given eventId
router.get("/authorized/users/volunteers/:id", async (request, response) => {
  dao.getVolunteersForEvent(parseInt(request.params.id), (status, data) => {
    status == 500 ? response.status(500) : response.send(sanitizeUser(data));
  });
});

// Get all users
router.get("/authorized/users/", async (request, response) => {
  dao.getAllUsers((status, data) => {
    status == 500 ? response.status(500) : response.send(sanitizeUser(data));
  });
});

// Update singular user given id
router.put("/authorized/users/:id", async (request, response) => {
  dao.updateUser(parseInt(request.params.id), request.body, (status, data) => {
    status == 500 ? response.status(500) : response.send(sanitizeUser(data));
  });
});
router.put("/authorized/users/change_password/:email", async (request, response) => {
  dao.changePassword(request.params.email, request.body, (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});
router.put("/authorized/users/change_picture/:id", async (request, response) => {
  dao.changePicture(parseInt(request.params.id), request.body, (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Delete user given id
router.delete("/authorized/users/:id", async (request, response) => {
  dao.deleteUser(parseInt(request.params.id), (status, data) => {
    status == 500 ? response.status(500) : response.send(sanitizeUser(data));
  });
});

module.exports = router;
