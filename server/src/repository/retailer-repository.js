const { dbPath, getInstance, saveData } = require('../db/db');
const data = getInstance();

function _saveRetailersData(retailersData) {
  saveData({ ...data, retailers: retailersData });
}

function getAll() {
  return data['retailers'] || [];
}

function getOne(idOrName) {
  const retailer = data['retailers'].find((retailer) => retailer.id === idOrName || retailer.name === idOrName);
  return { ...retailer };
}

function createOne(retailer) {
  if (!retailer || !retailer.name) {
    return false;
  }
  const existingRetailer = getOne(retailer.name);
  console.log({ existingRetailer });
  if (existingRetailer && existingRetailer.id) {
    return false;
  }
  const retailers = data['retailers'];
  const lastIndex = retailers.slice(-1)[0].id || 0;
  retailer.id = lastIndex + 1;
  retailers.push(retailer);
  _saveRetailersData(retailers);
}

module.exports = {
  getAll,
  getOne,
  createOne,
};
