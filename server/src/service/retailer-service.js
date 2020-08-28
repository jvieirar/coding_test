const retailerRepo = require('../repository/retailer-repository');

function getAllRetailers() {
  const retailers = retailerRepo.getAll() || [];
  return retailers;
}

function createOneRetailer(retailer) {
  return retailerRepo.createOne(retailer);
}

module.exports = { getAllRetailers, createOneRetailer };
