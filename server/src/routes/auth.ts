import express from 'express';
import { pool } from '../dao/database'
import userDao from "../dao/userDao";
import {compareHash, hash} from "../hashing";


var fs = require('fs');
var path = require('path');
var async = require('async');
var crypto = require('crypto');
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-handlebars');
//var email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com';
//var pass = process.env.MAILER_PASSWORD || 'auth_email_pass';

const router = express.Router();
const dao = new userDao(pool);

router.use(bodyParser.json()); 

let publicKey;
let privateKey = (publicKey = "superSecret");

var smtpTransport = nodemailer.createTransport({
    service:  'gmail',
    auth: {
        user: "harmoniteam8@gmail.com",
        pass: "harmoni8email"
    }
});

var handlebarsOptions = {
    viewEngine: {
        extName: '.handlebars', 
        partialsDir: './src/routes/views/email/partials',
        layoutsDir: './src/routes/views/email/',
        defaultLayout: 'resetpassword.handlebars',
    },
    viewPath: path.resolve('./src/routes/views/email/'),
    extName: '.handlebars'
};

smtpTransport.use('compile', hbs(handlebarsOptions)); 

let user;

router.post("/",(req,res)=>{
    dao.getUserByEMail(req.body.email, (status,data) => {
        let user = data[0];
        if(typeof user != "undefined"){
            console.log("Fant bruker");
            let token = jwt.sign({ email: req.body.email }, privateKey, {
                expiresIn: 60*60*24
            });
            console.log("Lagde token: "+token);
            var emailinfo = {
                to: "msandn3s@gmail.com",
                from: 'harmoniteam8@gmail.com',
                template: 'resetpassword',
                subject: 'Password help has arrived!',
                context: {
                name: user.name,
                url: 'http://localhost:15016/auth/reset_password?token=' + token
                }
            }

            smtpTransport.sendMail(emailinfo, function(err) {
                console.log("sender mail????");
                if (!err) {
                    return res.json({ message: 'Kindly check your email for further instructions' });
                } else {
                    return res.json(err);
                }
            });

        }else{
              console.log("Brukernavnet finnes ikke");
        }
    })
});

router.post("/password_reset",(req,res)=>{
    var token = req.headers["password-token"];
    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.log("Token Not ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        } else{
            dao.getUserByEMail(decoded.email,(status,data)=>{
                let user = data[0];
                let pass=hash(req.body.password);
                user.hash= pass.hash;
                user.salt= pass.salt;
                console.log(user);
                res.json({jwt: token, userId:user.user_id })
            })
        }
    })
})

    //Send tilbakemelding til bruker
  /* dao.getUserByEMail(req.body.email, (status,data) => {
        let user = data[0];
        let pass=hash(req.body.password);
        user.hash= pass.hash;
        user.salt= pass.salt;
        console.log(user);
        dao.updateUser(parseInt(user.user_id), user, (status, data) => {
            
          })
    })*/

router.post("/update_password",(req,res)=>{

});



module.exports = router;

