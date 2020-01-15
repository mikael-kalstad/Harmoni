import express from "express";
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");


const router = express.Router();
router.use(bodyParser.json());
router.use(express.static("public"));

let publicKey;
let privateKey = (publicKey = "This is my super secret key");


router.use("/authorized", (req, res, next) => {
  var token = req.headers["harmoni-token"];
  console.log("Token for authorized: ", token);
  console.log("request for authorized: ", token);
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      console.log("Token Not ok");
      res.status(401);
      res.json({ error: "Not authorized" });
    } else {
      next();
    }
  });
});


router.post("/updatetoken", async (req, res, next) => {
  var token = req.headers["harmoni-token"];
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      console.log("Token can not be updated")
      res.sendStatus(204)
    } else {
      let newToken = jwt.sign({ email: decoded.email}, privateKey, {
        expiresIn: 3600
      });
      res.json({ jwt: newToken });
    }
  });
});

module.exports = router;
