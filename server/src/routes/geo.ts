import express from 'express';
const NodeGeoCoder = require('node-geocoder');
const router = express.Router();

let options = {
  provider: 'locationiq',
  httpAdapter: 'https',
  apiKey: process.env.api_key,
  formatter: null
};

let geo = NodeGeoCoder(options);

router.get('/geo/', async (request, response) => {
  var address = request.headers['address'];
  geo.geocode(address, (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

module.exports = router;
