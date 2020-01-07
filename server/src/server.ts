var mysql = require("mysql");

const express = require('express');
const server = express();
const cors = require('cors');
const body_parser = require('body-parser');

server.use(body_parser.json());
server.use(cors());

server.listen(15016, () => console.log("Server started"));