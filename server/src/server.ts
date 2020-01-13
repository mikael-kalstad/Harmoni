var mysql = require("mysql");

const express = require('express');
const server = express();
const cors = require('cors');
const body_parser = require('body-parser');

import { hash, compareHash } from './hashing'

server.use(body_parser.json());
server.use(cors());


//Our routes
server.use("/api/v0/events", require('./routes/events'));
server.use("/api/v0/rides", require('./routes/riders'));
server.use("/api/v0/users", require('./routes/users'));
server.use("/api/v0/attachment", require('./routes/attachments'));
server.use("/api/v0/tickets", require('./routes/tickets'));
server.use("/api/v0/search"),require('./routes/search');
server.use("/login", require('./routes/login'));

//server.use("api/v0/users", require("./routes/users"));

var portArg = process.argv.find((e) => e.match("port:"));
var port = portArg == undefined ? 15016 : parseInt(portArg.replace("port:", ""));

server.listen(port, () => console.log("Server started on port:", port));