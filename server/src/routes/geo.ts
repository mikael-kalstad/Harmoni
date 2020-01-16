import express from 'express';
const NodeGeoCoder = require('node-geocoder');
const router = express.Router();

let options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.api_key,
  formatter: null
};

let geo = NodeGeoCoder(options);

router.get('/geo/', async (request, response) => {
  var address = request.headers["address"];
  console.log(address);
  geo.geocode(address).then(function(res) {
    console.log(res);
  })
      .catch(function(err) {
        console.log(err);
      });;
});

module.exports = router;
