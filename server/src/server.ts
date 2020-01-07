var mysql = require("mysql");

const express = require('express');
const server = express();
const cors = require('cors');
const body_parser = require('body-parser');

import { hash, compareHash } from './hashing'

server.use(body_parser.json());
server.use(cors());


//Our routes
server.use("api/v0/users", require("./routes/users"));

server.listen(15016, () => console.log("Server started"));