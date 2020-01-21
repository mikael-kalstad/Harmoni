import express from 'express';
import { pool } from '../dao/database'
import userDao from "../dao/userDao";
import { hash} from "../hashing";

var path = require('path');
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-handlebars');
var email = process.env.gmail_email;
var password = process.env.gmail_password;

const router = express.Router();
const dao = new userDao(pool);

router.use(bodyParser.json()); 

let publicKey;
let privateKey = (publicKey = "superSecret");

var smtpTransport = nodemailer.createTransport({
    service:  'gmail',
    auth: {
        user: email,
        pass: password
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



router.post("/reset",(req,res)=>{
    dao.getUserByEMail(req.body.email, (status,data) => {
        let user = data[0];
        if(typeof user != "undefined"){
            console.log("Fant bruker");
            let token = jwt.sign({ email: req.body.email }, privateKey, {
                expiresIn: 86400
            });
            console.log("Lagde token: "+token);
            var emailinfo = {
                to: user.email,
                from: email,
                template: 'resetpassword',
                subject: 'Password help has arrived!',
                context: {
                name: user.name,
                url: 'http://localhost:3000/reset/reset_password/' + token
                }
            }

            smtpTransport.sendMail(emailinfo, function(err) {
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
})

router.get("/reset/reset_password/:token",(req,res)=>{
    var token = req.params.token;
    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.log("Token Not ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        } else{
            res.json({jwt: token})
        }
    })
})

router.post("/reset/reset_password/:token",(req,res)=>{
    var token = req.params.token;
   // var token = req.headers["password-token"];
    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.log("Token Not ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        } else{
            dao.getHashOfUser(decoded.email,(status,data)=>{
                let user = data[0];
                let pass=hash(req.body.password);
                console.log(req.body.password);
                user.hash= pass.hash;
                user.salt= pass.salt;
                console.log(user);
                dao.resetPassword(decoded.email, user, (status, data) => {
                })
                res.json({message: "Endret passord"})
            })
        }
    })
})

module.exports = router;

