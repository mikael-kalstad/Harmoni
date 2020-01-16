import express from 'express';
const NodeGeoCoder = require('node-geocoder');
const router = express.Router();

let options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.api_key
};

let geo = NodeGeoCoder(options);

router.get('/geo/', async (request, response) => {
  geo.geocode('29 champs elysée paris', (status, data) => {
    console.log(data);

    status == 500 ? response.status(500) : response.send(data);
  });
});

module.exports = router;
