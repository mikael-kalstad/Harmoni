import express from 'express';
const NodeGeoCoder = require('node-geocoder');
const router = express.Router();

let options = {
  provider: 'google',
  httpAdapter: 'http',
  apiKey: process.env.api_key,
  formatter: null
};

let geo = NodeGeoCoder(options);

router.get('/geo/:address', async (request, response) => {
  geo.geocode(request.params.address, (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

module.exports = router;
