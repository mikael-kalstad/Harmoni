import express from 'express';
const NodeGeoCoder = require('node-geocoder');
const router = express.Router();
const { GetLatLngByAddress } = require('geocoder-free');

let options = {
  provider: 'locationiq',
  httpAdapter: 'https',
  apiKey: process.env.api_key,
  formatter: null
};

let geo = NodeGeoCoder(options);

router.get('/geo/', (request, response) => {
  var address = request.headers['address'];
  GetLatLngByAddress(address).then(data => {
    response.send(data);
  });
});

module.exports = router;
