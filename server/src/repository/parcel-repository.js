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
  // TODO: explain what's the difference between return parcel and return {...parcel} and why the UI shows empty retailer and email for return parcel
  // return parcel;
  return { ...parcel };
}

function createOne(parcel) {
  // {
  //   "id": 1,
  //   "external_id": "PP00042",
  //   "customer": 1,
  //   "retailer": 1
  // }
  const parcels = data['parcels'];
  if (parcel.retailer) {
    const retailer = retailerRepository.getOne(parcel.retailer);
    if (!retailer || !retailer.id) {
      return false;
    } else {
      parcel.retailer = retailer.id;
    }
  }
  if (parcel.customer) {
    const customer = customerRepository.getOne(parcel.customer);
    if (!customer || !customer.id) {
      return false;
    } else {
      parcel.customer = customer.id;
    }
  }
  const lastIndex = parcels.slice(-1)[0].id || 0;
  parcel.id = lastIndex + 1;
  parcel.external_id = 'PP' + `${parcel.id}${parcel.retailer}`.padStart(5, '0');
  parcels.push(parcel);
  _saveParcelsData(parcels);
  return true;
  return false;
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
