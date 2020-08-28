const express = require('express');
const router = express.Router();

const customerService = require('../service/customer-service');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log(`(${req.method}) ${req.originalUrl} ${new Date().toISOString()}`);
  next();
});

router.get('/list', (req, res) => {
  const customers = customerService.getAllCustomers();
  return res.json(customers);
});

module.exports = router;
