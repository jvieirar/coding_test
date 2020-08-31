const { getInstance, saveData } = require('../db/db');
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
  // TODO: check if it exists first to avoid duplication
  const existingRetailer = {};
  if (existingRetailer && existingRetailer.id) {
    return false;
  }
  const retailers = data['retailers'];
  // TODO: get the id of the latest retailer in db
  const lastIndex = 0;
  retailer.id = lastIndex + 1;
  retailers.push(retailer);
  _saveRetailersData(retailers);
}

module.exports = {
  getAll,
  getOne,
  createOne,
};
