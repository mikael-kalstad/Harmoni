import express from "express";

import { pool } from "../dao/database";
import userDao, { sanitizeUser } from "../dao/userDao";
import { compareHash, hash } from "../hashing";

var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");

const router = express.Router();
const dao = new userDao(pool);

router.use(bodyParser.json()); //to transtalte JSON in the body

let publicKey;
const privateKey = (publicKey = "This is my super secret key");

let user;
router.use(express.static("public"));

router.post("/", (req, res) => {
  dao.getHashOfUser(req.body.email, (status, data) => {
    user = data[0];
    if (typeof user != "undefined") {
      if (compareHash(user.hash, req.body.password, user.salt)) {
        let token = jwt.sign({ email: req.body.email }, privateKey, {
          expiresIn: 3600
        });
        res.json({ jwt: token });
        res.status(200);
      } else {
        //console.log('email & password NOT ok');
        res.status(204);
        res.json({ error: "Not authorized" });
      }
    } else {
      res.status(204);
      res.json({ error: "brukeren finnes ikke" });
    }
  });
});

/*router.post("/token/update", (req, res, next) => {
  var token = req.headers["harmoni-token"];
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      next();
    } else {
      let token = jwt.sign({ email: decoded.email }, privateKey, {
        expiresIn: 1800
      });

      res.json({jwt: token});
      //console.log("Token ok: " + decoded.email);
      next();
    }
  });
});*/
router.post("/token", (req, res) => {
  let newToken = "";
  var token = req.headers["harmoni-token"];
  if (token !== undefined) {
    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        console.log("You are not logged in");
        res.status(401);
        res.json({ error: "You are not logged in" });
      } else {
        newToken = jwt.sign({ email: decoded.email }, privateKey, {
          expiresIn: 1800
        });
        dao.getUserAllInfoByEMail(decoded.email, (status, data) => {
          let id = data[0] === undefined ? undefined : data[0];
          res.json({ jwt: newToken, userData: sanitizeUser(data[0]) });
        });
      }
    });
  } else {
    res.status(401);
    res.json({ error: "Token not defined" });
  }
});

router.post("/register", (req, res) => {
  let data = hash(req.body.password);
  req.body.hash = data.hash;
  req.body.salt = data.salt;
  dao.getUserByEMail(req.body.email, (status, data) => {
    user = data[0];
    if (typeof user === "undefined") {
      dao.addUser(req.body, status => {
        if (status !== 401) {
          let token = jwt.sign({ email: req.body.email }, privateKey, {
            expiresIn: 1800
          });
          res.json({ jwt: token });
        } else {
          console.log(status);
          res.status(401);
          res.json({ error: "Could not add user" });
        }
      });
    } else {
      res.status(409);
      res.json({ error: "the user exists error code:" + status });
    }
  });
});

module.exports = router;
