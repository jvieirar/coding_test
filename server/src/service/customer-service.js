const customerRepo = require('../repository/customer-repository');

function getAllCustomers() {
  const customers = customerRepo.getAll() || [];
  return customers;
}

module.exports = { getAllCustomers };
