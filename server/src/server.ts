var mysql = require("mysql");

const express = require('express');
const server = express();
const cors = require('cors');
const body_parser = require('body-parser');

import { hash, compareHash } from './hashing'

server.use(body_parser.json());
server.use(cors());

server.use("/api/v0", require('./routes/authentication'));

//Our routes
server.use("/api/v0", require('./routes/events'));
server.use("/api/v0", require('./routes/riders'));
server.use("/api/v0", require('./routes/users'));
server.use("/api/v0", require('./routes/attachments'));
server.use("/api/v0", require('./routes/tickets'));
server.use("/api/login", require('./routes/login'));
server.use("/api/v0", require('./routes/reset'));
server.use("/api/v0", require('./routes/search'));

//server.use("api/v0/users", require("./routes/users"));

var port = parseInt(process.env.server_port);

server.listen(port, () => console.log("Server started on port:", port));