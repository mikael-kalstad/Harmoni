const express = require("express");

var path = require("path");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var email = process.env.gmail_email;
var password = process.env.gmail_password;

const router = express.Router();

router.use(bodyParser.json());

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password
  }
});

router.post("/send_email/", (req, res) => {
  var emailinfo = {
    to: req.body.email,
    from: email,
    subject: req.body.subject,
    text: req.body.message
  };

  smtpTransport.sendMail(emailinfo, function(err) {
    if (!err) {
      return res.json({
        message: "Kindly check your email for further instructions"
      });
    } else {
      return res.json(err);
    }
  });
});

module.exports = router;
