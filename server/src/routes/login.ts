import express from 'express';
import { pool } from '../dao/database'
import userDao from "../dao/userDao";
import { compareHash } from "../hashing";
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");


const router = express.Router();
const dao = new userDao(pool);

router.use(bodyParser.json());  //to transtalte JSON in the body

let publicKey;
let privateKey = (publicKey = "superSecret");
let user;

function loginOk(mail,password) {
    console.log(user.name);
   
    return compareHash(user.hash, password, user.salt);
}

router.use(express.static("public"));

router.post("/login",(req,res)=>{
    dao.getUserByEMail(req.body.email, (status,data) => {
        user = data[0];
        console.log(user.name);
    });
    if (loginOk(req.body.email, req.body.password)){
        console.log("Brukernavn & passord ok");
        let token = jwt.sign({ email: req.body.email }, privateKey, {
            expiresIn: 60
        });

        //window.localStorage.setItem("x-access-token",token);
        res.json({ jwt: token });
    } else {
        console.log("Brukernavn & passord IKKE ok");
        res.status(401);
        res.json({ error: "Not authorized" });
    }
});

router.use("/api", (req, res, next) => {
    var token = req.headers["x-access-token"];

    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.log("Token Not ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        } else {
            console.log("Token ok: " + decoded.email);
            next();
        }
    });
});
router.get("/token", (req,res)=>{
    let newToken="";
    var token=req.headers["x-access-token"];
    console.log("You got the following Token: =>  "+token);
    jwt.verify(token,publicKey,(err)=>{
        if(err){
            console.log("Token has expired");
            res.status(401);
            res.json({error:"Not authorized"});
        }else{
            newToken = jwt.sign({ brukernavn: req.body.email }, privateKey, {
                expiresIn: 60*30
            });
            res.json({ jwt: newToken });
        }
    });

});

module.exports = router;
