const parcelRepo = require('../repository/parcel-repository');
const retailerRepo = require('../repository/retailer-repository');
const customerRepo = require('../repository/customer-repository');

function getAllParcels() {
  const parcels = parcelRepo.getAll() || [];
  return parcels.map((parcel) => getOneParcel(parcel.external_id));
}

function getOneParcel(externalId) {
  const parcel = parcelRepo.getOne(externalId);
  if (!parcel) {
    return null;
  }
  // store retailer.name on parcel.retailer
  parcel.retailer = (retailerRepo.getOne(parcel.retailer) && retailerRepo.getOne(parcel.retailer).name) || '';
  parcel.customer = (customerRepo.getOne(parcel.customer) && customerRepo.getOne(parcel.customer).email) || '';
  return parcel;
}

function createOneParcel(parcel) {
  return parcelRepo.createOne(parcel);
}

function updateOneParcel(parcel) {
  return parcelRepo.updateOne(parcel);
}

function removeOneParcel(parcelId) {
  return parcelRepo.removeOne(parcelId);
}

module.exports = { getAllParcels, getOneParcel, createOneParcel, updateOneParcel, removeOneParcel };
