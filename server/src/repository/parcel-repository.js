const { dbPath, getInstance, saveData } = require('../db/db');
const customerRepository = require('./customer-repository');
const retailerRepository = require('./retailer-repository');
const data = getInstance();

function _saveParcelsData(parcelsData) {
  saveData({ ...data, parcels: parcelsData });
}

function getAll() {
  return data['parcels'] || [];
}

function getOne(externalId) {
  const parcel = data['parcels'].find((parcel) => parcel.external_id === externalId);
  return { ...parcel };
}

function createOne(parcel) {
  // {
  //   "customer": 1,
  //   "retailer": 1
  // }
  const parcels = data['parcels'];

  if (!parcel.retailer || !parcel.customer) {
    return false;
  }

  // TODO: verify if the retailer and customer provided exist in db before adding the parcel

  // TODO: get the id of the latest parcel in db
  const lastIndex = 0;
  parcel.id = lastIndex + 1;
  // TODO: calculate the body following the pattern: PP + xxx + parcel.id + retailer.id (note that '+' is concatenation, not algebraic sum as we are building an string)
  parcel.external_id = 'PP' + '';
  parcels.push(parcel);
  _saveParcelsData(parcels);
  return true;
}

function updateOne(parcel) {
  let existingParcel = getOne(parcel.external_id);
  if (!existingParcel) {
    return null;
  }
  if (parcel.retailer) {
    const retailer = retailerRepository.getOne(parcel.retailer);
    if (!retailer || !retailer.id) {
      delete parcel.retailer;
    } else {
      parcel.retailer = retailer.id;
    }
  }
  if (parcel.customer) {
    const customer = customerRepository.getOne(parcel.customer);
    console.log({ customer });
    if (!customer || !customer.id) {
      delete parcel.customer;
    } else {
      parcel.customer = customer.id;
    }
  }
  const parcels = data['parcels'];
  const updatedParcels = parcels.map((p) => {
    if (p.external_id === parcel.external_id) {
      return { ...p, ...parcel };
    }
    return p;
  });
  data['parcels'] = updatedParcels;
  _saveParcelsData(updatedParcels);
  return { ...existingParcel, ...parcel };
}

function removeOne(parcelId) {
  let existingParcel = getOne(parcelId);
  if (!existingParcel) {
    return null;
  }
  const updatedParcels = data['parcels'].filter((parcel) => parcel.external_id !== parcelId);
  data['parcels'] = updatedParcels;
  _saveParcelsData(updatedParcels);
  return updatedParcels;
}

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  removeOne,
};
