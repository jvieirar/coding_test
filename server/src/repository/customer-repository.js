const { getInstance } = require('../db/db');
const data = getInstance();

function getAll() {
  return data['customers'] || [];
}

function getOne(id) {
  const customer = data['customers'].find((customer) => customer.id === id);
  return customer;
}

module.exports = {
  getAll,
  getOne,
};
