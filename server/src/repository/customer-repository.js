const { getInstance } = require('../db/db');
const data = getInstance();

function getAll() {
  return data['customers'] || [];
}

function getOne(idOrEmail) {
  const customer = data['customers'].find((customer) => customer.id === idOrEmail || customer.email === idOrEmail);
  return { ...customer };
}

module.exports = {
  getAll,
  getOne,
};
