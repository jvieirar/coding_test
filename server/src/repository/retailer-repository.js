const { dbPath, getInstance, saveData } = require('../db/db');
const data = getInstance();

function getAll() {
  return data['retailers'] || [];
}

function getOne(id) {
  const retailer = data['retailers'].find((retailer) => retailer.id === id);
  return { ...retailer };
}

module.exports = {
  getAll,
  getOne,
};
