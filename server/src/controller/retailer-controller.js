const express = require('express');
const router = express.Router();

const retailerService = require('../service/retailer-service');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log(`(${req.method}) ${req.originalUrl} ${new Date().toISOString()}`);
  next();
});

router.get('/list', (req, res) => {
  const retailers = retailerService.getAllRetailers();
  return res.json(retailers);
});

router.post('/', (req, res) => {
  const retailer = req.body;

  const created = retailerService.createOneRetailer(retailer);

  if (created) {
    res.statusCode = 201;
  } else {
    res.statusCode = 409; // resource already exists
  }
  const retailers = retailerService.getAllRetailers();
  res.json(retailers);
});

module.exports = router;
