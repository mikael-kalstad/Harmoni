import express from 'express';
const router = express.Router();
const { GetLatLngByAddress } = require('geocoder-free');

router.get('/geo/', (request, response) => {
  var address = request.headers['address'];
  GetLatLngByAddress(address).then(data => {
    response.send(data);
  });
});

module.exports = router;
